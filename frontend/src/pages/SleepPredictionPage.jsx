import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/SleepPredictionPage.css"; // optional CSS for styling

function SleepPredictionPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Gender: "",
    Age: "",
    Occupation: "",
    Sleep_Duration: "",
    Quality_of_Sleep: "",
    Physical_Activity_Level: "",
    Stress_Level: "",
    Height: "",
    Weight: "",
    Heart_Rate: "",
    Daily_Steps: "",
    Systolic: "",
    Diastolic: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      Age: Number(formData.Age),
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
      // POST to /predict → backend saves prediction automatically
      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}` // send JWT
          }
        }
      );

      navigate("/result", {
        state: {
          result: response.data,
          userInput: formData
        }
      });
    } catch (err) {
      console.error("Prediction failed:", err);
    }
  };

  
  return (
    <div className="sleep-prediction-page">
      <Header />
      <div className="sleep-form-container">
        <form onSubmit={handleSubmit}>
          <h2>Sleep Disorder Prediction</h2>

          {/* Personal Info */}
          <input type="text" name="Gender" placeholder="Gender" onChange={handleChange} required />
          <input type="number" name="Age" placeholder="Age" onChange={handleChange} required />
          <input type="text" name="Occupation" placeholder="Occupation" onChange={handleChange} required />

          {/* Sleep Info */}
          <input type="number" step="0.1" name="Sleep_Duration" placeholder="Sleep Duration (hours)" onChange={handleChange} required />
          <input type="number" name="Quality_of_Sleep" placeholder="Quality of Sleep (1-10)" onChange={handleChange} required />
          <input type="number" name="Physical_Activity_Level" placeholder="Physical Activity (min/day)" onChange={handleChange} required />
          <input type="number" name="Stress_Level" placeholder="Stress Level (1-10)" onChange={handleChange} required />

          {/* Body Measurements */}
          <input type="number" step="0.01" name="Height" placeholder="Height (m)" onChange={handleChange} required />
          <input type="number" name="Weight" placeholder="Weight (kg)" onChange={handleChange} required />

          {/* Optional Features */}
          <input type="number" name="Heart_Rate" placeholder="Heart Rate (optional)" onChange={handleChange} />
          <input type="number" name="Daily_Steps" placeholder="Daily Steps (optional)" onChange={handleChange} />
          <input type="number" name="Systolic" placeholder="Systolic BP (optional)" onChange={handleChange} />
          <input type="number" name="Diastolic" placeholder="Diastolic BP (optional)" onChange={handleChange} />

          <button type="submit">Predict</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default SleepPredictionPage;