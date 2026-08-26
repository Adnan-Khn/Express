const { default: mongoose } = require("mongoose")

const connectDb = async() =>{
    const mongoDbUri = process.env.MONGODB_URI

    if(!mongoDbUri){
        console.log("No connection uri found for MongoDB")
        return
    }
    try {
        await mongoose.connect(mongoDbUri)
        console.log("MongoDB Connected")
    } catch (error) {
        console.log("Error while MongoDB Connection : ", error)
    }
    
}

module.exports = connectDb