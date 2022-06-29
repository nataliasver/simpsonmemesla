const MemesDb = require("./meme.service")

const getAllMemes = (req, res, next) => {
        return res.json({
            test: "hola"
        })
}

module.exports = { getAllMemes };