import { Link } from 'react-router-dom'
import { useStore } from '../context/Store'
import { Bar } from '../components/Bits'
import { EXAM } from '../data/config'
import { pct, quoteOfDay, streakOf } from '../utils/helpers'
export default function Dashboard() {
  const { s, setTargets } = useStore()
  const a = s.answers, acc = pct(a.filter((x) => x.ok).length, a.length)
  const bySec = EXAM.sections.map((x) => { const r = a.filter((y) => y.uid.startsWith(x.key + ':')); return { ...x, total: r.length, acc: pct(r.filter((y) => y.ok).length, r.length) } })
  const weak = bySec.filter((x) => x.total >= 1 && x.acc < 70).sort((p, q) => p.acc - q.acc)
  return <div><h2>👋 Halo, {s.user.name}!</h2><p className="muted">{quoteOfDay()}</p>
    <div className="grid"><div className="card">🎯 Target<b>{s.targets.campus}</b></div><div className="card">🔥 Streak<b>{streakOf(a)} hari</b></div><div className="card">📝 Soal dikerjakan<b>{a.length}</b></div><div className="card">🎯 Akurasi<b>{acc}%</b></div><div className="card">Level {Math.floor(s.xp / 1000) + 1}<b>{s.xp % 1000} / 1000 XP</b><Bar v={(s.xp % 1000) / 10} /></div></div>
    <h3>Lanjutkan Belajar</h3><div className="grid">{bySec.map((x) => <div className="card" key={x.key}>{x.name}<Bar v={x.acc} /><small>Akurasi {x.acc}% · {x.total} soal</small><Link className="btn sm" to={'/soal?s=' + x.key}>Lanjutkan</Link></div>)}</div>
    <h3>🔎 Analisis Kemampuan</h3>{weak.length ? weak.map((x) => <div className="card warn" key={x.key}>⚠️ {x.name}: {x.acc}%<small>Kamu sering salah di subtes ini. Ulangi materinya dan kerjakan 10 soal latihan.</small></div>) : <div className="card">Belum ada area lemah terdeteksi. Kerjakan lebih banyak soal.</div>}
    <h3>🎓 Target Belajar Pribadi</h3><div className="card"><input aria-label="Kampus" value={s.targets.campus} onChange={(e) => setTargets({ ...s.targets, campus: e.target.value })} /><input aria-label="Program studi" value={s.targets.prodi} onChange={(e) => setTargets({ ...s.targets, prodi: e.target.value })} /><small>Ini target belajar pribadi, bukan jaminan diterima.</small></div></div>
}
