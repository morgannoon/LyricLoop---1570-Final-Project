const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  UserID: { type: String, unique: true }, // NOT required – backend will generate
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },

  ProfileImageURL: { type: String, default: null },

  role: { type: String, enum: ["user", "admin"], default: "user" },

  followers: { type: Number, default: 0 },
  following: { type: Number, default: 0 },

  lastActive: { type: Date, default: Date.now },

  weeklyTimeSpent: { type: Number, default: 0 },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);
