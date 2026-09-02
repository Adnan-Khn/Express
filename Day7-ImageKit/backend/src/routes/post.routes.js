import express from "express"
import upload from "../config/multer.config.js"
import {createPost, getAllPosts} from "../controllers/post.controllers.js"

const routes = express.Router()

routes.post("/create",upload.single("image"), createPost)
routes.get("/all", getAllPosts)

export default routes