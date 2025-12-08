const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Report = require("../models/Report");
const Song = require("../models/Song");

// GET /api/admin/stats - Get dashboard statistics
router.get("/stats", async (req, res) => {
  try {
    // Get total users
    const totalUsers = await User.countDocuments();

    // Get active users (users who logged in within last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const activeUsersCount = await User.countDocuments({
      lastActive: { $gte: sevenDaysAgo }
    });

    // Format active users (e.g., 170M+)
    let activeUsers = activeUsersCount.toString();
    if (activeUsersCount >= 1000000000) {
      activeUsers = (activeUsersCount / 1000000000).toFixed(0) + "B+";
    } else if (activeUsersCount >= 1000000) {
      activeUsers = (activeUsersCount / 1000000).toFixed(0) + "M+";
    } else if (activeUsersCount >= 1000) {
      activeUsers = (activeUsersCount / 1000).toFixed(0) + "K+";
    }

    // Calculate average time per week (in hours)
    const usersWithTime = await User.find({ weeklyTimeSpent: { $gt: 0 } });
    let avgTimePerWeek = 7; // default
    if (usersWithTime.length > 0) {
      const totalTime = usersWithTime.reduce((sum, user) => sum + (user.weeklyTimeSpent || 0), 0);
      avgTimePerWeek = Math.round(totalTime / usersWithTime.length / 60); // convert minutes to hours
    }

    // Get report statistics
    const totalReports = await Report.countDocuments();
    const reportsCleared = await Report.countDocuments({ status: "cleared" });
    const reportsNeedsReview = await Report.countDocuments({ status: "pending" });
    const reportsUnderReview = await Report.countDocuments({ status: "under_review" });

    res.json({
      activeUsers,
      activeUsersRaw: activeUsersCount,
      totalUsers,
      avgTimePerWeek,
      totalReports,
      reportsCleared,
      reportsNeedsReview,
      reportsUnderReview
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({ message: "Error fetching statistics" });
  }
});

// GET /api/admin/top-users - Get top users by followers
router.get("/top-users", async (req, res) => {
  try {
    const topUsers = await User.find()
      .sort({ followers: -1 })
      .limit(5)
      .select("UserID ProfileImageURL followers");

    const users = topUsers.map((user, index) => ({
      rank: index + 1,
      name: user.UserID,
      avatar: user.ProfileImageURL || "",
      followers: user.followers || 0
    }));

    res.json(users);
  } catch (error) {
    console.error("Error fetching top users:", error);
    res.status(500).json({ message: "Error fetching top users" });
  }
});

// GET /api/admin/trending-songs - Get trending songs
router.get("/trending-songs", async (req, res) => {
  try {
    const trendingSongs = await Song.find()
      .sort({ weeklyPlays: -1 })
      .limit(5);

    const songs = trendingSongs.map((song, index) => ({
      rank: index + 1,
      title: song.Title,
      artist: song.Artist,
      plays: song.weeklyPlays || 0
    }));

    res.json(songs);
  } catch (error) {
    console.error("Error fetching trending songs:", error);
    res.status(500).json({ message: "Error fetching trending songs" });
  }
});

module.exports = router;
