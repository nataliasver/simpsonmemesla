const MemesDb = require("./meme.service")
const _ = require("lodash");

const getAllMemes = (req, res, next) => {
        return res.json({
            test: "hola"
        })
}

const uploadMemes = (req, res, next) => {
    console.log(req.body);
    console.log(req.file);
    const meme = {
        title: req.body.title,
        season: req.body.season,
        episode: req.body.episode,
        description: req.body.description,
        characters: _(req.body.characters).split(",").compact().value(),
        meme_img_url: req.file.path
    }
    console.log(meme)
    return new MemesDb().create(meme)
}

module.exports = { getAllMemes, uploadMemes };