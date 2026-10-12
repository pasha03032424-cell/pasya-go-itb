import { EXAM, SOURCE, DISCLAIMER } from '../data/config'
export default function Info() {
  return <div><h2>ℹ️ Info Resmi SNBT</h2><div className="card"><p>{DISCLAIMER}</p><p>UTBK-SNBT {EXAM.year}: durasi total {EXAM.duration} menit.</p>
    <table><tbody>{EXAM.sections.map((x) => <tr key={x.key}><td>{x.name}</td><td>{x.n} soal</td></tr>)}</tbody></table>
    <p>Jadwal, persyaratan, dan ketentuan terbaru hanya dapat dipastikan di sumber resmi:</p><a className="btn sm" href={SOURCE} target="_blank" rel="noreferrer">snpmb.id</a></div></div>
}
