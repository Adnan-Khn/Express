const express = require("express")
const { createUser } = require("../controllers/user.controllers")
const upload = require("../config/multer.config")

const routes = express.Router()

routes.post("/create",upload.array("images"),createUser)

module.exports = routes