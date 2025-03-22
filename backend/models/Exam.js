const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  course: { type: String, required: true },
  answers: [
    {
      response: { type: String, required: true },
      redundancyScore: { type: Number, default: 0 },
    },
  ],
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Exam", examSchema);
