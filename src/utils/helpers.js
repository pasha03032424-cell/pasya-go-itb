export const today = () => new Date().toISOString().slice(0, 10)
export const LETTERS = ['A', 'B', 'C', 'D', 'E']
export const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0)
export const fmt = (s) => [Math.floor(s / 3600), Math.floor((s % 3600) / 60), s % 60].map((n) => String(n).padStart(2, '0')).join(':')
const QUOTES = ['Tidak harus sempurna hari ini. Yang penting terus maju.', 'Satu soal hari ini lebih baik daripada tidak belajar sama sekali.', 'Target besar dimulai dari satu langkah kecil.']
export const quoteOfDay = () => QUOTES[Math.floor(Date.now() / 864e5) % QUOTES.length]
export function streakOf(answers) {
  const days = new Set(answers.map((a) => a.day))
  const d = new Date()
  let n = 0
  if (!days.has(d.toISOString().slice(0, 10))) d.setDate(d.getDate() - 1)
  while (days.has(d.toISOString().slice(0, 10))) { n++; d.setDate(d.getDate() - 1) }
  return n
}
