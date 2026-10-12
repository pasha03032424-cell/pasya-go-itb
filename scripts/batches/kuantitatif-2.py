from _lib import Bank
import math
B = Bank('pengetahuan-kuantitatif', 'Pengetahuan Kuantitatif'); a = B.add
assert math.lcm(12, 18) == 36
a('Operasi bilangan','KPK dalam konteks','easy','Dua lampu berkedip bersama pada detik ke-0. Lampu pertama berkedip tiap 12 detik dan lampu kedua tiap 18 detik. Keduanya berkedip bersama lagi setelah... detik.',['24','30','36','48','72'],'C','Waktu kedip bersama berikutnya adalah KPK(12, 18) = 36 detik.','Kejadian berulang yang bertemu lagi → KPK.',60)
assert (2**5 * 2**3) // 2**6 == 4
a('Operasi bilangan','Eksponen','easy','Nilai dari (2⁵ × 2³) ÷ 2⁶ adalah...',['2','4','8','16','32'],'B','Sifat eksponen: 2⁵ × 2³ = 2⁸; 2⁸ ÷ 2⁶ = 2² = 4.','Basis sama: kali → jumlahkan pangkat; bagi → kurangkan pangkat.',45)
assert 9 + 12 + math.isqrt(9*9 + 12*12) == 36
a('Geometri','Teorema Pythagoras','easy','Sebuah segitiga siku-siku memiliki sisi tegak 9 cm dan 12 cm. Keliling segitiga tersebut adalah... cm.',['27','33','34','36','45'],'D','Sisi miring = √(9² + 12²) = √225 = 15. Keliling = 9 + 12 + 15 = 36.','Hafalkan tripel Pythagoras: 3-4-5, 5-12-13, 9-12-15.',60,{'A':'Lupa menambahkan sisi miring.'})
assert 5**2 - 2*6 == 13
a('Persamaan dan pertidaksamaan','Persamaan kuadrat','hard','Jika x₁ dan x₂ adalah akar-akar persamaan x² − 5x + 6 = 0, maka nilai x₁² + x₂² adalah...',['11','12','13','14','15'],'C','x₁ + x₂ = 5 dan x₁x₂ = 6. x₁² + x₂² = (x₁ + x₂)² − 2x₁x₂ = 25 − 12 = 13. Cek: akar 2 dan 3, 4 + 9 = 13.','Gunakan jumlah dan hasil kali akar tanpa mencari akar.',90)
assert 5 * 12 - 4 * 10 == 20
a('Statistika','Rata-rata dan data hilang','medium','Rata-rata lima bilangan adalah 12. Setelah satu bilangan dibuang, rata-rata empat bilangan sisanya menjadi 10. Bilangan yang dibuang adalah...',['14','16','18','20','22'],'D','Jumlah awal 5 × 12 = 60. Jumlah sisa 4 × 10 = 40. Bilangan dibuang = 60 − 40 = 20.','Rata-rata × banyak data = jumlah data.',75)
B.save()
