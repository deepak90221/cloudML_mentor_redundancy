const express = require("express");
const { submitExam, getAllExams, deleteExam } = require("../controllers/examController");

const router = express.Router();

router.post("/submit", submitExam); // Submit exam answers
router.get("/all", getAllExams); // Fetch all exam data for the admin
router.delete("/delete/:id", deleteExam); // Delete exam by ID

module.exports = router;
