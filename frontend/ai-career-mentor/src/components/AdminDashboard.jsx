import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AdminDashboard.css";

export const AdminDashboard = () => {
  const [examData, setExamData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedRows, setExpandedRows] = useState({});

  useEffect(() => {
    fetchExamData();
  }, []);

  const fetchExamData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:6500/api/exams/all");
      setExamData(response.data);
      toast.success("Exam data loaded successfully!");
    } catch (error) {
      console.error("Error fetching exam data:", error);
      toast.error("Failed to load exam data.");
    }
    setLoading(false);
  };

  const toggleAnswers = (examId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [examId]: !prev[examId],
    }));
  };

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li><a href="/admin-dashboard">Dashboard</a></li>
          <li><a href="#">Manage Users</a></li>
          <li><a href="#">Reports</a></li>
          <li><a href="#">Settings</a></li>
          <li>
            <a href="/admin-login" onClick={() => localStorage.removeItem("adminToken")}>
              Logout
            </a>
          </li>
        </ul>
      </aside>

      <main className="admin-content">
        <ToastContainer position="top-right" autoClose={3000} />
        <h2>Exam Submissions</h2>

        {loading ? <p>Loading exam data...</p> : (
          <div className="table-container">
            <table className="exam-table">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {examData.length > 0 ? (
                  examData.map((exam) => (
                    <React.Fragment key={exam._id}>
                      <tr>
                        <td>{exam.course}</td>
                        <td>
                          <button onClick={() => toggleAnswers(exam._id)}>
                            {expandedRows[exam._id] ? "Hide Answers" : "View Answers"}
                          </button>
                        </td>
                      </tr>

                      {expandedRows[exam._id] && (
                        <tr className="answer-row">
                          <td colSpan="2">
                            <div className="answer-container">
                              <h4>Answers:</h4>
                              <div className="scrollable-table">
                                <table className="answer-table">
                                  <thead>
                                    <tr>
                                      <th>Question</th>
                                      <th>Answer</th>
                                      <th>Redundancy Score</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {exam.answers.length > 0 ? (
                                      exam.answers.map((answer, index) => (
                                        <tr key={index}>
                                          <td>{answer.question || "N/A"}</td>
                                          <td>{answer.response || "N/A"}</td>
                                          <td>{answer.redundancyScore || "N/A"}%</td>
                                        </tr>
                                      ))
                                    ) : (
                                      <tr>
                                        <td colSpan="3">No answers available</td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No exam data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};
