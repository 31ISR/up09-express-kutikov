const Database = require("better-sqlite3")

const db = new Database("database.db")

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL
    )
`)

db.exec(`
    CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        status INTEGER NOT NULL,
        name TEXT NOT NULL
    )
`)

module.exports = db