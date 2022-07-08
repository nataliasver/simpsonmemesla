const router = require("express").Router()
const { getAllMemes, uploadMemes, getMemesById, getMemesByTitle, getMemesBySeason, getMemesByEpisode, getMemesByCharacter, deleteById, updateMeme } = require("./memes.controller")
const multer  = require('multer')
const {verifyToken} = require("../middleware/VerifyToken");
const cloudinary = require('cloudinary').v2

const storage = multer.memoryStorage()

cloudinary.config({
    cloud_name: 'hlfsdsmbr',
    api_key: '998847769732581',
    api_secret: 'l-xAEQmofOJIbpT-WP_Sv43yy_g'
});

const upload = multer({ storage: storage })

router.get("/memes", verifyToken, getAllMemes)

router.get("/id", getMemesById)
router.delete("/id", deleteById)
router.get("/title", getMemesByTitle)
router.get("/season", getMemesBySeason)
router.get("/episode", getMemesByEpisode)
router.get("/character", getMemesByCharacter)

router.post("/upload/meme", upload.single('file'), uploadMemes);
router.put("/update/meme", upload.single('file'), updateMeme)

module.exports = router