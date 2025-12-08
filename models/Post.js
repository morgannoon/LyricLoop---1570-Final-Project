const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  PostID: { type: String, required: true, unique: true },
  UserID: { type: String, required: true, ref: "User" },
  Title: { type: String, required: true },
  Description: { type: String },
  SongURL: { type: String },
  SongID: { type: String, ref: "Song" },
});

module.exports = mongoose.model("Post", PostSchema);
