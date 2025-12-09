const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Admin = require("../models/Admin");

// USER REGISTER
router.post("/register", async (req, res) => {
  try {
    const { UserID, Email, Password, ProfileImageURL } = req.body;

    // prevent duplicate emails
    const existing = await User.findOne({ Email });
    if (existing) return res.status(400).json({ error: "Email already used" });

    const hashedPassword = await bcrypt.hash(Password, 10);

    const user = await User.create({
      UserID,
      Email,
      Password: hashedPassword,
      ProfileImageURL
    });

    res.json({ message: "User registered", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// USER LOGIN
router.post("/login", async (req, res) => {
  const { Email, Password } = req.body;

  const user = await User.findOne({ Email });
  if (!user) return res.status(400).json({ error: "User not found" });

  const valid = await bcrypt.compare(Password, user.Password);
  if (!valid) return res.status(400).json({ error: "Invalid password" });

  const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: "1d"
  });

  res.json({ token, user });
});

// ADMIN LOGIN
router.post("/admin/login", async (req, res) => {
  const { Email, Password } = req.body;

  const admin = await Admin.findOne({ Email });
  if (!admin) return res.status(400).json({ error: "Admin not found" });

  const valid = await bcrypt.compare(Password, admin.Password);
  if (!valid) return res.status(400).json({ error: "Invalid password" });

  const token = jwt.sign(
    { id: admin._id.toString(), role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token, admin });
});

module.exports = router;
