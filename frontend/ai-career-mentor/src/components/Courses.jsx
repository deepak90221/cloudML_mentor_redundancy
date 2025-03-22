import React, { useState } from "react";
import CourseCard from "./CourseCard";
import { GoogleGenerativeAI } from "@google/generative-ai"; // ✅ Import Gemini AI
import "./Courses.css";

// ✅ Initialize Gemini AI with API Key
const genAI = new GoogleGenerativeAI("AIzaSyBAhb3K94osHVBnuQkFKeXfCYKfdEyB22Q"); // Replace with your actual key

const courses = [
  { title: "Machine Learning", description: "Learn ML with real-world projects.", image: "/images/ml.png" },
  { title: "Web Development", description: "Master front-end and back-end skills.", image: "/images/web.png" },
  { title: "Data Science", description: "Analyze and visualize data effectively.", image: "/images/bda.png" },
  { title: "Cyber Security", description: "Protect systems from cyber threats.", image: "/images/cyber.png" },
  { title: "Cloud Computing", description: "Deploy and manage cloud solutions.", image: "https://source.unsplash.com/250x150/?cloud-computing" },
  { title: "Artificial Intelligence", description: "Deep dive into AI and Neural Networks.", image: "https://source.unsplash.com/250x150/?artificial-intelligence" },
  { title: "Blockchain", description: "Understand blockchain and cryptocurrency.", image: "https://source.unsplash.com/250x150/?blockchain" },
  { title: "Software Engineering", description: "Learn software design principles.", image: "https://source.unsplash.com/250x150/?software-engineering" },
  { title: "Ethical Hacking", description: "Understand penetration testing techniques.", image: "https://source.unsplash.com/250x150/?hacking" },
  { title: "Android Development", description: "Develop modern Android applications.", image: "https://source.unsplash.com/250x150/?android" },
  { title: "Python Programming", description: "Master Python for development and AI.", image: "https://source.unsplash.com/250x150/?python" },
  { title: "Big Data Analytics", description: "Learn big data processing techniques.", image: "https://source.unsplash.com/250x150/?big-data" },
  { title: "DevOps", description: "Understand CI/CD and automation.", image: "https://source.unsplash.com/250x150/?devops" },
  { title: "IOT", description: "Build Internet of Things (IoT) solutions.", image: "https://source.unsplash.com/250x150/?iot" },
  { title: "Game Development", description: "Develop 2D and 3D games.", image: "https://source.unsplash.com/250x150/?game-development" },
  { title: "UI/UX Design", description: "Design stunning user interfaces.", image: "https://source.unsplash.com/250x150/?ui-ux" }
];

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState("");

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Function to Get AI-based Course Suggestion using Gemini
  const getCourseSuggestion = async () => {
    if (!searchTerm) return; // Avoid empty searches
  
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  
      const result = await model.generateContent({
        contents: [
          {
            parts: [{ text: `Suggest the best course for someone interested in ${searchTerm}.` }]
          }
        ]
      });
      
  
      const response = await result.response;
      const suggestion = response.candidates[0].content.parts[0].text; // ✅ Extracts AI response properly
      console.log(suggestion)
      setAiSuggestion(suggestion);
    } catch (error) {
      console.error("Error fetching AI suggestion:", error);
      setAiSuggestion("Sorry, AI mentor is currently unavailable.");
    }
  };
  
  return (
    <div>
      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a course..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        <button onClick={getCourseSuggestion} className="search-button">Ask AI Mentor</button>
      </div>

      {/* AI Mentor Suggestion */}
      {aiSuggestion && <p className="ai-suggestion">{aiSuggestion}</p>}

      {/* Course Cards */}
      <div className="courses-container">
        {filteredCourses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </div>
  );
};

export default Courses;
