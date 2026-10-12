import { useState, useEffect, useRef, useMemo } from 'react'
import { Send, Trash2, Bot, User, AlertTriangle } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useStore } from '../context/Store'
import { getStatus, sendChat } from '../services/tutorApi'
import { EXAM } from '../data/config'
import { pct } from '../utils/helpers'

const STARTERS = ['Aku belum paham permutasi, ajari dari dasar.', 'Buatkan 5 soal latihan Penalaran Umum tingkat sedang.', 'Buatkan jadwal belajar 1 minggu untuk 7 subtes UTBK.', 'Bantu aku menganalisis kelemahan dari progresku.']
const MAX = 2000

export default function Tutor() {
  const { s } = useStore()
  const [store, setStore] = useLocalStorage('pasya-go-itb:tutor-v1', { messages: [] })
  const messages = Array.isArray(store.messages) ? store.messages.filter((m) => m && ['user', 'assistant'].includes(m.role) && typeof m.content === 'string') : []
  const [input, setInput] = useState(''), [busy, setBusy] = useState(false), [error, setError] = useState('')
  const [status, setStatus] = useState(null)
  const end = useRef(null)
  useEffect(() => { getStatus().then(setStatus) }, [])
  useEffect(() => { end.current?.scrollIntoView({ block: 'end' }) }, [messages.length, busy])

  // Ringkasan progres nyata dari localStorage, dikirim sebagai konteks agar saran personal.
  const context = useMemo(() => {
    const a = s.answers
    if (!a.length) return 'Siswa belum mengerjakan soal.'
    const per = EXAM.sections.map((x) => { const r = a.filter((y) => y.uid.startsWith(x.key + ':')); return r.length ? `${x.name}: ${pct(r.filter((y) => y.ok).length, r.length)}% benar dari ${r.length} soal` : null }).filter(Boolean)
    return `Total ${a.length} soal dikerjakan, akurasi ${pct(a.filter((x) => x.ok).length, a.length)}%. ` + per.join('; ') + '. Materi selesai: ' + s.materiDone.length + ' bab. Target: ' + s.targets.prodi + ' ' + s.targets.campus + '.'
  }, [s.answers, s.materiDone, s.targets])

  async function submit(text) {
    const content = (text ?? input).trim()
    if (!content || busy) return
    if (content.length > MAX) return setError(`Pesan terlalu panjang (maks ${MAX} karakter).`)
    setError('')
    const next = [...messages, { role: 'user', content }]
    setStore({ messages: next }); setInput(''); setBusy(true)
    try {
      const reply = await sendChat(next.map(({ role, content: c }) => ({ role, content: c })), context)
      setStore({ messages: [...next, { role: 'assistant', content: reply || '(Tidak ada jawaban dari AI.)' }] })
    } catch (e) { setError(e.message) } finally { setBusy(false) }
  }
  const onKey = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit() } }
  const notReady = status && !status.configured

  return <div className="tutor"><div className="row between"><h2>🤖 AI Tutor</h2>
    <button className="btn ghost sm" disabled={!messages.length || busy} onClick={() => window.confirm('Hapus seluruh riwayat percakapan?') && setStore({ messages: [] })}><Trash2 size={14} /> Hapus riwayat</button></div>
    {status === null && <div className="card empty">Memeriksa koneksi AI Tutor…</div>}
    {notReady && <div className="card warn" role="alert"><b><AlertTriangle size={16} /> {status.unreachable ? 'Backend AI Tutor belum berjalan' : 'AI Tutor belum dikonfigurasi'}</b>
      <small>{status.unreachable ? 'Jalankan server di terminal lain: npm run server.' : 'Isi ANTHROPIC_API_KEY di file .env (salin dari .env.example), lalu jalankan ulang npm run server.'} Langkah lengkap ada di README.</small></div>}
    <div className="chat" role="log" aria-live="polite" aria-label="Percakapan dengan AI Tutor">
      {!messages.length && <div className="card empty"><p>Tanyakan materi, minta penjelasan soal, atau minta latihan. Coba salah satu:</p>
        <div className="row wrap">{STARTERS.map((t) => <button key={t} className="btn ghost sm" disabled={notReady || busy} onClick={() => submit(t)}>{t}</button>)}</div></div>}
      {messages.map((m, i) => <div key={i} className={'msg ' + m.role}><span className="av" aria-hidden="true">{m.role === 'user' ? <User size={16} /> : <Bot size={16} />}</span><div className="bubble">{m.content}</div></div>)}
      {busy && <div className="msg assistant"><span className="av" aria-hidden="true"><Bot size={16} /></span><div className="bubble muted">Tutor sedang mengetik…</div></div>}
      <div ref={end} /></div>
    {error && <div className="card bad" role="alert">{error}</div>}
    <div className="row composer"><textarea aria-label="Pesan untuk AI Tutor" rows={2} maxLength={MAX} value={input} placeholder="Tulis pertanyaanmu… (Enter kirim, Shift+Enter baris baru)" onChange={(e) => setInput(e.target.value)} onKeyDown={onKey} disabled={busy} />
      <button className="btn" aria-label="Kirim pesan" disabled={busy || !input.trim() || notReady} onClick={() => submit()}><Send size={16} /></button></div>
    <small className="muted">{input.length}/{MAX} · AI dapat keliru; periksa kembali jawaban penting. Info resmi UTBK: snpmb.id.</small></div>
}
