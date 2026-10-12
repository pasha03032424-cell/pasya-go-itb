import { useState, useEffect } from 'react'
export function useLocalStorage(key, initial) {
  const [v, setV] = useState(() => { try { return { ...initial, ...JSON.parse(localStorage.getItem(key)) } } catch { return initial } })
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(v)) } catch { /* penyimpanan diblokir */ } }, [key, v])
  return [v, setV]
}
