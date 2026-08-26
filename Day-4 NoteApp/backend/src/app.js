const express = require("express")
const connectDb = require("./config/db")
const cors = require("cors")
const notesRoutes = require("./routes/notes.routes")

const app = express()
app.use(cors({
    origin:"http://localhost:5173"
}))
app.use(express.json())

connectDb()

app.get("/",(req,res)=>{
    console.log("Backend running")
    res.send("Backend running")
})

app.use("/notes",notesRoutes)

module.exports = app