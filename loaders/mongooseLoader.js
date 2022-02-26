const mongoose = require("mongoose");

async function connectMongodb() {
  try {
    await mongoose.connect(process.env.DB);
  } catch (err) {
    console.error("initial connection error: ", err);
  }

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", console.log.bind(console, "Connected to database.."));
}

module.exports = connectMongodb;
