require("dotenv").config(); // Load environment variables
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Import Routes
const userRoutes = require("./routes/userRouter");
const adminRoutes = require("./routes/adminRoutes");
const examRoutes = require("./routes/examRoutes");
const courseRoutes = require("./routes/courseRouter"); // Ensure file exists

// Debugging: Check if .env is loaded correctly (optional)
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing in .env file!");
  process.exit(1);
}

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

// Listen for MongoDB errors after initial connection
mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB Connection Error:", err);
});

// Start the server
const startServer = async () => {
  await connectDB(); // Ensure DB connection is successful

  const app = express();

  // Middleware
  app.use(cors()); // Enable Cross-Origin Resource Sharing
  app.use(express.json()); // Parse JSON request bodies

  // Routes
  app.use("/api/users", userRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/exams", examRoutes);
  app.use("/api/courses", courseRoutes);

  // Default Route (Optional: For checking server status)
  app.get("/", (req, res) => {
    res.send("🚀 Backend is running!");
  });

  // Set port from environment variable or default to 6500
  const PORT = process.env.PORT || 6500;
  app.listen(PORT, () => {
    console.log(`🌍 Server is running on port ${PORT}`);
  });
};

// Call the function to start the server
startServer();
