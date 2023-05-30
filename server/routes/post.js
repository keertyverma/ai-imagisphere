import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import Post from "../mongodb/models/post.js";

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
});

router.route("/").get(async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ data: posts });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.route("/").post(async (req, res) => {
  try {
    // get data from response body
    const { name, prompt, photo } = req.body;

    // upload base64 image to cloudinary and get image url
    const photoUrl = await cloudinary.uploader.upload(photo);

    // store post with photo cloudinary url
    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });

    res.status(201).json({ data: newPost });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
