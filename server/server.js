const express = require("express")
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config()

const mongoUri = "mongodb+srv://simpsonmemesdb:simpsonmemestp@simpsondbcluster.hsblybu.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(mongoUri)
    .then(()=> console.log("Succesfully connect to mongo"))
    .catch(e => console.log("Could not connect to mongo. Error:",e))

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully to db");
});

const server = express()
server.use(express.json());
server.use(express.urlencoded({ extended: true }))


server.use("/api", require("./memes/memes.routes"))
// server.use(express.static(path.resolve(__dirname, "./src/build")));
// server.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });


server.listen(4000, (err) => {
    err ? console.dir("Server failed...") : console.dir("Server running on port http://localhost:4000")
})