import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";

export const Navbar = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(!!localStorage.getItem("userToken"));
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(!!localStorage.getItem("adminToken"));
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      setIsUserLoggedIn(!!localStorage.getItem("userToken"));
      setIsAdminLoggedIn(!!localStorage.getItem("adminToken"));
    };

    const interval = setInterval(checkLoginStatus, 500); // Poll every 500ms
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken"); // Remove user token
    localStorage.removeItem("adminToken"); // Remove admin token
    setIsUserLoggedIn(false);
    setIsAdminLoggedIn(false);
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="logo">AI Career Mentor And Text Redundancy Evaluator</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/courses">Courses</Link></li>

        {isUserLoggedIn || isAdminLoggedIn ? (
          <>
            {isUserLoggedIn && <li><Link to="/profile">Profile</Link></li>}
            {isAdminLoggedIn && <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>}
            <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">User Login</Link></li>
            <li><Link to="/signup" className="signup-btn">User SignUp</Link></li>
            <li><Link to="/admin-login">Admin Login</Link></li>
            <li><Link to="/admin-register">Admin Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};
