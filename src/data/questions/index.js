const files = import.meta.glob('./*.json', { eager: true })
export const QUESTIONS = Object.entries(files).flatMap(([path, m]) => {
  const key = path.replace('./', '').replace('.json', '')
  return (m.default || m).map((q) => ({ ...q, uid: key + ':' + q.id, section: key }))
})
