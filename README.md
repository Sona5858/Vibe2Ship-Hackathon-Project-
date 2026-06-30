# 🚀 TaskPilot AI

> **Plan Smarter. Prioritize Better. Finish Faster.**

TaskPilot AI is an **AI-powered productivity and execution companion** that helps users not only organize their work but actually complete it before deadlines. Unlike traditional to-do list applications that rely on passive reminders, TaskPilot AI proactively prioritizes tasks, creates personalized schedules, dynamically replans missed work, and provides intelligent productivity recommendations using Generative AI.

---

## 📖 Table of Contents

* Overview
* Problem Statement
* Solution
* Key Features
* System Workflow
* Technology Stack
* Google Cloud Architecture
* Project Structure
* Installation
* Environment Variables
* Running the Project
* Future Enhancements
* Team
* License

---

# 📌 Overview

TaskPilot AI is designed for students, professionals, freelancers, and entrepreneurs who struggle to manage multiple deadlines and responsibilities.

Instead of simply reminding users about tasks, TaskPilot AI acts as an intelligent execution assistant that continuously analyzes workload, priorities, deadlines, calendar events, and productivity patterns to recommend the best course of action.

The platform leverages **Google Gemini AI** and **Google Cloud** services to deliver personalized planning, smart scheduling, context-aware reminders, and adaptive task management.

---

# ❗ Problem Statement

Traditional productivity applications primarily focus on storing tasks and sending reminders. These reminders are often ignored because they lack context and do not help users decide what to work on next.

As a result, users experience:

* Missed deadlines
* Poor prioritization
* Decision fatigue
* Unrealistic planning
* Procrastination
* Reduced productivity

TaskPilot AI solves these challenges through AI-driven planning and intelligent execution.

---

# 💡 Our Solution

TaskPilot AI transforms productivity into an AI-assisted experience by automatically:

* Understanding tasks from natural language
* Prioritizing work intelligently
* Creating optimized daily schedules
* Replanning when tasks are delayed
* Providing context-aware recommendations
* Syncing with Google Calendar
* Tracking productivity trends

The platform acts as a personal AI productivity assistant rather than a traditional task manager.

---

# ✨ Key Features

## 🤖 AI Task Capture

* Create tasks using text
* Voice input
* Image uploads
* Assignment screenshots
* Emails and notices

Gemini AI extracts:

* Task title
* Deadline
* Category
* Estimated duration
* Priority
* Action items

---

## 🎯 Intelligent Prioritization

AI evaluates:

* Deadline urgency
* Estimated effort
* Importance
* Dependencies
* Calendar availability
* User productivity history

Every task receives a dynamic priority score and explanation.

---

## 📅 Smart Daily Planner

Automatically generates an optimized schedule based on:

* Free time
* Existing meetings
* Deadlines
* Focus hours
* Task duration

---

## 🔄 Dynamic Replanning

If a task is skipped or delayed, TaskPilot AI:

* Recalculates priorities
* Reorganizes the schedule
* Suggests the next best action
* Prevents deadline conflicts

---

## 🔔 Context-Aware Notifications

Instead of generic reminders, users receive intelligent suggestions such as:

> "You have a 90-minute free slot before your meeting. This is the best time to complete your assignment."

---

## 📆 Google Calendar Integration

* Import events
* Detect available slots
* Schedule tasks automatically
* Avoid conflicts
* Update calendar in real time

---

## 🎙 Voice Assistant

Interact naturally with the application:

* Add tasks
* Ask for today's plan
* Reorganize schedule
* Check remaining workload

---

## 📊 Productivity Dashboard

Track:

* Pending tasks
* Completed work
* Productivity score
* Focus hours
* Weekly progress
* Completion trends
* Upcoming deadlines

---

# ⚙️ System Workflow

