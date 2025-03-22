import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Login } from "./components/Login";
import Courses from "./components/Courses";
import { Signup } from "./components/SignUp";
import Profile from "./components/Profile"; 
import Footer from "./components/Footer";
import Home from "./components/Home"; 
import Exam from "./components/Exam"; 
import Quiz from "./components/Quiz";
import EndExam from "./components/EndExam"; 
import { AdminLogin } from "./components/AdminLogin";
import { AdminSignup } from "./components/AdminSignup";
import { AdminDashboard } from "./components/AdminDashboard";  // ✅ Added AdminDashboard

import "./App.css";

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

function MainApp() {
  const location = useLocation();

  // Hide Navbar & Footer in Proctored Exam Mode
  const hideNavbarFooter = ["/exam", "/quiz"].includes(location.pathname);

  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} /> 
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/exam-end" element={<EndExam />} /> 
          <Route path="/admin-login" element={<AdminLogin />} /> 
          <Route path="/admin-register" element={<AdminSignup />} /> 
          <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* ✅ Added Route */}
        </Routes>
      </div>
      {!hideNavbarFooter && <Footer />}
    </>
  );
}

export default App;
