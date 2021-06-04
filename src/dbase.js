const sqlite3 = require('sqlite3').verbose()
const md5 = require('md5')

const DBSOURSE = "db.sqlite"

const createTable = `CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            email text UNIQUE, 
            password text, 
            CONSTRAINT email_unique UNIQUE (email)
            )`

let db = new sqlite3.Database(DBSOURSE, (err)=>{
    if (err){
        console.error(err)
        throw err
    } else {
        console.count('Connected to Sqlite database')
        db.run(createTable, err => {
            if (err){
                console.error(err)
            }else {
                const INSERT = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
                db.run(INSERT, ["admin","admin@example.com",md5("admin123456")])
                db.run(INSERT, ["user","user@example.com",md5("user123456")])

            }
        })
    }
})

module.exports = db