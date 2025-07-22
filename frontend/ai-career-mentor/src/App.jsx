import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Login } from "./components/Login";
import Courses from "./components/Courses";
import PostCourses from "./components/PostCourses";  // ✅ Import PostCourses
import { Signup } from "./components/SignUp";
import Profile from "./components/Profile"; 
import Footer from "./components/Footer";
import Home from "./components/Home"; 
import Exam from "./components/Exam"; 
import Quiz from "./components/Quiz";
import EndExam from "./components/EndExam"; 
import { AdminLogin } from "./components/AdminLogin";
import { AdminSignup } from "./components/AdminSignup";
import { AdminDashboard } from "./components/AdminDashboard"; 

import { useState } from "react";  // ✅ Import useState
import "./App.css";

function App() {
  const [courses, setCourses] = useState([
    { title: "Machine Learning", description: "Learn ML with real-world projects.", image: "/images/ml.png" },
    { title: "Web Development", description: "Master front-end and back-end skills.", image: "/images/web.png" },
    { title: "Data Science", description: "Analyze and visualize data effectively.", image: "/images/bda.png" },
    { title: "Cloud Computing", description: "Cloud Computing special series.", image: "/images/cyber.png" },
  ]);

  const handleAddCourse = (newCourse) => {
    setCourses([...courses, newCourse]);
  };

  return (
    <Router>
      <MainApp courses={courses} onAddCourse={handleAddCourse} />
    </Router>
  );
}

function MainApp({ courses, onAddCourse }) {
  const location = useLocation();
  const hideNavbarFooter = ["/exam", "/quiz"].includes(location.pathname);

  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses courses={courses} />} />
          <Route path="/post-course" element={<PostCourses onAddCourse={onAddCourse} />} />  {/* ✅ Added Route */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} /> 
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/exam-end" element={<EndExam />} /> 
          <Route path="/admin-login" element={<AdminLogin />} /> 
          <Route path="/admin-register" element={<AdminSignup />} /> 
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
      {!hideNavbarFooter && <Footer />}
    </>
  );
}

export default App;
