import { Link } from 'react-router-dom'
import { Logo } from '../components/Bits'
import { ListChecks, Timer, BarChart3, Flame, Target } from 'lucide-react'
const F = [[ListChecks, 'Bank Soal'], [Timer, 'Tryout'], [BarChart3, 'Analisis'], [Flame, 'Streak'], [Target, 'Target ITB']]
export default function Landing() {
  return <div className="hero"><Logo /><h1>Belajar Hari Ini.<br />Temui ITB Nanti.</h1><p>Platform belajar untuk mempersiapkan UTBK-SNBT secara terarah.</p><p className="muted">"Satu langkah lebih dekat menuju kampus impian."</p>
    <div className="row"><Link className="btn" to="/dashboard">Mulai Belajar</Link><Link className="btn ghost" to="/soal">Lihat Soal</Link></div>
    <div className="grid feat">{F.map(([I, t]) => <div className="card" key={t}><I />{t}</div>)}</div></div>
}
