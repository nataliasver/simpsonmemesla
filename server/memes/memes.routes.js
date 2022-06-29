const router = require("express").Router()
const { getAllMemes, uploadMemes } = require("./memes.controller")
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/memes/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

router.get("/memes", getAllMemes)

router.post("/upload/meme", upload.single('file'), uploadMemes);

module.exports = router