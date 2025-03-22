import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AdminSignup.css";

export const AdminSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    try {
      const response = await axios.post("http://localhost:6500/api/admin/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response && response.data) {
        toast.success("Admin registered successfully!");
        navigate("/admin-login");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      console.error("Signup error:", err);
      toast.error(err.response?.data?.message || "Registration failed. Check console.");
    }
  };

  return (
    <div className="admin-signup-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="admin-signup-box">
        <h2>Admin Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="signup-button">
            Register
          </button>
        </form>
        <div className="login-link">
          Already have an account? <a href="/admin/login">Login here</a>
        </div>
      </div>
    </div>
  );
};

