const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Post = require("../models/Post");
const Song = require("../models/Song");

// JWT auth middleware
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

// CREATE POST (with optional song creation)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { Title, Description, SongURL, SongTitle, Artist = "Unknown", albumArt = "" } = req.body;

    let songId = null;

    if (SongTitle && SongURL) {
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

module.exports = router;
