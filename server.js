import express from "express"
import { APP_PORT } from "./config/config.js"

const app = express()

const books = [
    {
        id : 1,
        title: 'Belajar express',
        penulis: "Penulis 1"
    },
    {
        id : 2,
        title: 'Belajar react',
        penulis: "Penulis 2"
    }
]

app.set('view engine', 'ejs')

app.get("/", (req, res) => {
    res.render("index", {
        title : "Books",
        books : books
    })
})

app.get("/book/:id", (req, res) => {
    const id = req.params.id

    const bookIndex = books.findIndex(book => book.id == id)

    books.splice(bookIndex, 1)

    res.redirect("/")
})

app.listen(APP_PORT, () => {
    console.log(`App start : http://localhost:${APP_PORT}`);
})