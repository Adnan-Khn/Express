const express = require("express");
require("dotenv").config();
const connectDb = require("./config/db");
const notesRoutes = require("./routes/notes.routes")

const app = express();

app.use(express.json());
connectDb();

app.get("/", (req, res) => {
  //console.log("Backend is fine");
  res.send("Backend is fine");
});

// app.post("/create", createNote);
app.use("/notes",notesRoutes)

module.exports = app;
