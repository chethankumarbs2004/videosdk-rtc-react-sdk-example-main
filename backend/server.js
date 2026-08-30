require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const User = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json());

const startServer = async () => {
  const mongoReady = await connectDB();

  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      mongodb: mongoReady ? "connected" : "not-configured",
    });
  });

  app.get("/api/users", async (req, res) => {
    if (!mongoReady) {
      return res.status(503).json({
        message: "MongoDB is not configured. Set MONGO_URI in your .env file.",
      });
    }

    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/users", async (req, res) => {
    if (!mongoReady) {
      return res.status(503).json({
        message: "MongoDB is not configured. Set MONGO_URI in your .env file.",
      });
    }

    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
