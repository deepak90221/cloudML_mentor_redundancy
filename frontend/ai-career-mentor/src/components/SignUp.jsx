import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";

export const Signup = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 🔥 Test toast
    toast.success("Testing Toast...");
    
    try {
      await axios.post("http://localhost:6500/api/users/signup", user);
      toast.success("Signup successful!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };
  

  return (
    <section className="signup-section">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="signup-card wider">
        <div className="signup-form">
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                required
                value={user.name}
                onChange={handleInput}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                value={user.email}
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
                value={user.password}
                onChange={handleInput}
              />
            </div>

            <button type="submit" className="submit-button">Sign Up</button>
          </form>

          <div className="additional-buttons">
            <button className="login-button" onClick={() => navigate("/login")}>Login</button>
          </div>
        </div>

        <div className="signup-image">
          <img src="/images/signup.png" alt="AI Vehicle Prediction" />
        </div>
      </div>
    </section>
  );
};
