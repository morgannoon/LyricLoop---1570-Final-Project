const express = require("express");
const router = express.Router();

const Song = require("../models/Song");

// add song
router.post("/", async (req, res) => {
  try {
    const song = await Song.create(req.body);
    res.json(song);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get all songs
router.get("/", async (req, res) => {
  const songs = await Song.find();
  res.json(songs);
});

module.exports = router;
