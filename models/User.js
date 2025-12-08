const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  UserID: { type: String, required: true, unique: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  ProfileImageURL: { type: String },
});

module.exports = mongoose.model("User", UserSchema);
