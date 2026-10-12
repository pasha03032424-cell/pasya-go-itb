# PASYA GO ITB
Platform belajar pribadi UTBK-SNBT (React + Vite, progres di localStorage) dengan AI Tutor berbasis backend.

## Menjalankan
    npm install
    npm run dev          # frontend, http://localhost:5173
    npm run server       # backend AI Tutor (terminal terpisah), http://localhost:8787
    npm run build        # cek build produksi
    npm run validate     # validasi bank soal (ID unik, 5 opsi, kunci, pembahasan, dll.)

## Mengaktifkan AI Tutor
1. Buat API key di https://console.anthropic.com/ (menu API keys).
2. Salin `.env.example` menjadi `.env`, isi `ANTHROPIC_API_KEY=...` (opsional ubah `ANTHROPIC_MODEL`).
3. Jalankan `npm run server`, lalu buka halaman **AI Tutor**. Jika key kosong, halaman menampilkan status "belum dikonfigurasi".
- Key hanya dibaca server (`server/index.js`), tidak memakai awalan `VITE_`, dan `.env` sudah ada di `.gitignore`.
- Perlindungan: batas panjang pesan, batas riwayat, batas ukuran body, rate limit per IP, timeout. Error ditampilkan apa adanya, tanpa jawaban palsu.
- Untuk produksi, jalankan server di host yang sama/di belakang reverse proxy dan set `ALLOWED_ORIGIN`.

## Data
- Struktur ujian: `src/data/config.js` (cocokkan dengan https://www.snpmb.id/).
- Soal: `src/data/questions/*.json`. Wajib: id, category, topic, subtopic, difficulty (easy/medium/hard), question, options[5], answer, explanation, tips, time (detik); opsional `wrong` (penjelasan per opsi keliru).
- Batch soal ditulis di `scripts/batches/*.py` (jawaban numerik diverifikasi dengan kode). Jalankan **sekali** per batch; `npm run validate` akan menolak duplikat.
- Soal latihan orisinal, bukan soal resmi UTBK.

## Status bank soal (hitung dari data asli: `npm run validate`)
Paket penuh 160 soal sesuai `src/data/config.js`: Penalaran Umum 30, PPU 20, PBM 20, Pengetahuan Kuantitatif 20, Literasi Indonesia 30, Literasi Inggris 20, Penalaran Matematika 20.
- Soal literasi memakai field `passage` (teks bacaan) yang tampil di Bank Soal, Tryout, dan halaman Salah.
- `python3 scripts/balance-answers.py` menyeimbangkan posisi kunci jawaban (A-E) tanpa mengubah isi soal.
