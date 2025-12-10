require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");



const app = express();

app.use(express.json());
app.use(
  cors({
    // Allow all origins dynamically (sufficient for token-in-header auth)
    origin: (origin, cb) => cb(null, true),
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: false,
  })
);

// Explicit preflight handler to ensure CORS headers are always sent
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

// connect to MongoDB
connectDB();

// routes
app.use("/auth", require("./routes/auth"));
app.use("/posts", require("./routes/posts"));
app.use("/songs", require("./routes/songs"));
app.use("/api/admin", require("./routes/admin"));
app.use("/search", require("./routes/search"));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
