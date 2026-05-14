# 💤 SleepSense - Personalized Sleep Disorder Prediction System

A full-stack web application that predicts sleep disorders (No Disorder, Insomnia, or Sleep Apnea) based on user health and lifestyle data using a trained Machine Learning model. The system also provides personalized recommendations using the Google Gemini API.

---

# 🏗️ Tech Stack

## Backend
- FastAPI (Python)
- XGBoost Machine Learning Model
- MongoDB (PyMongo)
- JWT Authentication
- Google Gemini API
- bcrypt Password Hashing
- Uvicorn Server

## Frontend
- React (Vite)
- Axios
- React Router DOM
- CSS

---

# ✨ Features

- Sleep disorder prediction using Machine Learning
- Personalized AI-generated sleep recommendations
- JWT-based authentication system
- Secure password hashing with bcrypt
- Real-time prediction functionality
- Responsive full-stack web application
- Admin and user functionalities

---

# 🧠 Core Components

## 🤖 Machine Learning Prediction Engine
- XGBoost classification model
- Trained using sleep health and lifestyle data
- Uses 11 input features for prediction
- Predicts:
  - No Disorder
  - Insomnia
  - Sleep Apnea
- Hyperparameter tuned model
- Integrated with FastAPI backend through REST APIs

## 🔐 Authentication System
- User registration and login
- JWT-based authentication
- Secure password hashing using bcrypt

## 🤖 AI Recommendation System
- Integrated with Google Gemini API
- Generates personalized sleep improvement recommendations
- Recommendations are based on prediction outcomes and lifestyle data

## 🌐 Full Stack Communication
- React frontend communicates with FastAPI backend using REST APIs
- Real-time prediction and response handling

---

# ⚙️ System Requirements

Before running the project, ensure the following software is installed on the system:

- Python 3.12 or above
- pip package manager
- Node.js 18 LTS or above
- npm package manager

---

# 🚀 Project Setup and Execution Guide

## Step 1: Create Python Virtual Environment

Open a terminal in the project root directory and run:

```bash
python -m venv .venv
```

---

## Step 2: Activate the Virtual Environment

### Windows (PowerShell)

```bash
.\.venv\Scripts\Activate.ps1
```

### Windows (Command Prompt)

```bash
.\.venv\Scripts\activate.bat
```

### macOS/Linux

```bash
source .venv/bin/activate
```

---

# ⚙️ Backend Setup

## Step 3: Navigate to Backend Directory

```bash
cd backend
```

## Step 4: Install Backend Dependencies

```bash
pip install -r requirements.txt
```

## Step 5: Configure Environment Variables

Ensure the `.env` file inside the backend directory contains the required environment variables:

```env
MONGO_URI=your_mongo_connection_string
GEMINI_API_KEY=your_gemini_api_key
SECRET_KEY=your_jwt_secret_key
```

## Step 6: Start the Backend Server

```bash
uvicorn app.main:app --reload
```

The backend server will run at:

```text
http://127.0.0.1:8000
```

---

# 🌐 Frontend Setup

## Step 7: Open a Separate Terminal and Navigate to Frontend Directory

```bash
cd frontend
```

## Step 8: Install Frontend Dependencies

```bash
npm install
```

## Step 9: Start the Frontend Server

```bash
npm run dev
```

The frontend application will run at:

```text
http://localhost:5173
```

---

# ▶️ Running the Application

Open the following URL in a supported web browser:

```text
http://localhost:5173
```

Ensure both backend and frontend servers remain active while using the application.

---

# 📌 Disclaimer

This project was developed for academic purposes to demonstrate the integration of Machine Learning techniques with full-stack web development technologies.