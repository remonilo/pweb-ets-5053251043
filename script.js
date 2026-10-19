const form = document.getElementById("form-input")
const inputDesc = document.getElementById("desc")
const inputNominal = document.getElementById("nominal")
const inputKategori = document.getElementById("kategori")
const inputTanggal = document.getElementById("tanggal")
const tipePilihan = document.getElementById("tipe-pilihan")

const peringatan = document.getElementById("peringatan")
const totalPemasukan = document.getElementById("total-pemasukan")
const totalPengeluaran = document.getElementById("total-pengeluaran")
const totalNominal = document.getElementById("total-nominal")
const totalBulanan = document.getElementById("total-bulanan")
const totalHarian = document.getElementById("total-harian")

const judulList = document.getElementById("judul-list")
const tabelMasuk = document.getElementById("tabel-masuk")
const barisTabel = document.getElementById("baris-tabel")

let daftarTransaksi = JSON.parse(localStorage.getItem("transaksi",)) || [];

function formatRupiah(angka) {
    return "Rp " + angka.toLocaleString("id-ID")
}

function simpan() {
    localStorage.setItem("transaksi", JSON.stringify(daftarTransaksi))
}

function hapus() {
    daftarTransaksi.splice(indexedDB, 1)
    simpan()
    renderData()
}

