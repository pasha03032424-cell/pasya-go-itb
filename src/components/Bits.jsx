import { LETTERS } from '../utils/helpers'
export const Bar = ({ v }) => <div className="bar"><i style={{ width: v + '%' }} /></div>
export const Logo = () => <div className="logo"><b>PGI</b><small>PASYA GO ITB</small></div>
export function Options({ q, sel, onSel, lock, showAnswer }) {
  return <div className="opts">{q.options.map((o, i) => {
    const L = LETTERS[i]
    const cls = ['opt', sel === L && 'sel', showAnswer && q.answer === L && 'good', showAnswer && sel === L && sel !== q.answer && 'bad'].filter(Boolean).join(' ')
    return <button key={L} className={cls} disabled={lock} onClick={() => onSel(L)}><span>{L}</span>{o}</button>
  })}</div>
}
