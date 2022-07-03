const router = require("express").Router()
const { getAllMemes, uploadMemes, getMemesById, getMemesByTitle, getMemesBySeason, getMemesByEpisode, getMemesByCharacter } = require("./memes.controller")
const multer  = require('multer')
const cloudinary = require('cloudinary').v2

const storage = multer.memoryStorage()

cloudinary.config({
    cloud_name: 'hlfsdsmbr',
    api_key: '998847769732581',
    api_secret: 'l-xAEQmofOJIbpT-WP_Sv43yy_g'
});

const upload = multer({ storage: storage })

router.get("/memes", getAllMemes)

router.get("/memes/id", getMemesById)

router.get("/memes/title", getMemesByTitle)
router.get("/memes/season", getMemesBySeason)
router.get("/memes/episode", getMemesByEpisode)
router.get("/memes/character", getMemesByCharacter)

router.post("/upload/meme", upload.single('file'), uploadMemes);

module.exports = router