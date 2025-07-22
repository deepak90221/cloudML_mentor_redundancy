const mongoose = require("mongoose");
const Exam = require("../models/Exam");

// Submit Exam Answers
exports.submitExam = async (req, res) => {
  try {
    console.log("Received Exam Submission:", req.body);

    let { userId, course, answers } = req.body;

    // Check for missing fields
    if (!userId || !course || !answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ message: "Invalid request: Missing required fields" });
    }

    // Validate userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    // Process answers and calculate redundancy score
    const processedAnswers = answers.map((ans) => {
      if (!ans.response || typeof ans.response !== "string") {
        throw new Error("Invalid request: Missing or incorrect answer format");
      }

      const words = ans.response.trim().split(/\s+/);
      const uniqueWords = new Set(words);
      const redundancyPercentage = ((words.length - uniqueWords.size) / words.length) * 100;

      return { response: ans.response, redundancyScore: parseFloat(redundancyPercentage.toFixed(2)) };
    });

    // Save to database
    const exam = new Exam({ userId, course, answers: processedAnswers });
    await exam.save();

    res.status(201).json({ message: "Exam submitted successfully", exam });
  } catch (error) {
    console.error("Error submitting exam:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get All Exam Data for Admin
exports.getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find().populate("userId", "username email");
    res.status(200).json(exams);
  } catch (error) {
    console.error("Error fetching exam data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete an Exam
exports.deleteExam = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid exam ID format" });
    }

    const deletedExam = await Exam.findByIdAndDelete(id);
    if (!deletedExam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    res.status(200).json({ message: "Exam deleted successfully" });
  } catch (error) {
    console.error("Error deleting exam:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
