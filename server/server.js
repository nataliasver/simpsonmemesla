const express = require("express")
require("dotenv").config()

const server = express()
server.use(express.json());
server.use(express.urlencoded({ extended: true }))

server.use("/api", require("./memes/memes.routes"))

server.listen(4000, (err) => {
    err ? console.dir("Server failed...") : console.dir("Server running on port http://localhost:4000")
})