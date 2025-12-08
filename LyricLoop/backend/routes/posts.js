import express from "express";
import Post from "../models/Post.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Middleware to verify JWT
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Get all posts
router.get("/", async (req, res) => {
  const posts = await Post.find().populate("author", "username profilePic");
  res.json(posts);
});

// Create post
router.post("/", authMiddleware, async (req, res) => {
  const { title, content, image } = req.body;
  const post = await Post.create({ title, content, image, author: req.user.id });
  res.status(201).json(post);
});

// Update post
router.put("/:id", authMiddleware, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });
  if (post.author.toString() !== req.user.id) return res.status(403).json({ error: "Unauthorized" });

  const { title, content, image } = req.body;
  post.title = title;
  post.content = content;
  post.image = image;
  await post.save();
  res.json(post);
});

// Delete post
router.delete("/:id", authMiddleware, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });
  if (post.author.toString() !== req.user.id) return res.status(403).json({ error: "Unauthorized" });

  await post.remove();
  res.json({ message: "Post deleted" });
});

export default router;
