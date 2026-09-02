import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const connectDB = async()=>{
    try{

        let res  = await mongoose.connect(process.env.MONGODB_URI)

        console.log("Connected to MongoDB")
    }catch(error){
        console.log("Error while connecting to DB",error)
    }
}

export default connectDB