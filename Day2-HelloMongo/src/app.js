// const dns = require("dns");

// dns.setServers(["8.8.8.8", "1.1.1.1"]);
require('dotenv').config();

const express = require("express");
const connectDb = require("./config/db");
const notesModel = require("./models/note.model");

const app = express();
app.use(express.json());

connectDb();

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.post("/create",async (req,res)=>{
    const {title,description} = req.body

    const newNote = await notesModel.create({
        title,
        description
    })

    res.send({
        success:true,
        message:"Note Added",
        data: newNote
    })
})


module.exports = app