from _lib import Bank
B = Bank('penalaran-matematika', 'Penalaran Matematika'); a = B.add
assert 200000 * 8 * 9 // 100 == 144000
a('Matematika kehidupan sehari-hari','Diskon bertingkat','medium','Sebuah barang seharga Rp200.000 mendapat diskon 20%, lalu diskon tambahan 10% dari harga setelah diskon pertama. Harga akhir barang tersebut adalah...',['Rp140.000','Rp144.000','Rp150.000','Rp160.000','Rp170.000'],'B','Setelah diskon pertama: 80% × 200.000 = 160.000. Diskon kedua: 90% × 160.000 = 144.000. Total diskon 28%, bukan 30%.','Diskon bertingkat dihitung berurutan; jangan dijumlahkan.',75,{'A':'Menjumlahkan diskon 20% + 10% = 30%.'})
assert 10 * 300 // 4 == 750 and 750 - 700 == 50
a('Aritmetika dan aljabar','Perbandingan senilai','easy','Resep kue untuk 4 porsi memerlukan 300 gram tepung. Jika tersedia 700 gram tepung dan ingin membuat 10 porsi, tepung yang kurang adalah... gram.',['25','50','75','100','150'],'B','Per porsi 300 ÷ 4 = 75 g. Untuk 10 porsi = 750 g. Kurang 750 − 700 = 50 g.','Cari nilai satu satuan dulu, lalu kalikan.',60)
assert 20 * 12 - (20 - 2) * (12 - 2) == 60
a('Geometri dan pengukuran','Luas daerah arsiran','medium','Sebuah taman persegi panjang berukuran 20 m × 12 m. Di dalamnya, sepanjang tepi dibuat jalan setapak selebar 1 m. Luas jalan setapak tersebut adalah... m².',['48','56','60','64','72'],'C','Luas taman 240. Bagian dalam (tanpa jalan) berukuran (20−2) × (12−2) = 18 × 10 = 180. Luas jalan = 240 − 180 = 60.','Lebar jalan di kedua sisi mengurangi panjang dan lebar masing-masing 2 × lebar.',90)
assert 3*6 + 5*7 + 7*8 + 5*9 == 154 and 154 / 20 == 7.7
a('Statistika dan peluang','Rata-rata dari tabel frekuensi','medium','Nilai ulangan 20 siswa: nilai 6 (3 siswa), 7 (5 siswa), 8 (7 siswa), dan 9 (5 siswa). Rata-rata nilai tersebut adalah...',['7,5','7,6','7,7','7,8','8,0'],'C','Jumlah = 6×3 + 7×5 + 8×7 + 9×5 = 18 + 35 + 56 + 45 = 154. Rata-rata = 154 ÷ 20 = 7,7.','Rata-rata tabel = Σ(nilai × frekuensi) ÷ Σ frekuensi.',90)
assert 500 * 2 ** (12 // 3) == 8000
a('Pemodelan matematika','Pertumbuhan eksponensial','hard','Jumlah bakteri berlipat dua setiap 3 jam. Jika awalnya 500 bakteri, jumlah bakteri setelah 12 jam adalah...',['2.000','4.000','6.000','8.000','10.000'],'D','Dalam 12 jam terjadi 12 ÷ 3 = 4 kali penggandaan: 500 × 2⁴ = 500 × 16 = 8.000.','Banyak periode = waktu total ÷ waktu per periode.',90,{'C':'6.000 muncul bila menambah (bukan melipatgandakan).'})
assert (1 * 3) / (2 * 6) == 0.25
a('Statistika dan peluang','Peluang kejadian saling bebas','medium','Sebuah koin dan sebuah dadu setimbang dilempar bersamaan. Peluang muncul angka pada koin dan mata dadu prima adalah...',['1/12','1/6','1/3','1/2','1/4'],'E','Peluang angka = 1/2. Mata dadu prima: 2, 3, 5 → 3/6 = 1/2. Kejadian bebas: 1/2 × 1/2 = 1/4.','Kejadian saling bebas → peluang dikalikan.',75)
B.save()
