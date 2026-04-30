# 💤 Sleep Disorder Prediction System

A full-stack web application that predicts sleep disorders (No Disorder, Insomnia, or Sleep Apnea) based on user health and lifestyle data using a trained Machine Learning model. It also provides personalized recommendations using the Google Gemini API.

---

# 🏗️ Tech Stack

## Backend
- FastAPI (Python)
- Machine Learning: XGBoost (classification model)
- MongoDB (PyMongo)
- JWT Authentication
- Google Gemini API
- bcrypt password hashing
- Uvicorn server

## Frontend
- React (Vite)
- Axios
- React Router DOM
- CSS for styling

---

# 🧠 Core Components

## 🤖 Machine Learning Model (Prediction Engine)
- XGBoost classification model
- Trained on sleep health and lifestyle dataset
- Uses 12 input features to predict sleep disorder outcomes
- Predicts the following classes:
  - No Disorder
  - Insomnia
  - Sleep Apnea
- Hyperparameter tuned for improved accuracy
- Integrated with FastAPI backend for real-time predictions via REST API

## 🔐 Authentication System
- User registration and login
- JWT-based authentication
- Secure password hashing using bcrypt

## 🤖 AI Recommendation System
- Uses Google Gemini API
- Generates personalized sleep improvement suggestions
- Based on predicted disorder and user lifestyle inputs

## 🌐 Full Stack Communication
- React frontend communicates with FastAPI backend via REST APIs
- Real-time prediction and response system

---

# 📁 Project Structure

```
backend/
frontend/
```

---

# ⚙️ Backend Setup

### Step 1: Navigate to backend
```bash
cd backend
```

### Step 2: Create virtual environment
```bash
python -m venv venv
```

### Step 3: Activate virtual environment

**Windows:**
```bash
venv\Scripts\activate
```

**Mac/Linux:**
```bash
source venv/bin/activate
```

### Step 4: Install dependencies
```bash
pip install -r requirements.txt
```

### Step 5: Create `.env` file inside backend folder
```env
MONGO_URI=your_mongo_connection_string
GEMINI_API_KEY=your_gemini_api_key
SECRET_KEY=your_jwt_secret_key
```

### Step 6: Run backend server
```bash
uvicorn app.main:app --reload
```

Backend runs at:
```
http://127.0.0.1:8000
```

---

# 🌐 Frontend Setup

### Step 1: Navigate to frontend
```bash
cd frontend
```

### Step 2: Install dependencies
```bash
npm install
```

### Step 3: Run frontend
```bash
npm run dev
```

Frontend runs at:
```
http://localhost:5173
```

---

# ▶️ How to Run Full Project

### Step 1
Start backend server

### Step 2
Start frontend server

### Step 3
Open browser and go to frontend URL

---

# 🚫 Important Notes

- `.venv`, `node_modules`, `.git`, and `.env` are NOT included in submission
- Use `requirements.txt` and `package.json` to reinstall dependencies
- All sensitive keys are stored in environment variables

---

# 🔐 Environment Variables

Backend requires a `.env` file with:

```
MONGO_URI=MongoDB connection string
GEMINI_API_KEY=Google Gemini API key
SECRET_KEY=JWT secret key
```

---

# 📌 Disclaimer

This project is developed for academic purposes and demonstrates integration of Machine Learning with full-stack web development.