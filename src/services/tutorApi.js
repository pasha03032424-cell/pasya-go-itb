// Klien API AI Tutor. Tidak ada API key di sini; semua panggilan lewat backend (/api/*).
async function parse(res) {
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw Object.assign(new Error(data.message || 'Permintaan gagal (' + res.status + ').'), { code: data.error || 'http_' + res.status })
  return data
}
export async function getStatus() {
  try { return await parse(await fetch('/api/tutor/status')) }
  catch { return { configured: false, unreachable: true } }
}
export async function sendChat(messages, context = '') {
  let res
  try { res = await fetch('/api/tutor/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages, context }) }) }
  catch { throw Object.assign(new Error('Tidak dapat menghubungi server AI Tutor. Pastikan backend berjalan (npm run server).'), { code: 'network' }) }
  return (await parse(res)).reply
}
