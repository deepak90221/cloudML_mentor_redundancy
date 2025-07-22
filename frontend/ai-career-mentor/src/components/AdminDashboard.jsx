import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AdminDashboard.css";

export const AdminDashboard = () => {
  const [examData, setExamData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedRows, setExpandedRows] = useState({});
  const [reportData, setReportData] = useState(null);

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

  const deleteExam = async (examId) => {
    try {
      await axios.delete(`http://localhost:6500/api/exams/delete/${examId}`);
      toast.success("Exam deleted successfully!");
      fetchExamData(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting exam:", error);
      toast.error("Failed to delete exam.");
    }
  };

  const calculateRedundancy = (answer1, answer2) => {
    if (!answer1 || !answer2) return 0;
    const words1 = new Set(answer1.toLowerCase().split(/\s+/));
    const words2 = new Set(answer2.toLowerCase().split(/\s+/));
    const intersection = new Set([...words1].filter((word) => words2.has(word)));
    const union = new Set([...words1, ...words2]);
    return ((intersection.size / union.size) * 100).toFixed(2);
  };

  const checkReport = () => {
    let reports = [];

    // Group answers by question
    let questionMap = new Map();

    examData.forEach((exam) => {
      exam.answers.forEach(({ question, response }) => {
        if (!questionMap.has(question)) {
          questionMap.set(question, []);
        }
        questionMap.get(question).push(response);
      });
    });

    // Compare answers for each question
    questionMap.forEach((responses, question) => {
      for (let i = 0; i < responses.length - 1; i++) {
        for (let j = i + 1; j < responses.length; j++) {
          let score = calculateRedundancy(responses[i], responses[j]);
          reports.push({
            question,
            response1: responses[i],
            response2: responses[j],
            redundancyScore: score,
          });
        }
      }
    });

    if (reports.length === 0) {
      toast.info("No redundancy found.");
    } else {
      setReportData(reports);
      toast.success("Redundancy report generated!");
    }
  };

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li><a href="/admin-dashboard">Dashboard</a></li>
          <li><a href="/post-course">Post Courses</a></li>
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
                  <th>Check Report</th>
                  <th>Delete</th>
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
                        <td>
                          <button onClick={checkReport}>Check Report</button>
                        </td>
                        <td>
                          <button className="delete-btn" onClick={() => deleteExam(exam._id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                      {expandedRows[exam._id] && (
                        <tr className="answer-row">
                          <td colSpan="4">
                            <div className="answer-container">
                              <h4>Answers:</h4>
                              <div className="scrollable-table">
                                <table className="answer-table">
                                  <thead>
                                    <tr>
                                      <th>Question</th>
                                      <th>Answer</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {exam.answers.length > 0 ? (
                                      exam.answers.map((answer, index) => (
                                        <tr key={index}>
                                          <td>{answer.question || "N/A"}</td>
                                          <td>{answer.response || "N/A"}</td>
                                        </tr>
                                      ))
                                    ) : (
                                      <tr>
                                        <td colSpan="2">No answers available</td>
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
                    <td colSpan="4">No exam data available</td>
                  </tr>
                )}
              </tbody>
            </table>

            {reportData && (
              <div className="report-container">
                <h3>Redundancy Report</h3>
                <table className="report-table">
                  <thead>
                    <tr>
                      <th>Question</th>
                      <th>Response 1</th>
                      <th>Response 2</th>
                      <th>Redundancy Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.map((report, index) => (
                      <tr key={index} className={`redundancy-score ${report.redundancyScore >= 100 ? "red" : report.redundancyScore >= 50 ? "yellow" : "green"}`}>
                        <td>{report.question}</td>
                        <td>{report.response1}</td>
                        <td>{report.response2}</td>
                        <td>{report.redundancyScore}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};