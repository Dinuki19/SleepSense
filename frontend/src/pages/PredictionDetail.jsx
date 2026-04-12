import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import SleepChart from "../components/SleepChart";
import "../styles/PredictionDetail.css";

function PredictionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrediction = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You must be logged in to view predictions.");
        navigate("/login");
        return;
      }

      try {
        const res = await API.get(`/predict/prediction/${id}`);
        setPrediction(res.data);
      } catch (error) {
        console.error("Error fetching prediction:", error);
        if (error.response?.status === 401) {
          alert("Session expired. Please log in again.");
          navigate("/login");
        } else if (error.response?.status === 404) {
          alert("Prediction not found.");
          navigate(-1);
        } else {
          alert(error.response?.data?.detail || "Error fetching prediction.");
          navigate(-1);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPrediction();
  }, [id, navigate]);

  if (loading) return (
    <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>
  );

  if (!prediction) return null;

  const { prediction: result, input, timestamp } = prediction;

  const normalised = result?.toLowerCase();

  const getPredictionClass = () => {
    if (normalised === "sleep apnea") return "apnea-text";
    if (normalised === "insomnia") return "insomnia-text";
    if (normalised === "healthy") return "healthy-text";
    return "";
  };

  const getDisplayLabel = () => {
    if (normalised === "sleep apnea") return "Sleep Apnea";
    if (normalised === "insomnia") return "Insomnia";
    if (normalised === "healthy") return "Healthy";
    return result;
  };

  return (
    <div className="prediction-detail-page">
      <div className="prediction-detail-container">

        <h1 className={getPredictionClass()}>{getDisplayLabel()}</h1>

        <p style={{ textAlign: "center", color: "#64748b", marginBottom: "20px" }}>
          Date & Time: {new Date(timestamp).toLocaleString()}
        </p>

        {/* User Inputs */}
        <div className="prediction-card-detail">
          <h3>User Inputs</h3>
          <ul>
            {Object.entries(input)
              .filter(([, value]) => value !== null && value !== "")
              .map(([key, value]) => (
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
          ← Back
        </button>

      </div>
    </div>
  );
}

export default PredictionDetail;