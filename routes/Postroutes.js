const express = require("express");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");

const Post = require("../models/PostModel");

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CCN,
  api_key: process.env.CAK,
  api_secret: process.env.CAS,
});

router.route("/get").get(async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Fetching posts failed, please try again",
    });
  }
});

router.route("/").post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });

    res.status(200).json({ success: true, data: newPost });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to create a post, please try again",
    });
  }
});

module.exports = router;
