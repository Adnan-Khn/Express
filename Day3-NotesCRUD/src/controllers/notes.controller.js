const notesModel = require("../models/notes.model");

const createNote = async (req, res) => {
  try {
    const { title, description } = req.body;

    const newNote = await notesModel.create({
      title,
      description,
    });
    return res.status(201).json({
      message: "Notes created!",
      data: newNote,
    });
  } catch (err) {
    console.log("Error while adding notes : ", err);
    return res.status(401).json({
        message:"Req body was not proper",
        error: err.errors
    })
  }
}

const getAllNotes = async(req,res)=>{
    try {
        const notes = await notesModel.find()
        return res.status(200).json({
            message:"All notes fetched",
            data:notes
        })
    } catch (error) {
        return res.status(402).json({
            message:"Cannot be fetched",
            error:error
        })
    }
}

const getNoteById = async(req,res)=>{
    try {
        let noteId = req.params.id
        console.log(noteId)

        const note = await notesModel.findById(noteId)

        return res.status(200).json({
            message:`Note fetched by ID : ${noteId}`,
            data:note
        })
    } catch (error) {
        return res.status(402).json({
            message:"Cannot be fetched",
            error:error
        })
    }
}

const deleteNoteById = async(req,res)=>{
    try {
        const noteId = req.params
        const note = await notesModel.findByIdAndDelete(noteId)

        return res.status(200).json({
            message:"Note deleted successfully"
        })
    } catch (error) {
        return res.status(402).json({
            message:"Cannot be fetched",
            error:error
        })
    }
}

const updateNoteById = async(req,res)=>{
    try {
        const noteId = req.params.id    
        const body = req.body

        const updatedNote = await notesModel.findByIdAndUpdate(noteId,body,{new:true})

        return res.status(200).json({
            message:"Note updated successfully",
            data:updatedNote
        })
    } catch (error) {
        return res.status(402).json({
            message:"Cannot be fetched",
            error:error
        })
    }
}

module.exports = {createNote,getAllNotes,getNoteById,deleteNoteById,updateNoteById}
