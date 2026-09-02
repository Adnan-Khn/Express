import postModel from "../models/post.models.js";
import { sendFiles } from "../services/imagekit.js";

const createPost = async(req,res)=>{
    try {
        const {caption} = req.body;
        const image = req.file;

        //console.log(caption, image);

        if (!caption || !image) {
            return res.status(400).json({ message: "Caption and image are required" });
        }

        let response = await sendFiles(image.buffer, image.originalname)

        console.log("Response from ImageKit",response)

        const post = await postModel.create({
            caption,
            imageUrl: response.url
        })

        res.status(201).json({ message: "Post created successfully", data:post });

    } catch (error) {
        res.status(500).json({ message: "Error creating post :", error: error.message });
    }
}
const getAllPosts = async(req,res)=> {
    try{
        const posts = await postModel.find().sort({ createdAt: -1 });
        res.status(200).json({ data: posts });
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts :", error: error.message });
    }
}
export { createPost, getAllPosts };