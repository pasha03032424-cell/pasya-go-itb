// Backend AI Tutor PASYA GO ITB — tanpa dependency (hanya Node.js >= 18).
// API key hanya dibaca di sini (server), tidak pernah dikirim ke browser.
import http from 'node:http'
import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

// --- muat .env sederhana (tanpa paket dotenv) ---
const envPath = join(dirname(fileURLToPath(import.meta.url)), '..', '.env')
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/)
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
}
const CFG = {
  port: Number(process.env.PORT) || 8787,
  key: process.env.ANTHROPIC_API_KEY || '',
  model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-5-5',
  maxMsgChars: Number(process.env.TUTOR_MAX_CHARS) || 2000,
  maxHistory: Number(process.env.TUTOR_MAX_HISTORY) || 20,
  ratePerMin: Number(process.env.TUTOR_RATE_PER_MIN) || 15,
  origin: process.env.ALLOWED_ORIGIN || 'http://localhost:5173',
  timeoutMs: 45000,
}
const SYSTEM = `Kamu adalah tutor pribadi UTBK-SNBT bernama "Tutor PASYA" untuk siswa Indonesia yang menargetkan perguruan tinggi negeri.
Aturan:
- Jawab dalam Bahasa Indonesia yang ramah dan sabar, kecuali materi memang berbahasa Inggris.
- Mulai dari konsep dasar. Jika siswa bingung, pakai contoh lebih sederhana sebelum menaikkan tingkat kesulitan.
- Untuk soal hitungan, jelaskan langkah demi langkah dan tulis rumus beserta arti simbolnya.
- Saat membahas jawaban salah, tanyakan/identifikasi cara berpikir siswa, lalu jelaskan letak kekeliruannya.
- Kamu bisa membuat soal latihan, kuis, jadwal belajar, dan evaluasi progres sesuai permintaan. Soal buatanmu orisinal; jangan mengaku sebagai soal resmi UTBK.
- Jangan menjamin kelulusan atau skor. Untuk jadwal/ketentuan resmi, arahkan ke snpmb.id.
- Jika tidak yakin, katakan terus terang.
- Jawaban ringkas dan terstruktur; hindari bertele-tele.`

const hits = new Map() // ip -> timestamps (rate limit sederhana, in-memory)
function limited(ip) {
  const now = Date.now(), arr = (hits.get(ip) || []).filter((t) => now - t < 60000)
  arr.push(now); hits.set(ip, arr)
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < 60000)) hits.delete(k)
  return arr.length > CFG.ratePerMin
}
const send = (res, code, obj, origin) => {
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': origin, 'Vary': 'Origin', 'Connection': 'close' })
  res.end(JSON.stringify(obj))
}
function readBody(req, limit = 60_000) {
  return new Promise((resolve, reject) => {
    let size = 0, over = false; const chunks = []
    req.on('data', (c) => { if (over) return; size += c.length; if (size > limit) { over = true; chunks.length = 0; reject(Object.assign(new Error('Pesan terlalu besar.'), { code: 413 })) } else chunks.push(c) })
    req.on('end', () => { if (!over) resolve(Buffer.concat(chunks).toString('utf8')) })
    req.on('error', reject)
  })
}
function sanitize(messages) {
  if (!Array.isArray(messages) || !messages.length) throw Object.assign(new Error('Pesan kosong.'), { code: 400 })
  const clean = messages.slice(-CFG.maxHistory).map((m) => {
    if (!m || !['user', 'assistant'].includes(m.role) || typeof m.content !== 'string') throw Object.assign(new Error('Format pesan tidak valid.'), { code: 400 })
    const content = m.content.trim().slice(0, CFG.maxMsgChars)
    if (!content) throw Object.assign(new Error('Pesan kosong.'), { code: 400 })
    return { role: m.role, content }
  })
  while (clean.length && clean[0].role !== 'user') clean.shift() // API butuh awal percakapan dari user
  if (!clean.length || clean[clean.length - 1].role !== 'user') throw Object.assign(new Error('Pesan terakhir harus dari pengguna.'), { code: 400 })
  return clean
}

const server = http.createServer(async (req, res) => {
  const origin = CFG.origin
  if (req.method === 'OPTIONS') { res.writeHead(204, { 'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' }); return res.end() }
  const url = new URL(req.url, 'http://localhost')
  try {
    if (req.method === 'GET' && url.pathname === '/api/tutor/status')
      return send(res, 200, { configured: Boolean(CFG.key), model: CFG.key ? CFG.model : null, maxChars: CFG.maxMsgChars }, origin)
    if (req.method === 'POST' && url.pathname === '/api/tutor/chat') {
      if (!CFG.key) return send(res, 503, { error: 'not_configured', message: 'AI Tutor belum dikonfigurasi: ANTHROPIC_API_KEY belum diisi di server (lihat README).' }, origin)
      const ip = req.socket.remoteAddress || 'unknown'
      if (limited(ip)) return send(res, 429, { error: 'rate_limited', message: 'Terlalu banyak permintaan. Coba lagi sebentar lagi.' }, origin)
      let payload; try { payload = JSON.parse(await readBody(req)) } catch (e) { if (e.code === 413) throw e; throw Object.assign(new Error('JSON tidak valid.'), { code: 400 }) }
      const messages = sanitize(payload.messages)
      const ctx = typeof payload.context === 'string' ? payload.context.slice(0, 1200) : ''
      const ctl = new AbortController(), timer = setTimeout(() => ctl.abort(), CFG.timeoutMs)
      let r
      try {
        r = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST', signal: ctl.signal,
          headers: { 'content-type': 'application/json', 'x-api-key': CFG.key, 'anthropic-version': '2023-06-01' },
          body: JSON.stringify({ model: CFG.model, max_tokens: 1200, system: SYSTEM + (ctx ? `\n\nKonteks progres siswa (data dari aplikasi):\n${ctx}` : ''), messages }),
        })
      } catch (e) {
        if (e.name === 'AbortError') throw e
        console.error('Gagal terhubung ke penyedia AI:', e.cause?.code || e.message)
        return send(res, 502, { error: 'upstream_unreachable', message: 'Server tidak dapat terhubung ke penyedia AI. Periksa koneksi internet server.' }, origin)
      } finally { clearTimeout(timer) }
      const data = await r.json().catch(() => ({}))
      if (!r.ok) {
        console.error('Anthropic API error', r.status, data?.error?.type)
        const msg = r.status === 401 ? 'API key ditolak oleh penyedia AI. Periksa ANTHROPIC_API_KEY.' : r.status === 429 ? 'Kuota/batas penyedia AI tercapai. Coba lagi nanti.' : 'Penyedia AI mengembalikan error. Coba lagi.'
        return send(res, 502, { error: 'upstream_error', message: msg }, origin)
      }
      const reply = (data.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('\n').trim()
      return send(res, 200, { reply }, origin)
    }
    send(res, 404, { error: 'not_found' }, origin)
  } catch (e) {
    const code = e.code === 413 ? 413 : e.code === 400 ? 400 : e.name === 'AbortError' ? 504 : 500
    if (code === 500) console.error(e)
    send(res, code, { error: 'failed', message: e.name === 'AbortError' ? 'Permintaan ke AI melewati batas waktu.' : code === 500 ? 'Terjadi kesalahan server.' : e.message }, origin)
  }
})
server.listen(CFG.port, () => console.log(`AI Tutor server di http://localhost:${CFG.port} — ${CFG.key ? 'API key terdeteksi' : 'BELUM dikonfigurasi (isi .env)'}`))
