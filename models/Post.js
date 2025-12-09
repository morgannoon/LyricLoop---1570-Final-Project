const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  PostID: {
    type: String,
    unique: true,
    default: () => new mongoose.Types.ObjectId().toHexString()
  },
  UserID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  Title: { type: String, required: true },
  Description: { type: String },
  SongURL: { type: String },
  SongID: { type: String, ref: "Song" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Post", PostSchema);
