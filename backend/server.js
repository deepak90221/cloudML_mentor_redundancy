require("dotenv").config(); // Load environment variables
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");



// Import routes
const userRoutes = require("./routes/userRouter");
const adminRoutes = require("./routes/adminRoutes");
const examRoutes = require("./routes/examRoutes");

// Import exam controller methods

// Debugging: Check if .env is loaded correctly
console.log("MongoDB URI:", process.env.MONGO_URI);

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ DB Connection Error:", err);
    process.exit(1);
  }
};

// Start Server
const startServer = async () => {
  await connectDB();

  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Routes
  app.use("/api/users", userRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/exams", examRoutes);

  // Direct API Endpoints for Exam Submission and Fetching Exam Data


  // Default Route
  app.get("/", (req, res) => {
    res.send("🚀 Backend is running!");
  });

  const PORT = process.env.PORT || 6500;
  app.listen(PORT, () => {
    console.log(`🌍 Server is running on port ${PORT}`);
  });
};

startServer();
