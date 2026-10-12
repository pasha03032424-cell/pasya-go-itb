import { Link } from 'react-router-dom'
import { QUESTIONS } from '../data/questions'
import { useStore } from '../context/Store'
export default function Wrong() {
  const { s, removeWrong } = useStore()
  const items = QUESTIONS.filter((q) => s.wrongQuestions[q.uid])
  return <div><h2>❌ Soal yang Salah</h2>{!items.length && <div className="card empty">Belum ada soal salah. Kerjakan soal di Bank Soal.</div>}
    {items.map((q) => <div className="card" key={q.uid}><small>{q.category} · {q.topic}</small>{q.passage && <blockquote className="passage">{q.passage}</blockquote>}<p>{q.question}</p><b>❌ Salah {s.wrongQuestions[q.uid]} kali</b><p>Jawaban: {q.answer}. {q.explanation}</p>
      <div className="row"><Link className="btn sm" to={'/soal?s=' + q.section}>Pelajari Lagi</Link><button className="btn ghost sm" onClick={() => removeWrong(q.uid)}>Sudah paham, hapus</button></div></div>)}</div>
}
