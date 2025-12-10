const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const router = express.Router();

const Post = require("../models/Post");
const Song = require("../models/Song");

// JWT authentication middleware
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
// CREATE POST (with optional song creation)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      Title,
      Description,
      SongURL,
      SongID,
      SongTitle,
      Artist = "Unknown",
      albumArt = "",
    } = req.body;

    let songId = null;

    if (SongID) {
      const existing = await Song.findById(SongID);
      if (!existing) {
        return res.status(400).json({ error: "Selected song not found" });
      }
      songId = existing._id;
    } else if (SongTitle) {
      // Check if song already exists
      let song = await Song.findOne({ Title: SongTitle, Artist });

      if (!song) {
        // Create new song
        song = await Song.create({
          SongID: new mongoose.Types.ObjectId().toHexString(),
          Title: SongTitle,
          Artist,
          albumArt,
        });
      }

      songId = song._id;
    }

    // Create post
    const post = await Post.create({
      Title,
      Description,
      SongURL,
      SongID: songId,
      UserID: req.userId,
    });

    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// UPDATE POST (auth + ownership)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    if (post.UserID.toString() !== req.userId)
      return res.status(403).json({ error: "Unauthorized" });

    const { Title, Description, SongTitle, SongURL } = req.body;

    // Update song if provided
    if (SongTitle) {
      let song = await Song.findOne({ Title: SongTitle });
      if (!song) {
        song = await Song.create({ Title: SongTitle, SongURL });
      }
      post.SongID = song._id;
      post.SongURL = SongURL ?? post.SongURL;
    }

    post.Title = Title ?? post.Title;
    post.Description = Description ?? post.Description;

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
    if (post.UserID.toString() !== req.userId)
      return res.status(403).json({ error: "Unauthorized" });

    await post.deleteOne();
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL POSTS (populate user + song info)
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("UserID", "Email ProfileImageURL")
      .populate("SongID", "Title SongURL")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
