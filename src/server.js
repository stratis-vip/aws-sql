const express = require('express')
const bodyParser = require("body-parser");
const db = require('./dbase.js')
const md5= require('md5')

const app = express()
const HTTP_PORT = 8000

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.listen(HTTP_PORT, () => console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT)))

app.get("/", (req, res, next) => res.json({"message": "OK"}))

app.get("/api/users", (req, res, next) => {
    const SQL = "SELECT * FROM user"
    const params = []
    db.all(SQL, params, (err, rows) => {
        if (err) {
            return res.status(400).json({"error": err.message})
        } else {
            return res.json({
                "message": "success",
                "data": rows
            })
        }
    })
})

app.get("/api/user/:id", (req, res, next) => {
    const sql = "SELECT * FROM user WHERE id = ?"
    const params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
            return res.status(400).json({"error": err.message});
        }
        return res.json({
            "message": "success",
            "data": row
        })
    });
});


app.post("/api/user/", (req, res, next) => {
    const errors = []
    if (!req.body.name) {
        errors.push("No Name specified")
    }
    if (!req.body.password) {
        errors.push("No Password specified")
    }
    if (!req.body.email) {
        errors.push("No email specified")
    }
    if (errors.length) {
        return res.status(400).json({"error": errors})
    }

    const data = {
        name: req.body.name,
        email: req.body.email,
        password: md5(req.body.password)
    }

    const SQL = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
    const params = [data.name, data.email, data.password]
    db.run(SQL, params, (err, result) => {
        if (err) {
            return res.status(400).json({"error": err.message})
        }
        return res.json({
            "message": "success",
            "data": data,
            "id": this.lastID
        })
    })
})

app.use((req, res) => res.status(404))