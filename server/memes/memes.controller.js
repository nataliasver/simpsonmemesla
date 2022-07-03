const { cloudinary, uploader } = require('cloudinary')
const MemesDb = require("./meme.service")
const _ = require("lodash");
const {response} = require("express");
const Datauri = require('datauri');
const path = require('path');
const DataURIParser = require("datauri/parser");
const MemesService = new MemesDb();

const getAllMemes = (req, res, next) => {
        return MemesService.findAll()
            .then(response => res.json(response));
}

const getMemesById = (req, res, next) => {
    return MemesService.findAllByIdQuery(req.query.value)
        .then(response => {
            console.log(response);
            return res.json(response)
        })
        .catch(response => res.json({error: "something went wrong"}))
}

const getMemesByTitle = (req, res, next) => {
    return MemesService.findAllByTitleQuery(req.query.value)
        .then(response => {
            console.log(response);
            return res.json(response)
        })
        .catch(response => res.json({error: "something went wrong"}))
}

const getMemesBySeason = (req, res, next) => {
    return MemesService.findAllBySeason(parseInt(req.query.value))
        .then(response => {
            console.log(response);
            return res.json(response)
        })
        .catch(response => res.json({error: "something went wrong"}))
}

const getMemesByEpisode = (req, res, next) => {
    return MemesService.findAllByEpisode(parseInt(req.query.value))
        .then(response => {
            console.log(response);
            return res.json(response)
        })
        .catch(response => res.json({error: "something went wrong"}))
}

const getMemesByCharacter = (req, res, next) => {
    return MemesService.findAllByCharacter(req.query.value)
        .then(response => {
            console.log(response);
            return res.json(response)
        })
        .catch(response => res.json({error: "something went wrong"}))
}

const uploadMemes = (req, res, next) => {
    const dUri = new DataURIParser();
    const dataUri = dUri.format(path.basename(req.file.originalname).toString(), req.file.buffer);
    const file = dataUri.content;
    const meme = {
        title: req.body.title,
        season: req.body.season,
        episode: req.body.episode,
        description: req.body.description,
        characters: _(req.body.characters).split(",").compact().value(),

    }
    return uploader.upload(file)
        .then((result) => meme.meme_img_url = result.url)
        .then(() => MemesService.create(meme))
        .then(() => res.json("Salio todo joyaaaaa xD"))

}

module.exports = { getAllMemes, uploadMemes, getMemesById, getMemesByTitle, getMemesByEpisode, getMemesBySeason, getMemesByCharacter };