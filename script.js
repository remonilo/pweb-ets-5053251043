const form = document.getElementById("form-input")
const inputDesc = document.getElementById("desc")
const inputNominal = document.getElementById("nominal")
const inputKategori = document.getElementById("kategori")
const inputTanggal = document.getElementById("tanggal")
const tipePilihan = document.getElementById("tipe-pilihan")
const errorForm = document.getElementById("error-form")

const peringatan = document.getElementById("peringatan")
const totalPemasukan = document.getElementById("total-pemasukan")
const totalPengeluaran = document.getElementById("total-pengeluaran")
const totalNominal = document.getElementById("total-nominal")
const totalBulanan = document.getElementById("total-bulanan")
const totalHarian = document.getElementById("total-harian")

const judulList = document.getElementById("judul-list")
const tabelMasuk = document.getElementById("tabel-masuk")
const barisTabel = document.getElementById("baris-tabel")

function muatData() {
    try {
        return JSON.parse(localStorage.getItem("transaksi")) || [];
    } catch {
        return [];
    }
}

let daftarTransaksi = muatData();

function formatRupiah(angka) {
    return "Rp " + angka.toLocaleString("id-ID")
}

function simpan() {
    localStorage.setItem("transaksi", JSON.stringify(daftarTransaksi))
}

function hapus(index) {
    if (!confirm("Hapus transaksi ini?")) {
        return;
    }
    daftarTransaksi.splice(index, 1)
    simpan()
    renderData()
}

function hariTersisa() {
    const now = new Date();
    const jumlahHariBulanIni = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    return jumlahHariBulanIni - now.getDate() + 1;
}

function tanggalHariIni() {
    const now = new Date();
    const bulan = String(now.getMonth() + 1).padStart(2, "0");
    const hari = String(now.getDate()).padStart(2, "0");
    return now.getFullYear() + "-" + bulan + "-" + hari;
}

function renderData() {
    barisTabel.innerHTML = ""
    let pemasukan = 0
    let pengeluaran = 0
    let bulanan = 0
    let pengeluaranHariIni = 0
    const hariIni = tanggalHariIni()

    daftarTransaksi.forEach(function(transaksi, index) {
        let tanda = "-"
        if(transaksi.tipe === "masuk" || transaksi.tipe === "bulanan") {
            pemasukan += transaksi.nominal;
            tanda = "+"
            if (transaksi.tipe === "bulanan") {
                bulanan += transaksi.nominal;
            }
        } else {
            pengeluaran += transaksi.nominal;
            if (transaksi.tanggal === hariIni) {
                pengeluaranHariIni += transaksi.nominal;
            }
        }

        const baris = document.createElement("tr")
        const isiKolom = [
            transaksi.tanggal, 
            transaksi.deskripsi, 
            transaksi.kategori, 
            tanda + formatRupiah(transaksi.nominal)
        ]

        isiKolom.forEach(function(isi) {
            const sel = document.createElement("td");
            sel.textContent = isi; 
            baris.appendChild(sel);
        });

        const tombolHapus = document.createElement("button")
        tombolHapus.type = "button"
        tombolHapus.textContent = "Hapus"
        tombolHapus.addEventListener("click", function () {
            hapus(index);
        });

        const selAksi = document.createElement("td")
        selAksi.appendChild(tombolHapus); 
        baris.appendChild(selAksi);

        barisTabel.appendChild(baris);
    });

    const saldo = pemasukan - pengeluaran

    const jatahHarian = Math.floor(saldo / hariTersisa())

    totalPemasukan.textContent = formatRupiah(pemasukan); 
    totalPengeluaran.textContent = formatRupiah(pengeluaran); 
    totalNominal.textContent = formatRupiah(saldo);
    totalBulanan.textContent = formatRupiah(bulanan);
    totalHarian.textContent = formatRupiah(jatahHarian);
    tabelMasuk.hidden = daftarTransaksi.length === 0;

    if (pengeluaranHariIni > jatahHarian) {
        peringatan.textContent = "Pengeluaran hari ini (" + formatRupiah(pengeluaranHariIni) + ") melebihi jatah harian (" + formatRupiah(jatahHarian) + ")"
    } else {
        peringatan.textContent = ""
    }
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const deskripsi = inputDesc.value.trim();
    const nominal = Number(inputNominal.value);
    const tanggal = inputTanggal.value;

    if (tanggal === "") {
        errorForm.textContent = "Tanggal wajib diisi";
        return;
    }
    if (!(nominal > 0)) {
        errorForm.textContent = "Nominal harus lebih dari 0";
        return;
    }
    errorForm.textContent = "";

    daftarTransaksi.unshift({
        id: Date.now(),
        tipe: form.elements.tipe.value,
        deskripsi: deskripsi,
        nominal: nominal,
        kategori: inputKategori.value,
        tanggal: tanggal,
    });

    simpan();
    renderData();
    form.reset();
});

renderData();