```text
User Input
(Text / Voice / Image)
        │
        ▼
Gemini AI Processing
(Task Extraction & Analysis)
        │
        ▼
Task Prioritization Engine
        │
        ▼
Smart Scheduler
        │
        ▼
Google Calendar Sync
        │
        ▼
Firestore Database
        │
        ▼
AI Productivity Dashboard
        │
        ▼
Smart Notifications & Dynamic Replanning
```

---

# 🛠 Technology Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* Framer Motion

## Backend

* Node.js
* Express.js

## Database

* Google Firestore

## Authentication

* Firebase Authentication

## Artificial Intelligence

* Gemini 2.5 Flash

## APIs

* Google Calendar API
* Firebase Cloud Messaging
* Speech-to-Text
* Text-to-Speech

## Cloud

* Google Cloud Run
* Firebase Hosting
* Cloud Scheduler
* Secret Manager
* Cloud Logging

---

# ☁️ Google Cloud Architecture

```text
                   User
                     │
                     ▼
         Firebase Hosting (React)
                     │
                     ▼
      Firebase Authentication
                     │
                     ▼
      Express Backend (Cloud Run)
                     │
      ┌──────────────┴──────────────┐
      ▼                             ▼
 Gemini AI                  Google Calendar
      │                             │
      └──────────────┬──────────────┘
                     ▼
              Google Firestore
                     │
                     ▼
        Firebase Cloud Messaging
                     │
                     ▼
            Cloud Scheduler Jobs
```

---

# 📂 Project Structure

```text
TaskPilot-AI/
│
├── client/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── services/
│   └── assets/
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   ├── services/
│   ├── config/
│   └── utils/
│
├── firebase/
│
├── cloud-functions/
│
├── docs/
│
├── Dockerfile
│
├── README.md
│
└── package.json
```

---

# 🚀 Installation

Clone the repository:

```bash
git clone https://github.com/your-username/taskpilot-ai.git
```

Move into the project directory:

```bash
cd taskpilot-ai
```

Install dependencies:

```bash
npm install
```

Install frontend dependencies:

```bash
cd client
npm install
```

Install backend dependencies:

```bash
cd ../server
npm install
```

---

# 🔐 Environment Variables

Create a `.env` file in the server directory.

```env
PORT=5000

GEMINI_API_KEY=YOUR_API_KEY

FIREBASE_PROJECT_ID=

FIREBASE_CLIENT_EMAIL=

FIREBASE_PRIVATE_KEY=

GOOGLE_CLIENT_ID=

GOOGLE_CLIENT_SECRET=

GOOGLE_REDIRECT_URI=

JWT_SECRET=
```

---

# ▶️ Running the Project

Start the backend:

```bash
cd server
npm run dev
```

Start the frontend:

```bash
cd client
npm run dev
```

Open:

```text
http://localhost:5173
```

---

# 🚀 Deployment

### Frontend

* Firebase Hosting

### Backend

* Google Cloud Run

### Database

* Google Firestore

### Authentication

* Firebase Authentication

### AI

* Gemini API

### Notifications

* Firebase Cloud Messaging

### Scheduler

* Cloud Scheduler

---

# 🎯 Future Enhancements

* AI-powered autonomous task execution
* Team collaboration
* Slack integration
* Microsoft Outlook integration
* AI meeting summarization
* Email task extraction
* Wearable device integration
* Smart habit tracking
* Burnout prediction
* Mobile application (Flutter)

---

# 👥 Team

**Team Name:** *Add Your Team Name*

**Hackathon:** *Add Hackathon Name*

---

# 📜 License

This project is developed for educational and hackathon purposes. Feel free to fork, learn from, and extend it for personal or academic use.

---

# 🌟 One-Line Pitch

**TaskPilot AI is an AI-powered execution companion that intelligently prioritizes, schedules, and adapts your work in real time—helping you focus on the right task at the right time and consistently stay ahead of every deadline.**

---

### ⭐ If you found this project interesting, consider giving it a star on GitHub!
