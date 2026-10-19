# Penjelasan Persona
Persona yang didapat adalah Mahasiswa kos. Dengan fitur tambahan input uang bulanan, dan sistem akan menampilkan jatah harian dengan formula sisa uang (dalam konteks ini rekening) dibagi dengan sisa hari bulan ini. Sistem akan menampilkan peringatan jika pengeluaran hari ini melebihi jatah. 

## Struktur Data 
Data yang akan disimpan adalah dengan format sebagai berikut: 
- ID
- Tipe (Pengeluaran)
- Nominal
- Deskripsi 
- Kategori
- Tanggal 

## Keputusan Desain 
Saya mengambil desain simple, didominasi dengan border dan text font monospace (dalam pekerjaan ini menggunakan JetBrains Mono). Hal ini dikarenakan mengingat keterbatasan waktu untuk mengerjakan aplikasi yang fungsional dan deployed. 


## Bug Encounter
1.  script.js tidak dijalankan. 
    -> Web tidak bisa menjalankan script karena referensi salah. Ganti linkrel menjadi script dan tambahkan defer agar script di-load setelah html
2. Tombol Hapus selalu menghapus transaksi pertama, bukan transaksi yang diklik.
   -> function hapus() tidak punya parameter dan memanggil `daftarTransaksi.splice(indexedDB, 1)`. `indexedDB` ternyata API database bawaan browser, bukan index. Saat dipakai sebagai angka nilainya NaN, dan splice menganggap NaN sebagai 0. Saya ubah menjadi `function hapus(index)` dengan `splice(index, 1)`, sehingga index dari forEach di renderData() ikut terkirim saat tombol diklik.
