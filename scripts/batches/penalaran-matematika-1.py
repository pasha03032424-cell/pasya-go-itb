# Batch 1 Penalaran Matematika (soal manual; hitungan diverifikasi dengan kode)
import json, math
P = 'src/data/questions/penalaran-matematika.json'
CAT = 'Penalaran Matematika'
L = json.load(open(P)); nid = max(q['id'] for q in L) + 1
def add(topic, sub, diff, question, opts, ans, expl, tips, time, wrong=None):
    global nid
    assert len(opts) == 5 and 0 <= ans < 5
    q = dict(id=nid, category=CAT, topic=topic, subtopic=sub, difficulty=diff, question=question, options=opts,
             answer='ABCDE'[ans], explanation=expl, tips=tips, time=time)
    if wrong: q['wrong'] = {'ABCDE'[i]: t for i, t in wrong.items()}
    L.append(q); nid += 1

assert 40 + 15 * 14 == 250 and 40 + 15 * 13 < 250
add('Masalah kontekstual dan pemodelan', 'Pertidaksamaan dalam tabungan', 'medium',
    'Dina memiliki saldo awal Rp40.000 dan menabung Rp15.000 setiap minggu. Paling sedikit berapa minggu agar saldonya mencapai minimal Rp250.000?',
    ['12', '13', '14', '15', '16'], 2,
    'Model: 40.000 + 15.000k ≥ 250.000 → 15.000k ≥ 210.000 → k ≥ 14. Pada k = 13 saldo 235.000 (belum cukup), pada k = 14 saldo tepat 250.000.',
    'Kata "minimal" → tanda ≥. Uji bilangan di sekitar batas untuk memastikan.', 90,
    {1: 'Pada 13 minggu saldo baru Rp235.000.'})

p, b = 3, 5; assert 3*p + 2*b == 19 and p + b == 8
add('Aritmetika dan aljabar', 'Sistem persamaan dari soal cerita', 'medium',
    'Harga 3 pensil dan 2 buku adalah Rp19.000, sedangkan harga 1 pensil dan 1 buku adalah Rp8.000. Harga satu buku adalah...',
    ['Rp2.000', 'Rp3.000', 'Rp4.000', 'Rp5.000', 'Rp6.000'], 3,
    'Misal pensil = p, buku = b (ribuan). 3p + 2b = 19 dan p + b = 8. Kalikan persamaan kedua dengan 3: 3p + 3b = 24. Kurangkan: b = 24 − 19 = 5. Jadi buku Rp5.000 (pensil Rp3.000).',
    'Samakan koefisien salah satu variabel agar bisa dieliminasi.', 90,
    {1: 'Rp3.000 adalah harga pensil, bukan buku.'})

data = {'Jan': 40, 'Feb': 50, 'Mar': 45, 'Apr': 60, 'Mei': 75}
ch = {'Jan→Feb': 10/40, 'Feb→Mar': -5/50, 'Mar→Apr': 15/45, 'Apr→Mei': 15/60}
assert max(ch, key=ch.get) == 'Mar→Apr'
add('Interpretasi grafik dan tabel', 'Persentase kenaikan antarperiode', 'medium',
    'Penjualan (unit) sebuah toko: Januari 40, Februari 50, Maret 45, April 60, Mei 75. Kenaikan persentase terbesar dibandingkan bulan sebelumnya terjadi pada bulan...',
    ['Februari', 'Maret', 'Mei', 'April', 'Januari'], 3,
    'Kenaikan persentase = kenaikan ÷ nilai bulan sebelumnya. Feb: 10/40 = 25%. Mar: turun. Apr: 15/45 ≈ 33,3%. Mei: 15/60 = 25%. Terbesar pada April.',
    'Kenaikan yang sama (15 unit) bisa berarti persentase berbeda; bandingkan dengan dasar bulan sebelumnya.', 120,
    {2: 'Mei naik 15 unit juga, tetapi dasarnya lebih besar (60) sehingga hanya 25%.'})

assert 2 * 1.5 * 1 * 1000 - 1200 == 1800
add('Geometri dan pengukuran', 'Volume dan konversi satuan', 'easy',
    'Sebuah tangki berbentuk balok berukuran 2 m × 1,5 m × 1 m terisi penuh air. Jika 1.200 liter air telah dipakai, sisa air dalam tangki adalah... liter.',
    ['1.500', '1.800', '2.000', '2.400', '3.000'], 1,
    'Volume = 2 × 1,5 × 1 = 3 m³. Karena 1 m³ = 1.000 liter, volume = 3.000 liter. Sisa = 3.000 − 1.200 = 1.800 liter.',
    'Ubah satuan lebih dulu: 1 m³ = 1.000 liter.', 60,
    {4: '3.000 liter adalah volume penuh sebelum dipakai.'})

assert 2_000_000 * 0.06 * 9/12 == 90_000
add('Matematika kehidupan sehari-hari', 'Bunga tunggal', 'medium',
    'Rina menyimpan uang Rp2.000.000 dengan bunga tunggal 6% per tahun. Setelah 9 bulan, total tabungannya adalah...',
    ['Rp2.060.000', 'Rp2.090.000', 'Rp2.120.000', 'Rp2.180.000', 'Rp2.540.000'], 1,
    'Bunga = modal × persen × waktu (tahun) = 2.000.000 × 6% × 9/12 = 90.000. Total = 2.090.000.',
    'Ubah bulan menjadi bagian tahun: 9 bulan = 9/12 tahun.', 75,
    {2: 'Rp2.120.000 adalah hasil setelah 1 tahun penuh.'})

