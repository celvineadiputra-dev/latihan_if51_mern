import express from "express"
import session from "express-session"
import flash from 'express-flash-message';
import { APP_SECRET_SESSION } from "./config/config.js"
import web from "./routes/web.js";

const app = express()

app.use(express.static('public'))
app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: true }))

app.use(session({
    // Kunci rahasia yang digunakan untuk menandatangani (sign) cookie ID sesi.
    // Ini WAJIB ada dan harus dijaga kerahasiaannya untuk mencegah pemalsuan cookie.
    // 'APP_SECRET_SESSION' idealnya diambil dari environment variable.
    secret: APP_SECRET_SESSION,

    // Jika 'false', sesi tidak akan disimpan kembali ke session store jika tidak ada 
    // perubahan selama request. Ini adalah pengaturan yang disarankan untuk mencegah race conditions.
    resave: false,

    // Jika 'false', sesi yang baru dibuat tetapi belum dimodifikasi (kosong) tidak akan 
    // disimpan. Ini bagus untuk efisiensi dan mematuhi aturan privasi seperti GDPR.
    saveUninitialized: false,

    // Konfigurasi untuk cookie sesi yang akan dikirim ke browser.
    cookie: {
        // 'true' memastikan cookie hanya dikirim melalui koneksi HTTPS.
        // Sangat penting untuk keamanan di lingkungan produksi.
        secure: true,

        // 'true' mencegah cookie diakses oleh JavaScript di sisi klien (misalnya, document.cookie).
        // Ini adalah pertahanan penting terhadap serangan Cross-Site Scripting (XSS).
        httpOnly: true,

        // Menetapkan masa berlaku cookie dalam milidetik.
        // 1000ms * 60s * 60m * 24j = 24 jam. Sesi akan bertahan selama 1 hari.
        maxAge: 1000 * 60 * 60 * 24,

        // 'lax' memberikan perlindungan terhadap serangan Cross-Site Request Forgery (CSRF).
        // Ini adalah pengaturan default yang seimbang antara keamanan dan fungsionalitas.
        sameSite: 'lax'
    }
}));

app.use(flash({
    sessionKeyName: "express-flash-message"
}))

app.use(web)

export default app