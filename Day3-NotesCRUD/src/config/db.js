const mongoose = require("mongoose")

const connectDb = async()=>{
    const password = process.env.PASSWORD
    //console.log(password)
    if(!password){
        console.log("Password is missing for MongoDB")
        return
    }

    try {
        await mongoose.connect(`mongodb+srv://adnankhaan09_db_user:${password}@cluster0.yeg1dae.mongodb.net/`)
        console.log("Connection successful")
    } catch (error) {
        console.log("MongoDB connection error : ",error)
    }
}

module.exports = connectDb