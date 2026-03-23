const express = require("express")
const db = require("./db.js")

const app = express()
app.use(express.json())
const PORT = 3000

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Hello world"
    })
})

app.get("/users", (req, res) => {
    try {
        const users = db
            .prepare(`SELECT * FROM users`)
            .all()

        return res.status(200).json(users)
    } catch (error) {
        console.error(error)
        res
            .status(500)
            .json({error: "Something went wrong"})
    }
})

app.post("/users", (req, res) => {
    try {
        const { email, name } = req.body

        if (!email || !name)
            return res
                .status(400)
                .json({error: "Missing fields"})
        const info = db
            .prepare("INSERT INTO users (email, name) VALUES(?, ?)")
            .run(email, name)

        const user = db
            .prepare("SELECT * FROM users WHERE id = ?")
            .get(info.lastInsertRowid)

        return res.status(201).json(user)
    } catch (error) {
        console.error(error)
        res
            .status(500)
            .json({error: "Something went wrong"})
    }
})

app.listen(PORT)