import mongoose from "mongoose"
import config from "./config.js"

export const connectDB = async()=>{
    //console.log(config.MONGODB_URI)
    try {
        await mongoose.connect(config.MONGODB_URI)
        console.log("DB connection successful")
    } catch (error) {
        console.log("Error while DB connection", error.message)
    }
    
}