import React from "react";
import { useNavigate } from "react-router-dom";
import "./EndExam.css";

const EndExam = () => {
  const navigate = useNavigate();

  const exitExam = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    navigate("/");
  };

  return (
    <div className="end-exam-container">
      <div className="end-exam-card">
        <h1>Exam Completed</h1>
        <p>Your exam has been submitted successfully.</p>
        <button className="exit-btn" onClick={exitExam}>
          Exit Exam
        </button>
      </div>
    </div>
  );
};

export default EndExam;
