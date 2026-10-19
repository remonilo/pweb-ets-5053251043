# AI-LOG

Alat AI: Claude (Claude Code CLI)

Setiap entri mencatat satu penggunaan AI yang menghasilkan kode: prompt yang dikirim (ringkas), bagian kode yang dipakai, dan apa yang saya ubah atau perbaiki dari hasil AI.

## Setup: referensi elemen DOM
- Prompt: "bisa buatkan const masing masing dengan format penulisan yang ada di script.js line 1 dan 2"
- Dipakai: deklarasi const `document.getElementById(...)` di script.js baris 3-17 (baris 1-2 saya tulis sendiri)
- Diubah: - 

## Perbaikan W1–W6, id, dan peringatan jatah harian
- Prompt: "aku melanggar apa saja yang di kebutuhan fungsional?" lalu "bisa perbaiki hal tersebut?"
- Dipakai di script.js:
  - `muatData()` dengan try/catch untuk JSON.parse
  - `confirm()` di `hapus()`
  - `hariTersisa()` ditulis ulang, ditambah `tanggalHariIni()`
  - di `renderData()`: variabel `bulanan`, `pengeluaranHariIni`, `saldo`, `jatahHarian`, dan peringatan jatah harian
  - di submit: validasi tanggal dan nominal dengan pesan di `#error-form`, `id: Date.now()`, deskripsi jadi opsional
  - `renderData()` dipanggil saat halaman dimuat
- Dipakai di index.html: `<p id="error-form">` di dalam form, label "Nominal" diganti "Saldo"
- Diubah: rumus jatah menjadi saldo / sisa hari agar sesuai dengan requirement 

<!-- Format entri:
## Nama fitur (misal W1: Tambah transaksi)
- Prompt: "..."
- Dipakai: fungsi ...() di script.js
- Diubah: ...
-->
