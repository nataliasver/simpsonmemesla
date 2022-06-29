const { model } = require("mongoose");
const Memes = require("./memes.model");
const Promise = require("bluebird")

class MemesService {

    create(meme) {
        return Promise.resolve(this.countAllMemesSeasonEpisode(meme.season, meme.episode))
            .then(countMemes => this._getNewMemeId(meme, countMemes))
            .tap(newMemeId => meme.meme_id = newMemeId)
            .then(() => Memes.create(meme))
    };

    _getNewMemeId(meme, countMemes){
        return (meme.season.toString()+ '_' + meme.episode.toString() + '_' + (countMemes+1).toString())
    }

    findAll() {
        return Memes.find({});
    };

    countAllMemesSeasonEpisode(season, episode){
        return Memes.count({season, episode})
    }

    findOne(memeId) {
        return Memes.findOne({ meme_id: memeId })
            .then((meme) => (!meme) ? Promise.reject( { name: "NotFound", statusCode: 404 }) : meme)
    };

}

module.exports = MemesService;

