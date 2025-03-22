import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

export const AdminLogin = () => {
  const [admin, setAdmin] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleInput = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    toast.success("Submitting form...");
    
    try {
      const response = await axios.post("http://localhost:6500/api/admin/login", admin);
      toast.success("Admin login successful!");
      localStorage.setItem("adminToken", response.data.token);
      navigate("/courses");
    } catch (err) {
      toast.error(err.response?.data?.message || "Admin login failed");
    }
  };

  return (
    <section className="login-section">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="login-card wider">
        <div className="login-form">
          <h1>Admin Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                value={admin.email}
                onChange={handleInput}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                required
                value={admin.password}
                onChange={handleInput}
              />
            </div>

            <button type="submit" className="submit-button">Login</button>
          </form>
        </div>

        <div className="login-image">
          <img src="/images/admin-login.png" alt="Admin Panel Login" />
        </div>
      </div>
    </section>
  );
};