assert 12 * 20 == 240 and (240 - 12*5) / 9 == 20
add('Soal cerita bertingkat', 'Perbandingan berbalik nilai', 'hard',
    'Sebuah proyek direncanakan selesai dalam 20 hari oleh 12 pekerja. Setelah 5 hari bekerja, 3 pekerja berhenti dan tidak diganti. Sisa pekerjaan akan selesai dalam... hari.',
    ['15', '18', '20', '22', '25'], 2,
    'Total pekerjaan = 12 × 20 = 240 pekerja-hari. Dalam 5 hari terpakai 12 × 5 = 60. Sisa 180 pekerja-hari dikerjakan 9 pekerja: 180 ÷ 9 = 20 hari.',
    'Ukur pekerjaan dalam "pekerja-hari", lalu kurangi yang sudah dikerjakan.', 150,
    {4: '25 adalah total lama proyek (5 + 20), bukan sisa hari.'})

assert math.comb(5, 2) / math.comb(8, 2) == 10 / 28
add('Statistika dan peluang', 'Peluang tanpa pengembalian', 'medium',
    'Sebuah kotak berisi 5 kartu merah dan 3 kartu biru. Dua kartu diambil sekaligus secara acak. Peluang keduanya merah adalah...',
    ['5/14', '5/8', '25/64', '3/14', '3/4'], 0,
    'Pengambilan sekaligus → kombinasi. Kejadian: C(5,2) = 10. Ruang sampel: C(8,2) = 28. Peluang = 10/28 = 5/14.',
    'Sekaligus = tanpa pengembalian. Bukan (5/8)×(5/8) karena kartu pertama tidak dikembalikan.', 100,
    {2: '25/64 dipakai jika kartu dikembalikan setelah pengambilan pertama.'})

h = lambda t: -5*t*t + 20*t; assert h(2) == 20 and all(h(t/10) <= 20 for t in range(0, 50))
add('Fungsi dan persamaan', 'Nilai maksimum fungsi kuadrat', 'hard',
    'Tinggi bola (meter) setelah t detik dilempar ke atas dinyatakan h(t) = −5t² + 20t. Tinggi maksimum bola adalah... meter.',
    ['10', '15', '20', '25', '40'], 2,
    'Sumbu simetri t = −b/(2a) = −20/(2 × −5) = 2 detik. h(2) = −5(4) + 20(2) = −20 + 40 = 20 meter.',
    'Nilai maksimum fungsi kuadrat ada pada t = −b/2a.', 100,
    {4: '40 adalah hasil 20t tanpa mengurangi suku −5t².'})

assert (20*70 + 30*80) / 50 == 76
add('Statistika dan peluang', 'Rata-rata gabungan', 'medium',
    'Rata-rata nilai 20 siswa kelas A adalah 70 dan rata-rata nilai 30 siswa kelas B adalah 80. Rata-rata nilai seluruh siswa adalah...',
    ['75', '76', '77', '78', '80'], 1,
    'Jumlah A = 20 × 70 = 1.400. Jumlah B = 30 × 80 = 2.400. Rata-rata gabungan = 3.800 ÷ 50 = 76. Bukan 75 karena banyak siswa berbeda (bobot berbeda).',
    'Rata-rata gabungan = total nilai ÷ total siswa (rata-rata berbobot).', 75,
    {0: '75 adalah rata-rata dua rata-rata; mengabaikan bahwa kelas B lebih banyak.'})

assert (45 * 0.5) / (75 - 45) * 60 == 45
add('Soal cerita bertingkat', 'Kecepatan dan menyusul', 'hard',
    'Sebuah motor berangkat dengan kecepatan 45 km/jam. Setengah jam kemudian sebuah mobil menyusul dari tempat yang sama dengan kecepatan 75 km/jam. Mobil menyusul motor setelah... menit sejak mobil berangkat.',
    ['30', '40', '45', '50', '60'], 2,
    'Saat mobil berangkat, motor sudah menempuh 45 × 0,5 = 22,5 km. Selisih kecepatan = 75 − 45 = 30 km/jam. Waktu menyusul = 22,5 ÷ 30 = 0,75 jam = 45 menit.',
    'Menyusul: jarak awal ÷ selisih kecepatan. Perhatikan acuan waktu pada pertanyaan.', 150,
    {4: '60 menit adalah waktu sejak motor berangkat sebelum dikoreksi.'})

assert 6 * 250_000 / 100_000 == 15
add('Geometri dan pengukuran', 'Skala peta', 'easy',
    'Pada peta berskala 1 : 250.000, jarak dua kota adalah 6 cm. Jarak sebenarnya adalah... km.',
    ['1,5', '12', '15', '25', '150'], 2,
    'Jarak sebenarnya = 6 × 250.000 = 1.500.000 cm = 15.000 m = 15 km.',
    '100.000 cm = 1 km. Hilangkan 5 angka nol dari cm untuk mendapat km.', 60)

tag = 100_000 + 1500 * 120; assert tag == 280_000
add('Matematika kehidupan sehari-hari', 'Tarif bertingkat', 'hard',
    'Tarif listrik: 100 kWh pertama Rp1.000/kWh, selebihnya Rp1.500/kWh. Jika tagihan Rp280.000, pemakaian listrik adalah... kWh.',
    ['180', '200', '220', '240', '280'], 2,
    '100 kWh pertama = Rp100.000. Sisa tagihan = 280.000 − 100.000 = 180.000, dibagi 1.500 = 120 kWh. Total pemakaian = 100 + 120 = 220 kWh.',
    'Pisahkan tarif per tingkat, hitung bagian pertama dulu.', 120,
    {4: '280 hanya kebetulan sama dengan angka tagihan.'})

json.dump(L, open(P, 'w'), ensure_ascii=False, indent=1)
print('total sekarang:', len(L))
