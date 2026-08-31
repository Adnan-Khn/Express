const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running fine ");
});

app.use("/user", userRoutes);

module.exports = app;
