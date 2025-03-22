import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./CourseCard.css";

const CourseCard = ({ title, description, image }) => {
  const [flipped, setFlipped] = useState(false);
  const navigate = useNavigate(); // Initialize navigation

  return (
    <div className={`course-card ${flipped ? "flipped" : ""}`} onClick={() => setFlipped(!flipped)}>
      <div className="card-inner">

        {/* Front Side */}
        <div className="card-front">
          <h2 className="course-name">{title}</h2> {/* Course Name at Top */}
          <img src={image} alt={title} className="course-image" />
          <h3 className="course-title">{title}</h3>
          <div className="button-group">
            <button className="view-button">View</button>
            <button className="explore-button" onClick={() => navigate("/exam", { state: { course: title } })}>
              Take Exam
            </button>
          </div>
        </div>

        {/* Back Side */}
        <div className="card-back">
          <h2 className="course-name">{title}</h2> {/* Course Name at Top */}
          <h3>About Course</h3>
          <p>{description}</p>
          <button className="view-button">View</button>
        </div>

      </div>
    </div>
  );
};

export default CourseCard;
