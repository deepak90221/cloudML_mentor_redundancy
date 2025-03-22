import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Quiz.css";

const questionsData = {
  "Machine Learning": {
    coding: [
      { id: "3", question: "Write a Python function to implement linear regression." },
      { id: "4", question: "Write a program to classify images using a CNN model in Python." }
    ]
  },
  "Web Development": {
    coding: [
      { id: "5", question: "Write a React component for a login form." },
      { id: "6", question: "Create a REST API in Node.js using Express." }
    ]
  }
};

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const courseTitle = location.state?.course || "Exam";

  const [codingQuestions, setCodingQuestions] = useState([]);
  const [codingAnswers, setCodingAnswers] = useState({});

  useEffect(() => {
    const courseQuestions = questionsData[courseTitle]?.coding || [];
    const initialAnswers = {};
    courseQuestions.forEach((q) => {
      initialAnswers[q.id] = "";
    });
    setCodingQuestions(courseQuestions);
    setCodingAnswers(initialAnswers);
  }, [courseTitle]);

  const handleCodingChange = (questionId, text) => {
    setCodingAnswers((prev) => ({
      ...prev,
      [questionId]: text,
    }));
  };

  const submitExam = async () => {
    const userId = localStorage.getItem("userId") || "65f123456789abcd12345678"; // Replace with actual user ID retrieval

    const submissionData = {
      userId, // Ensure userId is passed
      course: courseTitle, 
      answers: codingQuestions.map((q) => ({
        response: codingAnswers[q.id] || ""
      }))
    };

    console.log("Submitting Data:", submissionData);

    try {
      const response = await axios.post("http://localhost:6500/api/exams/submit", submissionData, {
        headers: { "Content-Type": "application/json" }
      });

      console.log("Success:", response.data);
      navigate("/exam-end");
    } catch (error) {
      console.error("Error submitting exam:", error.response?.data || error.message);
    }
  };

  return (
    <div className="quiz-container">
      <h1>{courseTitle} - Coding Quiz</h1>
      {codingQuestions.length > 0 ? (
        <>
          {codingQuestions.map((q) => (
            <div key={q.id} className="coding-card">
              <p className="question">{q.question}</p>
              <textarea
                className="coding-answer"
                placeholder="Write your answer here..."
                value={codingAnswers[q.id] || ""}
                onChange={(e) => handleCodingChange(q.id, e.target.value)}
              />
            </div>
          ))}
        </>
      ) : (
        <p>No coding questions available for this course.</p>
      )}
      <button className="submit-btn" onClick={submitExam}>Submit Exam</button>
    </div>
  );
};

export default Quiz;
