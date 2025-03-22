const express = require("express");
const { submitExam, getAllExams } = require("../controllers/examController");

const router = express.Router();

router.post("/submit", submitExam); // Submit exam answers
router.get("/all", getAllExams); // Fetch all exam data for the admin

module.exports = router;
