const express = require("express")
const { filePost } = require("../controllers/file.controllers")
const upload = require("../config/multer")

const routes = express.Router()

routes.post("/post",upload.single("image"),filePost)

module.exports = routes