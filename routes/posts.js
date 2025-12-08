const express = require("express");
const router = express.Router();

const Post = require("../models/Post");

// CREATE POST
router.post("/", async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL POSTS (with user + song info)
router.get("/", async (req, res) => {
  const posts = await Post.find()
    .populate("UserID")
    .populate("SongID");

  res.json(posts);
});

module.exports = router;
