// Validasi bank soal: node scripts/validate-questions.mjs
import { readdirSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
const dir = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data', 'questions')
const TARGET = 150
const DIFF = ['easy', 'medium', 'hard']
const errors = [], warns = [], seenText = new Map(), seenTpl = new Map(), counts = {}
for (const f of readdirSync(dir).filter((x) => x.endsWith('.json'))) {
  const key = f.replace('.json', ''), list = JSON.parse(readFileSync(join(dir, f), 'utf8'))
  const ids = new Set(); counts[key] = { total: list.length, easy: 0, medium: 0, hard: 0 }
  list.forEach((q, i) => {
    const at = `${key}#${q.id ?? i}`
    if (q.id == null || ids.has(q.id)) errors.push(`${at}: id kosong/duplikat`); ids.add(q.id)
    for (const k of ['category', 'topic', 'subtopic', 'question', 'explanation', 'tips'])
      if (!q[k] || !String(q[k]).trim()) errors.push(`${at}: field "${k}" kosong`)
    if (!DIFF.includes(q.difficulty)) errors.push(`${at}: difficulty tidak valid`); else counts[key][q.difficulty]++
    if (!Array.isArray(q.options) || q.options.length !== 5) errors.push(`${at}: harus 5 opsi`)
    else if (new Set(q.options.map((o) => String(o).trim())).size !== 5) errors.push(`${at}: opsi duplikat`)
    if (!['A', 'B', 'C', 'D', 'E'].includes(q.answer)) errors.push(`${at}: answer tidak valid`)
    if (!(q.time > 0)) errors.push(`${at}: time (detik) wajib > 0`)
    const full = String(q.passage || '') + String(q.question) + q.options.join('|')
    const exact = full.toLowerCase().replace(/\s+/g, ' ')
    if (seenText.has(exact)) errors.push(`${at}: duplikat persis dengan ${seenText.get(exact)}`); else seenText.set(exact, at)
    const tpl = (String(q.passage || '') + String(q.question)).toLowerCase().replace(/[\d\s.,]+/g, '')
    if (seenTpl.has(tpl) && !/^(barisan|perhatikan)/.test(String(q.question).toLowerCase())) warns.push(`${at}: kerangka mirip ${seenTpl.get(tpl)} (cek variasi konsep)`); else seenTpl.set(tpl, at)
  })
}
console.table(counts)
const total = Object.values(counts).reduce((a, c) => a + c.total, 0)
if (warns.length) console.warn('PERINGATAN:\n' + warns.join('\n'))
console.log(`Total soal aktual: ${total} (target ${TARGET * 7})`)
if (errors.length) { console.error(errors.slice(0, 50).join('\n')); console.error(`\n${errors.length} masalah ditemukan`); process.exit(1) }
console.log('Validasi lolos.')
