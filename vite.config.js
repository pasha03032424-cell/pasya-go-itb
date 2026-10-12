import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// /api diteruskan ke backend AI Tutor (npm run server) saat pengembangan.
export default defineConfig({ plugins: [react()], server: { proxy: { '/api': 'http://localhost:8787' } } })
