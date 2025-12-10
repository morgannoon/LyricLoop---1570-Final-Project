const mongoose = require("mongoose");

// Remove legacy indexes that conflict with current schema
async function dropLegacyIndexes() {
  try {
    const users = mongoose.connection.db.collection("users");
    const indexes = await users.indexes();
    const toDrop = indexes.filter((idx) => {
      const keys = Object.keys(idx.key || {});
      return keys.includes("username") || keys.includes("email"); // legacy fields (lowercase)
    });

    for (const idx of toDrop) {
      await users.dropIndex(idx.name);
      console.log(`Dropped legacy users index: ${idx.name} -> ${JSON.stringify(idx.key)}`);
    }

    if (!toDrop.length) {
      console.log("No legacy conflicting indexes found on users collection.");
    }
  } catch (err) {
    console.warn("Legacy index cleanup skipped:", err.message);
  }
}

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
    await dropLegacyIndexes();
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

module.exports = connectDB;
