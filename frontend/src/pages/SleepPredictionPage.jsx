import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "../styles/SleepPredictionPage.css";

function SleepPredictionPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Gender: "",
    Age: "",
    Occupation: "",
    Other_Occupation: "",
    Sleep_Duration: "",
    Quality_of_Sleep: "",
    Physical_Activity_Level: "",
    Stress_Level: "",
    Height: "",
    Weight: "",
    Heart_Rate: "",
    Daily_Steps: "",
    Systolic: "",
    Diastolic: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in. Please log in first.");
      navigate("/login");
      return;
    }

    const payload = {
      Gender: formData.Gender,
      Age: Number(formData.Age),
      Occupation:
        formData.Occupation === "Other"
          ? formData.Other_Occupation
          : formData.Occupation,
      Sleep_Duration: Number(formData.Sleep_Duration),
      Quality_of_Sleep: Number(formData.Quality_of_Sleep),
      Physical_Activity_Level: Number(formData.Physical_Activity_Level),
      Stress_Level: Number(formData.Stress_Level),
      Height: Number(formData.Height),
      Weight: Number(formData.Weight),
      Heart_Rate: formData.Heart_Rate ? Number(formData.Heart_Rate) : null,
      Daily_Steps: formData.Daily_Steps ? Number(formData.Daily_Steps) : null,
      Systolic: formData.Systolic ? Number(formData.Systolic) : null,
      Diastolic: formData.Diastolic ? Number(formData.Diastolic) : null,
    };

    try {
      const response = await API.post("/predict/", payload);
      const result = response.data;
      const prediction = result.prediction?.toLowerCase();

      if (prediction === "insomnia") {
        navigate("/insomnia", { state: { userInput: formData } });
      } else if (prediction === "sleep apnea") {
        navigate("/sleep-apnea", { state: { userInput: formData } });
      } else {
        navigate("/healthy", { state: { userInput: formData } });
      }
    } catch (err) {
      console.error("Prediction failed:", err);
      if (err.response?.status === 401) {
        alert("Session expired. Please log in again.");
        navigate("/login");
      } else {
        setError("Prediction failed. Please check your inputs and try again.");
      }
    }
  };

  return (
    <div className="sleep-prediction-page">
      

      <div className="sleep-form-container">
        <form onSubmit={handleSubmit}>
          <h2>Sleep Disorder Prediction</h2>

          {error && <p className="error-message">{error}</p>}

          {/* Gender */}
          <select name="Gender" value={formData.Gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          {/* Age */}
          <input
            type="number"
            name="Age"
            placeholder="Age"
            value={formData.Age}
            onChange={handleChange}
            min="1"
            max="120"
            required
          />

          {/* Occupation */}
          <select name="Occupation" value={formData.Occupation} onChange={handleChange} required>
            <option value="">Select Occupation</option>
            <option value="Student">Student</option>
            <option value="Office Worker">Office Worker</option>
            <option value="Manual Labor">Manual Labor</option>
            <option value="Retired">Retired</option>
            <option value="Nurse">Nurse</option>
            <option value="Doctor">Doctor</option>
            <option value="Engineer">Engineer</option>
            <option value="Lawyer">Lawyer</option>
            <option value="Teacher">Teacher</option>
            <option value="Accountant">Accountant</option>
            <option value="Salesperson">Salesperson</option>
            <option value="Scientist">Scientist</option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="Sales Representative">Sales Representative</option>
            <option value="Manager">Manager</option>
            <option value="Other">Other</option>
          </select>

          {formData.Occupation === "Other" && (
            <input
              type="text"
              name="Other_Occupation"
              placeholder="Enter your occupation"
              value={formData.Other_Occupation}
              onChange={handleChange}
              required
            />
          )}

          {/* Sleep Info */}
          <input
            type="number"
            step="0.1"
            name="Sleep_Duration"
            placeholder="Sleep Duration (hours)"
            value={formData.Sleep_Duration}
            onChange={handleChange}
            min="0"
            max="24"
            required
          />

          <input
            type="number"
            name="Quality_of_Sleep"
            placeholder="Quality of Sleep (1-10)"
            value={formData.Quality_of_Sleep}
            onChange={handleChange}
            min="1"
            max="10"
            required
          />

          <input
            type="number"
            name="Physical_Activity_Level"
            placeholder="Physical Activity (min/day)"
            value={formData.Physical_Activity_Level}
            onChange={handleChange}
            min="0"
            required
          />

          <input
            type="number"
            name="Stress_Level"
            placeholder="Stress Level (1-10)"
            value={formData.Stress_Level}
            onChange={handleChange}
            min="1"
            max="10"
            required
          />

          {/* Body */}
          <input
            type="number"
            step="0.01"
            name="Height"
            placeholder="Height (m)"
            value={formData.Height}
            onChange={handleChange}
            min="0.5"
            max="3"
            required
          />

          <input
            type="number"
            name="Weight"
            placeholder="Weight (kg)"
            value={formData.Weight}
            onChange={handleChange}
            min="1"
            required
          />

          {/* Optional */}
          <input
            type="number"
            name="Heart_Rate"
            placeholder="Heart Rate (optional)"
            value={formData.Heart_Rate}
            onChange={handleChange}
            min="30"
            max="250"
          />

          <input
            type="number"
            name="Daily_Steps"
            placeholder="Daily Steps (optional)"
            value={formData.Daily_Steps}
            onChange={handleChange}
            min="0"
          />

          <input
            type="number"
            name="Systolic"
            placeholder="Systolic BP (optional)"
            value={formData.Systolic}
            onChange={handleChange}
            min="50"
            max="300"
          />

          <input
            type="number"
            name="Diastolic"
            placeholder="Diastolic BP (optional)"
            value={formData.Diastolic}
            onChange={handleChange}
            min="30"
            max="200"
          />

          <button type="submit">Predict</button>
        </form>
      </div>

      
    </div>
  );
}

export default SleepPredictionPage;