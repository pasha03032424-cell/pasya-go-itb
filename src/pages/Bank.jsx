import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { QUESTIONS } from '../data/questions'
import { EXAM, PRACTICE_LABEL } from '../data/config'
import { Options } from '../components/Bits'
import { useStore } from '../context/Store'
export default function Bank() {
  const { s, record, toggleFav } = useStore()
  const [sp] = useSearchParams()
  const [f, setF] = useState({ sec: sp.get('s') || '', diff: '', status: '', q: '' })
  const [i, setI] = useState(0), [sel, setSel] = useState(null), [done, setDone] = useState(false)
  const list = useMemo(() => QUESTIONS.filter((q) => {
    const h = s.answers.filter((a) => a.uid === q.uid), last = h[h.length - 1]
    return (!f.sec || q.section === f.sec) && (!f.diff || q.difficulty === f.diff) &&
      (!f.status || (f.status === 'new' ? !h.length : f.status === 'fav' ? s.favorites.includes(q.uid) : f.status === 'ok' ? last?.ok : last && !last.ok)) &&
      (!f.q || (q.question + q.topic + q.explanation).toLowerCase().includes(f.q.toLowerCase()))
  }), [f, s.answers, s.favorites])
  const set = (k, v) => { setF({ ...f, [k]: v }); setI(0); setSel(null); setDone(false) }
  const q = list[i]
  const go = (d) => { setI(i + d); setSel(null); setDone(false) }
  const submit = () => { setDone(true); record([{ uid: q.uid, category: q.category, topic: q.topic, ok: sel === q.answer }]) }
  return <div><h2>📝 Bank Soal</h2>
    <div className="row wrap"><input placeholder="Cari soal/materi…" value={f.q} onChange={(e) => set('q', e.target.value)} />
      <select value={f.sec} onChange={(e) => set('sec', e.target.value)}><option value="">Semua subtes</option>{EXAM.sections.map((x) => <option key={x.key} value={x.key}>{x.name}</option>)}</select>
      <select value={f.diff} onChange={(e) => set('diff', e.target.value)}><option value="">Semua tingkat</option><option value="easy">Mudah</option><option value="medium">Sedang</option><option value="hard">Sulit</option></select>
      <select value={f.status} onChange={(e) => set('status', e.target.value)}><option value="">Semua status</option><option value="new">Belum dikerjakan</option><option value="ok">Benar</option><option value="bad">Salah</option><option value="fav">Favorit</option></select></div>
    {!q ? <div className="card empty">Tidak ada soal yang cocok dengan filter.</div> : <div className="card">
      <small>{q.category} · {q.topic} · {q.difficulty} — Soal {i + 1} / {list.length}</small>
      {q.passage && <blockquote className="passage">{q.passage}</blockquote>}<p className="qtext">{q.question}</p><Options q={q} sel={sel} onSel={setSel} lock={done} showAnswer={done} />
      <div className="row wrap"><button className="btn ghost sm" onClick={() => toggleFav(q.uid)}>{s.favorites.includes(q.uid) ? '★ Favorit' : '☆ Tandai Soal'}</button>
        {!done && <button className="btn sm" disabled={!sel} onClick={submit}>Jawab</button>}
        <button className="btn ghost sm" disabled={i === 0} onClick={() => go(-1)}>← Sebelumnya</button><button className="btn ghost sm" disabled={i >= list.length - 1} onClick={() => go(1)}>Berikutnya →</button></div>
      {done && <div className={'card ' + (sel === q.answer ? 'good' : 'bad')}><b>{sel === q.answer ? '✅ BENAR!' : '❌ SALAH — Jawaban yang benar: ' + q.answer}</b><p>Pembahasan: {q.explanation}</p>{sel !== q.answer && q.wrong?.[sel] && <p>Mengapa pilihan {sel} keliru: {q.wrong[sel]}</p>}{q.tips && <p>💡 Tips: {q.tips}</p>}{q.time && <small>Estimasi waktu: {q.time} detik</small>}</div>}</div>}
    <small className="muted">{PRACTICE_LABEL}</small></div>
}
