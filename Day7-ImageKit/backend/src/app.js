import express from "express";
import cors from "cors";
import postRoutes from "./routes/post.routes.js";

const app = express();

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Hello from Express");
})
app.use("/post",postRoutes)

export default app;
