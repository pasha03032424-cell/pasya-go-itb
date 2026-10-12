import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { QUESTIONS } from '../data/questions'
import { EXAM } from '../data/config'
import { Options } from '../components/Bits'
import { useStore } from '../context/Store'
import { fmt, pct } from '../utils/helpers'
// Jumlah soal = min(config, soal tersedia). Durasi: subtes = sec.min, penuh = EXAM.duration.
function build(n, key) {
  return EXAM.sections.filter((x) => !key || x.key === key).flatMap((sec) => {
    const pool = QUESTIONS.filter((q) => q.section === sec.key)
    return pool.length ? Array.from({ length: Math.min(sec.n, pool.length) }, (_, k) => pool[(k + n) % pool.length]) : []
  })
}
export default function Tryout() {
  const { record } = useStore()
  const [sp] = useSearchParams()
  const [qs, setQs] = useState(null), [ans, setAns] = useState({}), [flag, setFlag] = useState({}), [i, setI] = useState(0)
  const [left, setLeft] = useState(0), [dur, setDur] = useState(0), [res, setRes] = useState(null), [pick, setPick] = useState(sp.get('s') || '')
  const ref = useRef({}); ref.current = { qs, ans, left, dur }
  const start = (n, key) => { const d = Math.round((key ? EXAM.sections.find((x) => x.key === key).min : EXAM.duration) * 60); setQs(build(n, key)); setAns({}); setFlag({}); setI(0); setDur(d); setLeft(d) }
  const finish = () => {
    const { qs, ans, left, dur } = ref.current
    const rec = qs.map((q) => ({ uid: q.uid, category: q.category, topic: q.topic, ok: ans[q.uid] === q.answer }))
    record(rec, 50)
    const right = rec.filter((r) => r.ok).length
    const sec = EXAM.sections.map((x) => { const r = rec.filter((y) => y.uid.startsWith(x.key + ':')); return { name: x.name, n: r.length, ok: r.filter((y) => y.ok).length } }).filter((x) => x.n).map((x) => ({ ...x, score: Math.round((x.ok / x.n) * 1000) }))
    setRes({ right, wrong: qs.filter((q) => ans[q.uid] && ans[q.uid] !== q.answer).length, total: qs.length, used: dur - left, sec, avg: Math.round(sec.reduce((a, x) => a + x.score, 0) / sec.length) })
    setQs(null)
  }
  useEffect(() => {
    if (!qs) return
    const t = setInterval(() => setLeft((l) => l - 1), 1000)
    return () => clearInterval(t)
  }, [qs])
  useEffect(() => { if (qs && left <= 0) finish() }, [left]) // eslint-disable-line react-hooks/exhaustive-deps
  if (res) return <div><h2>🎉 Tryout Selesai</h2><div className="card"><b>Skor simulasi: {res.avg}</b><small>Skor = rata-rata (benar ÷ jumlah soal × 1000) per subtes. Ini penilaian sederhana; skor resmi UTBK memakai metode IRT yang tidak dapat ditiru persis.</small>
    <p>Benar {res.right} · Salah {res.wrong} · Kosong {res.total - res.right - res.wrong} · Akurasi {pct(res.right, res.total)}% · Waktu {fmt(res.used)}</p>{res.sec.map((x) => <div key={x.name}>{x.name}: {x.ok}/{x.n} · skor {x.score}</div>)}<button className="btn" onClick={() => setRes(null)}>Kembali</button></div></div>
  if (!qs) return <div><h2>🏆 Tryout</h2><p className="muted">Total {EXAM.duration} menit untuk 7 subtes. Soal yang tersedia: {QUESTIONS.length} (soal latihan orisinal).</p>
    <h3>Tryout Lengkap</h3><div className="grid">{[1, 2, 3, 4, 5].map((n) => <div className="card" key={n}>Tryout {n}<small>{EXAM.duration} menit · 7 subtes</small><button className="btn sm" onClick={() => start(n, '')}>Mulai</button></div>)}</div>
    <h3>Tryout per Subtes</h3><div className="grid">{EXAM.sections.map((x) => <div className={'card' + (pick === x.key ? ' warn' : '')} key={x.key}>{x.name}<small>{x.min} menit · {x.n} soal resmi</small><button className="btn sm" onClick={() => { setPick(x.key); start(1, x.key) }}>Mulai</button></div>)}</div></div>
  const q = qs[i]
  return <div><div className="row between"><h3>⏱️ {fmt(Math.max(left, 0))}</h3><small>Soal {i + 1} / {qs.length}</small></div>
    <div className="card"><small>{q.category}</small>{q.passage && <blockquote className="passage">{q.passage}</blockquote>}<p className="qtext">{q.question}</p><Options q={q} sel={ans[q.uid]} onSel={(L) => setAns({ ...ans, [q.uid]: L })} />
      <div className="row wrap"><button className="btn ghost sm" disabled={!i} onClick={() => setI(i - 1)}>← Sebelumnya</button><button className="btn ghost sm" onClick={() => setFlag({ ...flag, [q.uid]: !flag[q.uid] })}>{flag[q.uid] ? '🚩 Ditandai' : 'Tandai'}</button><button className="btn ghost sm" disabled={i >= qs.length - 1} onClick={() => setI(i + 1)}>Berikutnya →</button></div></div>
    <div className="nav">{qs.map((x, k) => <button key={x.uid} className={'n ' + (flag[x.uid] ? 'f' : ans[x.uid] ? 'a' : '') + (k === i ? ' cur' : '')} onClick={() => setI(k)}>{k + 1}</button>)}</div>
    <button className="btn" onClick={() => window.confirm('Kirim jawaban sekarang?') && finish()}>Selesai & Kirim</button></div>
}
