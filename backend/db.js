const mongoose = require("mongoose");

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.warn("MONGO_URI is not set. MongoDB connection skipped.");
    return false;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB connected");
    return true;
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    return false;
  }
};

module.exports = connectDB;
