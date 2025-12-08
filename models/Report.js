const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  reportedUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  reportedPost: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  reason: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "under_review", "cleared", "action_taken"],
    default: "pending"
  },
  createdAt: { type: Date, default: Date.now },
  resolvedAt: { type: Date },
  resolvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Report", ReportSchema);
