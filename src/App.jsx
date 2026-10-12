import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
import { BookOpen, Home, ListChecks, Trophy, XCircle, Info as InfoIcon, Sun, Moon, Monitor, Bot } from 'lucide-react'
import { Logo } from './components/Bits'
import { useStore } from './context/Store'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Bank from './pages/Bank'
import Wrong from './pages/Wrong'
import Tryout from './pages/Tryout'
import Materi from './pages/Materi'
import Info from './pages/Info'
import Tutor from './pages/Tutor'
const NAV = [['/dashboard', Home, 'Beranda'], ['/materi', BookOpen, 'Materi'], ['/soal', ListChecks, 'Soal'], ['/tryout', Trophy, 'Tryout'], ['/tutor', Bot, 'AI Tutor'], ['/salah', XCircle, 'Salah'], ['/info', InfoIcon, 'Info']]
export default function App() {
  const { pathname } = useLocation()
  const { s, setTheme } = useStore()
  if (pathname === '/') return <Landing />
  const T = ['light', 'dark', 'system'], Ic = { light: Sun, dark: Moon, system: Monitor }[s.settings.theme]
  return <div className="app"><header><Logo /><nav>{NAV.map(([to, I, l]) => <NavLink key={to} to={to}><I size={18} /><span>{l}</span></NavLink>)}</nav>
    <button className="icon" aria-label="Ganti tema" onClick={() => setTheme(T[(T.indexOf(s.settings.theme) + 1) % 3])}><Ic size={18} /></button></header>
    <main><Routes><Route path="/dashboard" element={<Dashboard />} /><Route path="/materi" element={<Materi />} /><Route path="/soal" element={<Bank />} /><Route path="/tryout" element={<Tryout />} /><Route path="/tutor" element={<Tutor />} /><Route path="/salah" element={<Wrong />} /><Route path="/info" element={<Info />} /></Routes></main></div>
}
