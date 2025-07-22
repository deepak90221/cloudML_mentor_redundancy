import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PostCourses.css";

const PostCourses = ({ onCourseAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [courses, setCourses] = useState([]);
  const [editCourseId, setEditCourseId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:6500/api/courses");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setError("Failed to fetch courses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Please enter a valid course title and description.");
      return;
    }

    try {
      if (editCourseId) {
        await axios.put(`http://localhost:6500/api/courses/${editCourseId}/update`, { title, description });
        setCourses((prevCourses) =>
          prevCourses.map((course) =>
            course._id === editCourseId ? { ...course, title, description } : course
          )
        );
        setEditCourseId(null);
      } else {
        const response = await axios.post("http://localhost:6500/api/courses", { title, description });
        setCourses((prevCourses) => [...prevCourses, response.data]);
      }

      setTitle("");
      setDescription("");
      onCourseAdded();
    } catch (error) {
      console.error("Error adding/updating course:", error);
    }
  };

  const handleDelete = async (courseId) => {
    try {
      await axios.delete(`http://localhost:6500/api/courses/${courseId}/delete`);
      setCourses((prevCourses) => prevCourses.filter((course) => course._id !== courseId));
      onCourseAdded();
    } catch (error) {
      console.error("Error deleting course:", error);
      setError("Failed to delete course. Please try again.");
    }
  };

  const handleEdit = (course) => {
    setTitle(course.title);
    setDescription(course.description);
    setEditCourseId(course._id);
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="post-course-container">
      <h2>{editCourseId ? "Edit Course" : "Post a New Course"}</h2>
      <form onSubmit={handleSubmit} className="post-course-form">
        <input type="text" placeholder="Course Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="text" placeholder="Course Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <button type="submit">{editCourseId ? "Update Course" : "Add Course"}</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a course..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>

      {loading ? (
        <p>Loading courses...</p>
      ) : (
        <div className="courses-grid">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div key={course._id} className="course-card">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-description">{course.description}</p>
                <div className="course-actions">
                  <button className="edit-btn" onClick={() => handleEdit(course)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(course._id)}>Delete</button>
                </div>
              </div>
            ))
          ) : (
            <p>No courses found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCourses;
