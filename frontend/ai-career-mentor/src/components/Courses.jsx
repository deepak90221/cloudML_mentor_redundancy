import React, { useState } from "react";
import CourseCard from "./CourseCard";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./Courses.css";

const genAI = new GoogleGenerativeAI("AIzaSyBAhb3K94osHVBnuQkFKeXfCYKfdEyB22Q"); // Replace with your actual key

const courses = [
  { title: "Machine Learning", description: "Learn ML with real-world projects.", image: "/images/ml.png" },
  { title: "Web Development", description: "Master front-end and back-end skills.", image: "/images/web.png" },
  { title: "Data Science", description: "Analyze and visualize data effectively.", image: "/images/bda.png" },
  { title: "Cloud Computing", description: "Cloud Computing special series.", image: "/images/cyber.png" },

];

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState("");

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCourseSuggestion = async () => {
    if (!searchTerm) return;

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent({
        contents: [
          { parts: [{ text: `Suggest the best course for someone interested in ${searchTerm}.` }] }
        ]
      });

      const response = await result.response;
      const suggestion = response.candidates[0].content.parts[0].text;
      
      const formattedSuggestion = suggestion.split('\n').map((line, index) => (
        <p key={index}>{line}</p>
      ));
      
      setAiSuggestion(formattedSuggestion);
    } catch (error) {
      console.error("Error fetching AI suggestion:", error);
      setAiSuggestion(<p>Sorry, AI mentor is currently unavailable.</p>);
    }
  };

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a course..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        <button onClick={getCourseSuggestion} className="search-button">
          Ask AI Mentor
        </button>
      </div>

      {aiSuggestion && <div className="ai-suggestion">{aiSuggestion}</div>}

      <div className="courses-container">
        {filteredCourses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </div>
  );
};

export default Courses;
