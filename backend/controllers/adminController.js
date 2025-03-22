const Admin = require("../models/Admin");

// ✅ Admin Registration
exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already registered" });
    }

    const newAdmin = new Admin({ name, email, password });
    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Admin Login
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin || admin.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Admin login successful!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
