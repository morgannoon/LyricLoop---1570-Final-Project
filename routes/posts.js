const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const Post = require("../models/Post");

// Simple JWT auth middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// CREATE POST (auth required)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { Title, Description, SongURL, SongID } = req.body;
    const post = await Post.create({
      Title,
      Description,
      SongURL,
      SongID,
      UserID: req.userId
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE POST (auth + ownership)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    if (post.UserID.toString() !== req.userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const { Title, Description, SongURL, SongID } = req.body;
    post.Title = Title ?? post.Title;
    post.Description = Description ?? post.Description;
    post.SongURL = SongURL ?? post.SongURL;
    post.SongID = SongID ?? post.SongID;
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE POST (auth + ownership)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    if (post.UserID.toString() !== req.userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL POSTS (with user + song info)
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("UserID")
      .populate("SongID")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
