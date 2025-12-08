const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
  SongID: { type: String, required: true, unique: true },
  Title: { type: String, required: true },
  Artist: { type: String, required: true },
});

module.exports = mongoose.model("Song", SongSchema);
