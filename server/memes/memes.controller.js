const MemesDb = require("./meme.service")
const _ = require("lodash");
const {response} = require("express");

const getAllMemes = (req, res, next) => {
        return new MemesDb().findAll()
            .then(response => res.json(response));
}

const getMemeById = (req, res, next) => {
    console.log(req.query)
    return new MemesDb().findOneQuery(req.query.value)
        .then(response => res.json(response))
        .catch(response => res.json({error: "something went wrong"}))
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

module.exports = { getAllMemes, uploadMemes, getMemeById };