const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
  SongID: { type: String, required: true, unique: true },
  Title: { type: String, required: true },
  Artist: { type: String, required: true },
  albumArt: { type: String, default: "" },
  playCount: { type: Number, default: 0 },
  weeklyPlays: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Song", SongSchema);
