const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connection = require("./config/db");
const userRoutes = require("./routes/Userroutes");
const dalleRoutes = require("./routes/dalleRoutes");
const postRoutes = require("./routes/Postroutes");
const Login = require("./routes/Login");
const cors = require("cors");

const app = express();
dotenv.config();
app.use(express.json({ limit: "50mb" }));

app.use(cors({ origin: "https://digio.xietuslab.in" }));

connection();

app.use("/api/signup", userRoutes);
app.use("/api/login", Login);
app.use("/api/dalle", dalleRoutes);
app.use("/api/post", postRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is up and running at Port " + PORT);
});
