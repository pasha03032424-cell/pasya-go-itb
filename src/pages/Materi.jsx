import { useState } from 'react'
import { Link } from 'react-router-dom'
import { EXAM } from '../data/config'
import { MATERI } from '../data/materi'
import { Bar } from '../components/Bits'
import { useStore } from '../context/Store'
import { pct } from '../utils/helpers'
export default function Materi() {
  const { s, finishMateri } = useStore()
  const [k, setK] = useState(null), [toast, setToast] = useState('')
  const sec = EXAM.sections.find((x) => x.key === k)
  if (!sec) return <div><h2>📚 Materi</h2><div className="grid">{EXAM.sections.map((x) => { const d = MATERI[x.key].filter((_, i) => s.materiDone.includes(x.key + i)).length; return <div className="card" key={x.key}><b>{x.name}</b><Bar v={pct(d, MATERI[x.key].length)} /><small>{d}/{MATERI[x.key].length} bab · {x.n} soal · {x.min} menit</small><button className="btn sm" onClick={() => setK(x.key)}>Belajar</button></div> })}</div></div>
  return <div><button className="btn ghost sm" onClick={() => setK(null)}>← Semua materi</button><h2>{sec.name}</h2>{toast && <div className="card good">{toast}</div>}
    {MATERI[k].map((m, i) => { const id = k + i, ok = s.materiDone.includes(id); return <div className="card" key={id}><b>{m.t}</b><p>💡 {m.c}</p>{m.e && <p>📝 Contoh: {m.e}</p>}
      <button className="btn sm" disabled={ok} onClick={() => { finishMateri(id); setToast('✅ Materi selesai! +20 XP') }}>{ok ? '✅ Selesai' : 'Tandai selesai'}</button></div> })}
    <Link className="btn" to={'/soal?s=' + k}>Latihan soal</Link> <Link className="btn ghost" to={'/tryout?s=' + k}>Tryout subtes ini</Link>
    <p><small className="muted">Ringkasan belajar buatan sendiri, bukan materi resmi. Cek kisi-kisi di snpmb.id.</small></p></div>
}
