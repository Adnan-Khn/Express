import express from "express";
import generateCode from "../utils/generateCode.js";
import urlModel from "../models/url.model.js";

const routes = express.Router();

routes.post("/", async (req, res) => {
  const { url } = req.body;

  if (!url) return res.status(400).json({ message: "URL is required" });

  if (!url.startsWith("http://") && !url.startsWith("https://"))
    return res
      .status(400)
      .json({ message: "URL should start with http or https" });

  if (url.length <= 10)
    return res.status(400).json({ message: "URL is already short" });

  if (url.length > 2048)
    return res.status(400).json({ message: "URL is too long" });

  const code = generateCode();

  const data = await urlModel.create({
    originalURL: url,
    shortCode: code,
  });

  return res.status(201).json({
    message: "URL shortened successfully",
    data,
  });
});

routes.get("/", async (req, res) => {
  const urls = await urlModel.find();

  res.status(200).json({
    message: "URLs fetched successfully",
    data: {
      urls,
    },
  });
});

routes.delete("/:id",async (req, res) => {
  const { id } = req.params;
  const url = await urlModel.findOne({ _id: id });
  if (!url) {
    res.status(401).json({ message: "Invalid url id" });
  }
  await urlModel.findByIdAndDelete(id);
  res.status(200).json({
    message: "URL deleted successfully",
  });
});

export default routes;
