# Batch 1 Pengetahuan Kuantitatif (soal ditulis manual; jawaban numerik diverifikasi dengan kode)
import json, math, itertools
from fractions import Fraction as F
P = 'src/data/questions/pengetahuan-kuantitatif.json'
CAT = 'Pengetahuan Kuantitatif'
L = json.load(open(P)); nid = max(q['id'] for q in L) + 1
def add(topic, sub, diff, question, opts, ans, expl, tips, time, wrong=None):
    global nid
    assert len(opts) == 5 and 0 <= ans < 5
    q = dict(id=nid, category=CAT, topic=topic, subtopic=sub, difficulty=diff, question=question, options=opts,
             answer='ABCDE'[ans], explanation=expl, tips=tips, time=time)
    if wrong: q['wrong'] = {'ABCDE'[i]: t for i, t in wrong.items()}
    L.append(q); nid += 1

# verifikasi hitungan
assert 80000 * (1 - .25) == 60000
add('Persentase dan diskon', 'Harga setelah diskon', 'easy',
    'Harga sebuah buku Rp80.000 dan mendapat diskon 25%. Uang yang harus dibayar adalah...',
    ['Rp55.000', 'Rp60.000', 'Rp65.000', 'Rp20.000', 'Rp75.000'], 1,
    'Diskon = 25% × 80.000 = 20.000. Harga bayar = 80.000 − 20.000 = 60.000. Cara cepat: bayar 75% × 80.000 = 60.000.',
    'Baca yang ditanya: besar diskon atau harga akhir? Lebih cepat langsung hitung (100% − diskon).', 45,
    {3: 'Ini besar diskonnya, bukan harga yang dibayar.'})

assert 160000 * 5 // 8 == 100000
add('Rasio dan perbandingan', 'Pembagian berdasarkan rasio', 'easy',
    'Uang Ayu dan Budi berbanding 3 : 5. Jika jumlah uang mereka Rp160.000, uang Budi adalah...',
    ['Rp60.000', 'Rp80.000', 'Rp90.000', 'Rp100.000', 'Rp120.000'], 3,
    'Jumlah bagian = 3 + 5 = 8. Satu bagian = 160.000 ÷ 8 = 20.000. Uang Budi = 5 × 20.000 = 100.000.',
    'Jumlahkan dulu bagian rasio, cari nilai satu bagian, baru kalikan.', 60,
    {0: 'Ini uang Ayu (3 bagian), bukan Budi.'})

x, y = 4, 3; assert 2*x + y == 11 and x - y == 1
add('Sistem persamaan linear', 'Eliminasi dua variabel', 'medium',
    'Diketahui 2x + y = 11 dan x − y = 1. Nilai x + y adalah...',
    ['5', '6', '7', '8', '9'], 2,
    'Jumlahkan kedua persamaan: 3x = 12, sehingga x = 4. Dari x − y = 1 diperoleh y = 3. Jadi x + y = 7.',
    'Jika koefisien y berlawanan tanda (+y dan −y), langsung jumlahkan kedua persamaan.', 75)

a = 17 - 4 * 4; assert a == 1 and a + 8*4 == 33 and a + 11 * 4 == 45
add('Barisan dan deret', 'Suku ke-n barisan aritmetika', 'medium',
    'Pada barisan aritmetika, suku ke-5 adalah 17 dan suku ke-9 adalah 33. Suku ke-12 adalah...',
    ['41', '43', '45', '47', '49'], 2,
    'Beda b = (33 − 17) ÷ (9 − 5) = 4. Suku pertama a = U5 − 4b = 17 − 16 = 1. U12 = a + 11b = 1 + 44 = 45.',
    'Beda = selisih suku ÷ selisih nomor suku. Atau lompat langsung: U12 = U9 + 3b = 33 + 12 = 45.', 90)

n8 = sum(1 for i in range(1, 7) for j in range(1, 7) if i + j == 8); assert n8 == 5
add('Peluang', 'Peluang dua dadu', 'medium',
    'Dua dadu setimbang dilempar bersamaan. Peluang munculnya mata dadu berjumlah 8 adalah...',
    ['1/6', '5/36', '1/9', '7/36', '5/12'], 1,
    'Ruang sampel 6 × 6 = 36. Pasangan berjumlah 8: (2,6), (3,5), (4,4), (5,3), (6,2) = 5 pasangan. Peluang = 5/36.',
    'Daftar pasangan secara berurutan agar tidak ada yang terlewat atau terhitung ganda.', 75,
    {2: '1/9 = 4/36, hanya 4 pasangan; (4,4) tidak boleh terlewat.'})

assert math.comb(7, 3) == 35 and math.perm(7, 3) == 210
add('Peluang, permutasi, dan kombinasi', 'Kombinasi', 'medium',
    'Dari 7 siswa akan dipilih 3 orang untuk mewakili sekolah tanpa membedakan jabatan. Banyak cara memilih adalah...',
    ['21', '35', '42', '70', '210'], 1,
    'Tanpa membedakan jabatan berarti urutan tidak penting, sehingga memakai kombinasi: C(7,3) = 7×6×5 ÷ (3×2×1) = 35.',
    'Tanya diri: jika dua orang bertukar posisi, apakah hasilnya dianggap berbeda? Jika tidak → kombinasi.', 75,
    {4: '210 adalah permutasi P(7,3) yang membedakan urutan/jabatan.'})

