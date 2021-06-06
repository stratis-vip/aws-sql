const express = require('express')
const bodyParser = require("body-parser");
const md5= require('md5')

const app = express()


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", (req, res, next) => res.json({"message": "OK"}))

app.get("/api/users", (req, res, next) => {
  res.status(200).send({"message": "success", users: []})
})

app.get("/api/user/:id", (req, res, next) => {
    res.status(200).send({"message": "success", user: {
        id: req.params.id
        }})
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

    return res.status(200).json({
        "message": "success",
        "data": data
    })
})

app.use((req, res) => res.status(404))

module.exports = app