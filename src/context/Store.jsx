import { createContext, useContext, useEffect, useCallback } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { today } from '../utils/helpers'
const DEFAULT = { user: { name: 'Pasya' }, targets: { campus: 'Institut Teknologi Bandung', prodi: 'Teknik Informatika' }, answers: [], wrongQuestions: {}, favorites: [], materiDone: [], xp: 0, settings: { theme: 'system' } }
const Ctx = createContext()
// eslint-disable-next-line react-refresh/only-export-components
export const useStore = () => useContext(Ctx)
export function StoreProvider({ children }) {
  const [s, setS] = useLocalStorage('pasya-go-itb:v1', DEFAULT)
  useEffect(() => {
    const t = s.settings.theme
    document.documentElement.dataset.theme = t === 'system' ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : t
  }, [s.settings.theme])
  const record = useCallback((recs, extraXp = 0) => setS((p) => {
    const wrong = { ...p.wrongQuestions }
    recs.forEach((r) => { if (!r.ok) wrong[r.uid] = (wrong[r.uid] || 0) + 1 })
    return { ...p, answers: [...p.answers, ...recs.map((r) => ({ ...r, day: today() }))], wrongQuestions: wrong, xp: p.xp + recs.length * 10 + extraXp }
  }), [setS])
  const removeWrong = (uid) => setS((p) => { const w = { ...p.wrongQuestions }; delete w[uid]; return { ...p, wrongQuestions: w } })
  const toggleFav = (uid) => setS((p) => ({ ...p, favorites: p.favorites.includes(uid) ? p.favorites.filter((x) => x !== uid) : [...p.favorites, uid] }))
  const finishMateri = (id) => setS((p) => p.materiDone.includes(id) ? p : { ...p, materiDone: [...p.materiDone, id], xp: p.xp + 20 })
  const setTheme = (theme) => setS((p) => ({ ...p, settings: { ...p.settings, theme } }))
  const setTargets = (targets) => setS((p) => ({ ...p, targets }))
  return <Ctx.Provider value={{ s, record, removeWrong, toggleFav, finishMateri, setTheme, setTargets }}>{children}</Ctx.Provider>
}
