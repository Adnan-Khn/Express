const express = require("express")
const { getAllNotes, createNote, getNoteById, deleteNoteById, updateNoteById, updatePartialNoteById } = require("../controlllers/notes.controllers")
const routes = express.Router()

routes.get("/all-notes",getAllNotes)
routes.post("/create",createNote)
routes.get("/:id",getNoteById)
routes.delete("/:id",deleteNoteById)
routes.put("/:id",updateNoteById)
routes.patch("/:id",updatePartialNoteById)

module.exports = routes