d = sorted([12, 7, 9, 5, 15, 7, 10, 6]); assert (d[3] + d[4]) / 2 == 8
add('Statistika', 'Median data genap', 'medium',
    'Median dari data 12, 7, 9, 5, 15, 7, 10, 6 adalah...',
    ['7', '7,5', '8', '8,5', '9'], 2,
    'Urutkan: 5, 6, 7, 7, 9, 10, 12, 15 (8 data). Median = rata-rata data ke-4 dan ke-5 = (7 + 9) ÷ 2 = 8.',
    'Selalu urutkan dulu. Jumlah data genap → rata-ratakan dua data tengah.', 75,
    {0: 'Data belum diurutkan atau hanya memakai data ke-4.'})

l = 36 // 6; assert 2 * (2*l + l) == 36 and 2*l*l == 72
add('Geometri', 'Keliling dan luas persegi panjang', 'easy',
    'Keliling sebuah persegi panjang 36 cm dan panjangnya dua kali lebarnya. Luas persegi panjang tersebut adalah... cm².',
    ['54', '64', '72', '81', '96'], 2,
    'Misal lebar = l, panjang = 2l. Keliling = 2(2l + l) = 6l = 36, jadi l = 6 dan p = 12. Luas = 12 × 6 = 72.',
    'Gunakan satu variabel untuk semua sisi, lalu masukkan ke rumus keliling.', 75)

assert -3*0 + 4 < 13
add('Persamaan dan pertidaksamaan', 'Pertidaksamaan linear', 'medium',
    'Himpunan penyelesaian dari −3x + 4 < 13 adalah...',
    ['x < −3', 'x > −3', 'x < 3', 'x > 3', 'x > −9'], 1,
    '−3x < 13 − 4 = 9. Dibagi −3 (bilangan negatif) sehingga tanda berbalik: x > −3. Uji x = 0: 4 < 13 (benar).',
    'Ingat: kali/bagi bilangan negatif membalik tanda. Cek dengan satu angka uji.', 60,
    {0: 'Lupa membalik tanda pertidaksamaan.'})

f = lambda t: 2*t*t - 3*t + 1; assert f(-2) == 15
add('Fungsi dan grafik', 'Nilai fungsi', 'medium',
    'Jika f(x) = 2x² − 3x + 1, maka nilai f(−2) adalah...',
    ['3', '9', '11', '15', '17'], 3,
    'f(−2) = 2(−2)² − 3(−2) + 1 = 2(4) + 6 + 1 = 15.',
    'Beri tanda kurung saat substitusi bilangan negatif agar tanda tidak keliru.', 60,
    {1: 'Kemungkinan mengira −3(−2) = −6.'})

assert round(2 * 60 * 40 / (60 + 40), 6) == 48
add('Aritmetika dan rasio', 'Kecepatan rata-rata', 'hard',
    'Seseorang berkendara pergi dengan kecepatan 60 km/jam dan pulang lewat jalan yang sama dengan kecepatan 40 km/jam. Kecepatan rata-rata seluruh perjalanan adalah... km/jam.',
    ['50', '48', '52', '45', '46'], 1,
    'Misal jarak satu arah 120 km. Waktu pergi 2 jam, pulang 3 jam. Total 240 km dalam 5 jam = 48 km/jam. Kecepatan rata-rata bukan rata-rata aritmetika (50) karena waktu tempuhnya berbeda.',
    'Rata-rata kecepatan = total jarak ÷ total waktu. Pilih jarak kelipatan KPK kedua kecepatan agar mudah dihitung.', 120,
    {0: '50 adalah rata-rata aritmetika dua kecepatan; hanya benar jika waktu tempuhnya sama.'})

assert round(1.2 * 0.8, 6) == 0.96
add('Persentase dan diskon', 'Perubahan persentase berurutan', 'hard',
    'Harga suatu barang naik 20%, kemudian turun 20% dari harga yang baru. Dibandingkan harga semula, harga akhir...',
    ['Tetap sama', 'Turun 4%', 'Turun 2%', 'Naik 4%', 'Turun 1%'], 1,
    'Misal harga awal 100. Naik 20% → 120. Turun 20% dari 120 = 24 → 96. Harga akhir 96, turun 4% dari harga awal. Persen turun dihitung dari harga yang lebih besar (120), bukan 100.',
    'Misalkan harga awal 100 agar persentase langsung terbaca.', 90,
    {0: 'Persentase naik dan turun berbeda dasar hitungnya.'})

area = (100, 25)
add('Geometri', 'Luas daerah gabungan/selisih', 'hard',
    'Sebuah lingkaran terbesar digambar di dalam persegi bersisi 10 cm. Luas daerah persegi di luar lingkaran adalah... cm².',
    ['100 − 25π', '100 − 10π', '100 − 100π', '100 − 5π', '50 − 25π'], 0,
    'Diameter lingkaran = sisi persegi = 10, sehingga jari-jari 5 dan luas lingkaran = π × 5² = 25π. Luas daerah = 100 − 25π.',
    'Lingkaran terbesar di dalam persegi: diameter = sisi persegi.', 90,
    {1: '10π adalah keliling-nya bukan luas; jari-jari dikuadratkan.'})

json.dump(L, open(P, 'w'), ensure_ascii=False, indent=1)
print('total sekarang:', len(L))
