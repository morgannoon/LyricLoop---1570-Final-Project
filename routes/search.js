// routes/search.js
const express = require("express");
const User = require("../models/User"); 
const Song = require("../models/Song"); 

const router = express.Router();

// GET all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("UserID Email ProfileImageURL");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all songs
router.get("/songs", async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
