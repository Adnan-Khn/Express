import express from "express";
import cors from "cors"
import urlRoutes from "../src/routes/url.route.js";
import urlModel from "./models/url.model.js";

const app = express();

app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173"
}))
app.get("/", (req, res) => {
  res.send("URL Shortener running good");
});
app.use("/api/url", urlRoutes);

app.get("/:code", async (req, res) => {
  const { code } = req.params;

  const url = await urlModel.findOne({ shortCode: code });
  if (!url) {
    return res.status(401).json({ message: "Invalid url code" });
    
  }
  await urlModel.findOneAndUpdate({ shortCode: code }, { $inc: { clicks: 1 } },{new:true});
  res.redirect(302, url.originalURL);

});


export default app;
