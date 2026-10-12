// Struktur UTBK-SNBT. Ubah di sini jika ketentuan SNPMB berubah; seluruh app mengikuti.
export const EXAM = {
  year: 2026, duration: 195,
  sections: [
    { key: 'penalaran-umum', name: 'Penalaran Umum', n: 30, min: 30 },
    { key: 'ppu', name: 'Pengetahuan dan Pemahaman Umum', n: 20, min: 15 },
    { key: 'pbm', name: 'Pemahaman Bacaan dan Menulis', n: 20, min: 25 },
    { key: 'pengetahuan-kuantitatif', name: 'Pengetahuan Kuantitatif', n: 20, min: 20 },
    { key: 'literasi-indonesia', name: 'Literasi Bahasa Indonesia', n: 30, min: 42.5 },
    { key: 'literasi-inggris', name: 'Literasi Bahasa Inggris', n: 20, min: 20 },
    { key: 'penalaran-matematika', name: 'Penalaran Matematika', n: 20, min: 42.5 },
  ],
}
// Durasi per subtes (min) mengikuti pembagian waktu SNPMB; total 195. Verifikasi di snpmb.id.
export const SOURCE = 'https://www.snpmb.id/'
export const DISCLAIMER = 'Struktur dan informasi ujian dapat berubah mengikuti ketentuan resmi SNPMB.'
export const PRACTICE_LABEL = 'Soal latihan dibuat untuk pembelajaran dan bukan soal resmi UTBK.'
