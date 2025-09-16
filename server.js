// Mengimpor 'framework' Express untuk membuat dan mengelola server HTTP.
// Analogi: Mempersiapkan 'toolkit' utama untuk membangun aplikasi web.
import express from "express";

// Mengimpor variabel APP_PORT dari file konfigurasi terpisah.
// 'Best practice' agar konfigurasi mudah diubah tanpa menyentuh logika utama.
import { APP_PORT } from "./config/config.js";

// Membuat sebuah instance aplikasi Express.
// Inilah objek utama yang akan kita gunakan untuk mendefinisikan semua rute dan perilaku server.
const app = express();

// --- PENDEFINISIAN RUTE (ENDPOINT) ---

// Mendefinisikan rute untuk URL akar ('/'). Ini adalah halaman utama.
// 'app.get' berarti rute ini merespons metode HTTP GET.
app.get('/', (req, res) => {
    // Mengirimkan respons berupa teks sederhana ke klien.
    res.send("Hello, Selamat datang di Link to bio");
});

// Mendefinisikan rute dengan satu parameter dinamis bernama 'npm'.
// ':npm' adalah 'placeholder' untuk nilai apa pun di segmen URL tersebut.
app.get('/mahasiswa/:npm', (req, res) => {
    // Mengambil nilai parameter 'npm' dari objek 'req.params'.
    const npm = req.params.npm;

    // Mengirimkan respons yang berisi nilai NPM yang ditangkap dari URL.
    res.send(`Npm saya adalah : ${npm}`);
});

// Mendefinisikan rute dengan dua parameter dinamis, 'npm' dan 'age'.
app.get('/mahasiswa-multiple-parameter/:npm/:age', (req, res) => {
    // Menggunakan 'destructuring' untuk mengekstrak 'npm' dan 'age' dari 'req.params'.
    // Ini cara yang lebih ringkas dan modern.
    const { npm, age } = req.params;

    // Mengirimkan respons yang berisi kedua nilai parameter tersebut.
    res.send(`Npm saya adalah : ${npm} dengan umur ${age}`);
});

// Mendefinisikan rute dengan parameter 'npm' yang bersifat opsional.
// Sintaks yang lebih umum di Express adalah '/:npm?'.
app.get('/mahasiswa-optional{/:npm}', (req, res) => {
    // Menggunakan 'nullish coalescing operator' (??) untuk memberikan nilai default.
    // Jika 'req.params.npm' tidak ada (null/undefined), maka gunakan "Tanpa NPM".
    const npm = req.params.npm ?? "Tanpa NPM";

    // Mengirimkan respons dengan nilai NPM atau nilai default-nya.
    res.send(`Npm saya adalah : ${npm}`);
});

// Mendefinisikan rute untuk pencarian yang menggunakan 'query string'.
// Contoh URL: /search-mahasiswa?npm=12345
app.get('/search-mahasiswa', (req, res) => {
    // Mengambil nilai 'npm' dari objek 'req.query' (data setelah tanda '?').
    const npm = req.query.npm;

    // Mengirimkan respons berdasarkan data dari 'query string'.
    res.send(`Npm ${npm} tidak ditemukan`);
});

// Mendefinisikan rute yang mengirimkan respons berupa HTML.
// Browser akan merender string ini sebagai elemen HTML.
app.get('/status', (req, res) => {
    res.send('<h1 style="color:red">Server is running</h1>');
});

// Mendefinisikan rute API yang mengembalikan data dalam format JSON.
app.get('/profile/:npm', (req, res) => {
    // Mengambil parameter 'npm' dari URL.
    const { npm } = req.params;

    // Menyiapkan objek JavaScript sebagai data respons.
    const detail = {
        npm: npm,
        nama: "Nama Kamu",
        umur: 12
    };

    // Mengirimkan respons berupa JSON dengan status HTTP 200 (OK).
    // 'res.json()' secara otomatis mengubah objek menjadi JSON dan mengatur header 'Content-Type'.
    res.status(200).json(detail);
});

// --- MENJALANKAN SERVER ---

// Memulai server dan membuatnya "mendengarkan" koneksi pada port yang ditentukan di APP_PORT.
// 'Callback function' di argumen kedua akan dieksekusi setelah server berhasil berjalan.
app.listen(APP_PORT, () => {
    // Menampilkan pesan di konsol/terminal untuk memberitahu developer bahwa server sudah siap.
    console.log(`App start http://localhost:${APP_PORT}`);
});