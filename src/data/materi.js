// Materi ringkasan buatan sendiri (bukan materi resmi SNPMB). t=judul, c=konsep, e=contoh
export const MATERI = {
  'penalaran-umum': [
    { t: 'Penalaran Induktif', c: 'Menemukan pola/aturan dari fakta, lalu menyimpulkan. Cek kesesuaian pernyataan dan hubungan sebab-akibat. Kesimpulan induktif bersifat kemungkinan, bukan pasti.', e: 'Pola 3, 6, 12, 24 → dikali 2, suku berikutnya 48.' },
    { t: 'Penalaran Deduktif', c: 'Menarik simpulan pasti dari premis. Kunci: "semua", "sebagian", "tidak ada". Gambar diagram lingkaran untuk premis kategorikal; untuk penalaran analitik, buat tabel kemungkinan.', e: 'Semua A adalah B; C adalah A → C adalah B.' },
    { t: 'Penalaran Kuantitatif', c: 'Membandingkan kuantitas dan hubungan matematika sederhana dengan aritmetika dasar. Sederhanakan dulu sebelum menghitung.', e: 'Bandingkan 3/4 dari 40 dan 2/3 dari 45: 30 dan 30 → sama.' },
  ],
  ppu: [
    { t: 'Kosakata & Makna', c: 'Pahami makna kata dari konteks kalimat, sinonim, antonim, dan padanan istilah. Perhatikan imbuhan yang mengubah makna.', e: '"Transparan" ≈ terbuka; antonim: tertutup.' },
    { t: 'Konteks & Hubungan Antargagasan', c: 'Kenali hubungan: sebab-akibat, pertentangan, contoh, urutan. Penanda: karena, namun, misalnya, sehingga.', e: '"Hujan deras, sehingga jalan tergenang" → sebab-akibat.' },
    { t: 'Pemahaman Informasi', c: 'Pisahkan fakta dan opini, cari kata kunci, dan hindari simpulan yang melebihi isi teks.', e: '' },
  ],
  pbm: [
    { t: 'Ide Pokok & Struktur Paragraf', c: 'Ide pokok = gagasan utama yang dijelaskan kalimat lain. Paragraf deduktif: pokok di awal; induktif: di akhir.', e: '' },
    { t: 'Informasi Tersurat & Tersirat', c: 'Tersurat ditulis langsung; tersirat disimpulkan dari petunjuk teks. Jangan memakai pengetahuan luar.', e: '' },
    { t: 'Kalimat Efektif & Ejaan', c: 'Hemat kata, tidak ambigu, tidak ada pleonasme (naik ke atas) dan jamak ganda (para siswa-siswa). Periksa subjek-predikat dan pilihan kata baku.', e: 'Benar: "Siswa berkumpul di lapangan."' },
  ],
  'pengetahuan-kuantitatif': [
    { t: 'Aljabar & Persamaan', c: 'Pindahkan suku ke satu sisi dan lakukan operasi yang sama di kedua ruas. Pertidaksamaan: tanda berbalik jika dikali/dibagi bilangan negatif.', e: '2x + 5 = 17 → x = 6.' },
    { t: 'Perbandingan & Aritmetika', c: 'Perbandingan senilai: hasil bagi tetap. Berbalik nilai: hasil kali tetap. Persen: bagian/total × 100.', e: '3/4 × 80 = 60.' },
    { t: 'Statistika & Peluang', c: 'Rata-rata = jumlah/banyak data. Median = data tengah terurut. Peluang = kejadian diinginkan / seluruh kemungkinan.', e: 'Peluang angka genap pada dadu = 3/6 = 1/2.' },
    { t: 'Geometri', c: 'Luas persegi panjang p×l; segitiga ½×a×t; lingkaran πr². Keliling lingkaran 2πr. Teorema Pythagoras a²+b²=c².', e: '' },
  ],
  'literasi-indonesia': [
    { t: 'Memahami Isi & Menemukan Informasi', c: 'Baca pertanyaan dulu, tandai kata kunci, lalu cari di teks. Jawaban harus punya dasar dalam bacaan.', e: '' },
    { t: 'Menyimpulkan & Menganalisis Argumen', c: 'Argumen = klaim + alasan + bukti. Uji: apakah bukti mendukung klaim? Waspadai generalisasi berlebihan.', e: '' },
    { t: 'Makna Kata & Evaluasi Informasi', c: 'Makna ditentukan konteks. Evaluasi: relevansi, kecukupan bukti, dan kelogisan.', e: '"Menuai kritik" → memperoleh kritik.' },
  ],
  'literasi-inggris': [
    { t: 'Vocabulary & Context', c: 'Guess meaning from surrounding sentences; look for synonyms, contrasts, and examples in the text.', e: '"Concise" = brief and clear.' },
    { t: 'Main Idea, Detail & Reference', c: 'Main idea: the point of the whole passage. Detail: stated facts. Reference: what a pronoun (it, they, this) points back to.', e: '' },
    { t: 'Inference, Purpose & Tone', c: 'Inference: logical conclusion not directly stated. Purpose: to inform, persuade, or entertain. Tone: attitude (critical, neutral, optimistic).', e: 'Packing a raincoat → expects rain.' },
  ],
  'penalaran-matematika': [
    { t: 'Masalah Kontekstual & Pemodelan', c: 'Ubah cerita menjadi model: tentukan variabel, tulis persamaan, selesaikan, lalu cek kewajarannya.', e: 'Tarif 5.000 + 2.500k = 20.000 → k = 6 km.' },
    { t: 'Data & Interpretasi Grafik', c: 'Baca judul, sumbu, satuan, dan skala. Bandingkan nilai dan perubahan (naik/turun) sebelum menghitung.', e: '' },
    { t: 'Statistika & Peluang Terapan', c: 'Pilih ukuran pemusatan yang sesuai (mean/median/modus). Peluang gabungan: kalikan untuk kejadian independen.', e: 'Rata-rata 70, 80, 90, 60, 100 = 80.' },
  ],
}
