require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

app.use(express.json());
app.use(cors());

// connect to MongoDB
connectDB();

// routes
app.use("/auth", require("./routes/auth"));
app.use("/posts", require("./routes/posts"));
app.use("/songs", require("./routes/songs"));
app.use("/api/admin", require("./routes/admin"));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
