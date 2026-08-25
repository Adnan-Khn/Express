const express = require("express")
const {createNote,getAllNotes, getNoteById, deleteNoteById, updateNoteById} = require("../controllers/notes.controller")

const router = express.Router()

router.post("/create",createNote)
router.get("/all",getAllNotes)
router.get("/:id",getNoteById)
router.delete("/:id",deleteNoteById)
router.put("/:id",updateNoteById)

module.exports = router