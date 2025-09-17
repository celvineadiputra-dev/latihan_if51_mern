// --- BAGIAN 1: IMPOR MODUL ---
// Mengimpor 'express', kerangka kerja (framework) web untuk Node.js yang akan menjadi dasar aplikasi kita.
import express from "express";
// Mengimpor 'method-override', sebuah "alat bantu" (middleware) untuk memungkinkan form HTML
// mengirim request selain GET dan POST, seperti PUT dan DELETE.
import methodOverride from "method-override";
// Mengimpor konfigurasi port dari file terpisah, ini adalah praktik yang baik untuk menjaga kode tetap rapi.
import { APP_PORT } from "./config/config.js";


// --- BAGIAN 2: INISIALISASI APLIKASI & "DATABASE" ---
// Membuat instance aplikasi Express yang kita beri nama 'app'. Inilah objek utama server kita.
const app = express();

// Variabel untuk melacak ID buku terakhir, sebagai simulasi auto-increment di database.
let lastId = 2;
// Array ini berfungsi sebagai "database" sementara di memori. Data akan hilang jika server restart.
const books = [
  {
    id: 1,
    title: 'Belajar express',
    author: "Penulis 1"
  },
  {
    id: 2,
    title: 'Belajar react',
    author: "Penulis 2"
  }
];


// --- BAGIAN 3: KONFIGURASI MIDDLEWARE ---
// Memberitahu Express untuk menggunakan 'ejs' sebagai view engine untuk merender halaman HTML.
app.set('view engine', 'ejs');

// Menggunakan middleware 'method-override' untuk memeriksa query parameter `_method`.
// Contoh: <form action="/book/1?_method=DELETE" method="POST"> akan dianggap sebagai request DELETE.
app.use(methodOverride('_method'));

// Middleware untuk mem-parsing (menguraikan) data body dari request form (format urlencoded).
// Tanpa ini, `req.body` tidak akan berisi data dari form yang dikirim oleh pengguna.
app.use(express.urlencoded({ extended: true }));


// --- BAGIAN 4: RUTE-RUTE APLIKASI (ENDPOINTS) ---

// [READ] Rute untuk halaman utama: menampilkan semua buku.
app.get("/", (req, res) => {
  // Merender file `views/index.ejs` dan mengirimkan variabel `title` dan `books` ke dalamnya.
  res.render("index", {
    title: "Books",
    books: books
  });
});

// [CREATE-FORM] Rute untuk menampilkan halaman form tambah buku baru.
app.get('/book/create', (req, res) => {
  // Hanya merender file `views/addNewBook.ejs` dengan data judul.
  res.render('addNewBook', {
    title: "Create new book",
  });
});

// [UPDATE-FORM] Rute untuk menampilkan halaman form edit buku berdasarkan ID.
app.get('/book/:id/update', (req, res) => {
  // Mengambil nilai `id` dari parameter URL (contoh: /book/1/update -> id = "1").
  const id = req.params.id;

  // Mencari index buku di dalam array `books` yang id-nya cocok dengan id dari URL.
  const bookIndex = books.findIndex(book => book.id == id);

  // Merender file `views/editNewBook.ejs` dan mengirimkan data buku yang akan diedit.
  res.render("editNewBook", {
    title: "Edit Book",
    book: books[bookIndex]
  });
});

// [CREATE-ACTION] Rute untuk memproses data dari form tambah buku.
app.post('/book', (req, res) => {
  // Melakukan destructuring untuk mengambil `title` dan `author` dari `req.body`.
  const { title, author } = req.body;

  // Menambahkan buku baru ke dalam array `books` dengan ID yang di-generate.
  books.push({
    id: lastId + 1,
    title,
    author
  });

  // Menaikkan nilai `lastId` untuk buku berikutnya.
  lastId++;

  // Mengalihkan pengguna kembali ke halaman utama ('/') setelah berhasil menambahkan.
  res.redirect("/");
});

// [UPDATE-ACTION] Rute untuk memproses perubahan data buku berdasarkan ID.
app.put('/book/:id', (req, res) => {  
  // Mengambil `id` dari parameter URL.
  const id = req.params.id;

  // Mencari index buku yang akan diupdate.
  const bookIndex = books.findIndex(book => book.id == id);

  // Mengambil data `title` dan `author` yang baru dari `req.body`.
  const { title, author } = req.body;

  // Mengganti objek buku yang lama dengan yang baru pada index yang ditemukan.
  // Spread syntax `...books[bookIndex]` memastikan properti lain (seperti `id`) tidak hilang.
  books[bookIndex] = {
    ...books[bookIndex],
    title,
    author
  };

  // Mengalihkan pengguna kembali ke halaman utama setelah berhasil mengupdate.
  res.redirect("/");
});

// [DELETE-ACTION] Rute untuk menghapus buku berdasarkan ID.
app.delete("/book/:id", (req, res) => {
  // Mengambil `id` dari parameter URL.
  const id = req.params.id;

  // Mencari index buku yang akan dihapus.
  const bookIndex = books.findIndex(book => book.id == id);

  // Menghapus 1 elemen dari array `books` pada posisi `bookIndex`.
  books.splice(bookIndex, 1);

  // Mengalihkan pengguna kembali ke halaman utama setelah berhasil menghapus.
  res.redirect("/");
});


// --- BAGIAN 5: MENJALANKAN SERVER ---
// "Menghidupkan" server agar mulai mendengarkan request HTTP yang masuk pada port yang telah ditentukan.
app.listen(APP_PORT, () => {
  // Callback ini akan dijalankan sekali ketika server berhasil dinyalakan.
  console.log(`App start : http://localhost:${APP_PORT}`);
});