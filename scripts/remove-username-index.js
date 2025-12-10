require("dotenv").config();
const mongoose = require("mongoose");

// One-off helper to remove any legacy unique index on "username" that blocks
// signup with "E11000 duplicate key error ... username: null".
async function run() {
  await mongoose.connect(process.env.MONGO_URI);

  const users = mongoose.connection.db.collection("users");
  const indexes = await users.indexes();

  console.log("Existing indexes on users collection:");
  console.table(indexes.map((idx) => ({ name: idx.name, key: JSON.stringify(idx.key) })));

  // Drop any index whose key contains "username"
  const usernameIndexes = indexes.filter((idx) => Object.keys(idx.key).includes("username"));
  for (const idx of usernameIndexes) {
    await users.dropIndex(idx.name);
    console.log(`Dropped legacy index ${idx.name} -> ${JSON.stringify(idx.key)}`);
  }

  if (usernameIndexes.length === 0) {
    console.log('No username-based indexes found; nothing to do.');
  }

  await mongoose.disconnect();
}

run().catch((err) => {
  console.error("Failed to drop username index:", err);
  process.exit(1);
});
