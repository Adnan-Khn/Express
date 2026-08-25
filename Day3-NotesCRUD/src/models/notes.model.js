const { default: mongoose } = require("mongoose");

const notesSchema  = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },description:{
        type:String,
        minlength:[12, "Minimum 12 characters are required"],
        required: true
    }
})

const notesModel = mongoose.model("notes",notesSchema)

module.exports = notesModel