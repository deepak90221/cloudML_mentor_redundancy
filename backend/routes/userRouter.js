const express = require("express");
const { signup, login } = require("../controllers/userControllers");
const authMiddleware = require("../middleware/authMiddleware"); // Import the middleware
const User = require("../models/User"); // Import User model

const router = express.Router();

// Define the authentication routes
router.post("/signup", signup);
router.post("/login", login);

// Profile Route - Get user details (Requires authentication)
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Exclude password field
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
