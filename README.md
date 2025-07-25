# ☁️🤖 CloudML Mentor & Text Redundancy Detector

An AI-powered platform combining a **Personalized Career Mentorship System** with a **Text Redundancy Detection Tool**, deployed on the cloud. This project leverages Machine Learning, Natural Language Processing (NLP), and cloud technologies to assist students and professionals in career planning while ensuring quality content generation.

---

## 🔍 Overview

This dual-module platform provides:
1. **🎯 AI Career Mentor** – Offers personalized suggestions on career paths, skills, certifications, and job roles based on a user’s academic profile, interests, and strengths.
2. **📝 Redundancy Detector** – Evaluates user-generated content such as resumes, quiz answers, or project write-ups for repetitive or verbose text using NLP.

---

## ✨ Features

### 🎓 Career Mentor Module
- Takes academic & project input from users
- Suggests career tracks: Data Science, Software Dev, Cybersecurity, etc.
- Recommends personalized certifications, courses, and roadmaps
- Uses vectorized matching (TF-IDF / embeddings) to recommend based on similar user profiles
- Outputs JSON-based suggestions with optional PDF export

### 🔁 Redundancy Detection Module
- Detects repeated phrases and low-information content in quiz responses and paragraphs
- Uses tokenization + semantic similarity (Spacy/Transformer models)
- Highlights redundant sentences and suggests concise rewrites
- Works in real-time or batch mode

---

## 🧠 ML/NLP Stack

- **Language**: Python 3.x
- **Libraries**: `scikit-learn`, `spaCy`, `transformers`, `nltk`, `pandas`, `numpy`, `Flask`, `TextBlob`
- **ML Models**:
  - TF-IDF + Cosine Similarity for Redundancy Detection
  - SpaCy / SBERT / OpenAI Embeddings for semantic similarity
  - Logistic Regression / Decision Trees for career path suggestion
- **Data**:
  - Sample student profiles, quiz responses, resumes (anonymized)
  - Industry role mappings for career mentoring

---

## ☁️ Deployment & APIs

- **Frontend**: React.js + TailwindCSS
- **Backend**: Flask / FastAPI (Python) served via Express.js Gateway
- **Database**: MongoDB (user logs, queries, history)
- **Cloud Deployment**: 
  - Vercel for Frontend
  - Render / AWS EC2 / Railway for Backend
  - Email support via Nodemailer
- **APIs**:
  - `/api/mentor/suggest` → Career recommendations
  - `/api/redundancy/check` → Redundancy detection
  - `/api/feedback/submit` → Submit user ratings/comments

---

## 📁 Folder Structure

