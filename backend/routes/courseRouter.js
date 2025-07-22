const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

// Get all courses
router.get("/", courseController.getCourses);

// Add a new course
router.post("/", courseController.addCourse);

// Update a course
router.put("/:courseId/update", courseController.updateCourse);

// Delete a course
router.delete("/:courseId/delete", courseController.deleteCourse);

module.exports = router;
