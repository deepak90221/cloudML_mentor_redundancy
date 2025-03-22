import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

export const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    toast.info("Submitting form...");
    
    try {
      const response = await axios.post("http://localhost:6500/api/users/login", user);
      toast.success("Login successful!");

      // Store token with the correct key
      localStorage.setItem("userToken", response.data.token);

      // Dispatch storage event to notify Navbar of login change
      window.dispatchEvent(new Event("storage"));

      navigate("/courses");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="login-section">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="login-card wider">
        <div className="login-form">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
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

            <button type="submit" className="submit-button">Login</button>
          </form>

          <div className="additional-buttons">
            <button className="signup-button" onClick={() => navigate("/signup")}>Sign Up</button>
          </div>
        </div>

        <div className="login-image">
          <img src="/images/login.png" alt="AI Vehicle Prediction" />
        </div>
      </div>
    </section>
  );
};
