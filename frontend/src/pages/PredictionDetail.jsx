// PredictionDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import SleepChart from "../components/SleepChart"; // your chart component
import "../styles/PredictionDetail.css"; 

function PredictionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        // Fetch the access token from localStorage
        const token = localStorage.getItem("access_token");

        if (!token) {
          alert("You must be logged in to view predictions");
          navigate("/login"); // redirect to login if no token
          return;
        }

        // Make the GET request with Authorization header
        const res = await API.get(`/predict/prediction/${id}`);
        setPrediction(res.data);
      } catch (error) {
        console.error(error);
        alert(error.response?.data?.detail || "Prediction not found or error fetching data");
        navigate(-1); // go back if error occurs
      } finally {
        setLoading(false);
      }
    };

    fetchPrediction();
  }, [id, navigate]);

  if (loading) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;
  if (!prediction) return null;

  const { prediction: result, input, timestamp } = prediction;

  // Determine CSS class for prediction type
  const getPredictionClass = () => {
    if (result === "Sleep Apnea") return "apnea-text";
    if (result === "Insomnia") return "insomnia-text";
    if (result === "Healthy") return "healthy-text";
    return "";
  };

  return (
    <div className="prediction-detail-page">
      <div className="prediction-detail-container">
        <h1 className={getPredictionClass()}>{result}</h1>
        <p style={{ textAlign: "center", color: "#64748b", marginBottom: "20px" }}>
          Date & Time: {new Date(timestamp).toLocaleString()}
        </p>

        {/* User Inputs */}
        <div className="prediction-card-detail">
          <h3>User Inputs:</h3>
          <ul>
            {Object.entries(input).map(([key, value]) => (
              <li key={key}>
                <strong>{key.replace(/_/g, " ")}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>

        {/* Chart */}
        <div className="prediction-chart">
          <SleepChart userInput={input} />
        </div>

        {/* Back Button */}
        <button className="button-back" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </div>
  );
}

export default PredictionDetail;