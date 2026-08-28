const express = require("express")
const fileRoutes = require("./routes/file.routes")
const app = express()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Backend running")
})
app.use("/file",fileRoutes)

module.exports = app