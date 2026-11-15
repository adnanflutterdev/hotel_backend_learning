const mongoose = require("mongoose");
// require("dotenv").config();

const dbUrl = "mongodb://localhost:27017";
// const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl, {});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("✅ Connected to DB successfully!!!");
});

db.on("error", (err) => {
  console.log("DB error:", err);
});

module.exports = db;
