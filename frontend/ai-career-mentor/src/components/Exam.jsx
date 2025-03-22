import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Exam.css";

const Exam = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const courseTitle = location.state?.course || "Exam";
  const [isChecked, setIsChecked] = useState(false);
  const [warnings, setWarnings] = useState(0);

  useEffect(() => {
    // Detect Tab Switching
    const handleVisibilityChange = () => {
      if (document.hidden) {
        alert("Warning: Do not switch tabs! This will be recorded.");
        setWarnings((prev) => prev + 1);
      }
    };

    // Detect Full-Screen Exit
    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) {
        alert("Warning: Stay in full-screen mode!");
        setWarnings((prev) => prev + 1);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  useEffect(() => {
    if (warnings >= 3) {
      alert("You have violated the exam rules multiple times. Your exam is being submitted.");
      navigate("/exam-end"); // Redirect or submit the exam automatically
    }
  }, [warnings, navigate]);

  const handleStartExam = () => {
    if (isChecked) {
      // Enter Full-Screen Mode
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }
      navigate("/quiz", { state: { course: courseTitle } }); // Navigate to Quiz page
    } else {
      alert("Please accept the Terms and Conditions to proceed.");
    }
  };

  return (
    <div className="exam-container">
      <h1 className="exam-title">{courseTitle} - Exam</h1>
      <p className="exam-description">
        Test your knowledge with this exam! Please read the terms and conditions before starting.
      </p>

      <div className="terms-container">
        <input
          type="checkbox"
          id="terms"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
        <label htmlFor="terms">
          I accept the <a href="/terms">Terms and Conditions</a>
        </label>
      </div>

      <button className={`start-exam-btn ${isChecked ? "active" : ""}`} onClick={handleStartExam}>
        Start Exam
      </button>
    </div>
  );
};

export default Exam;
