import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
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

  if (loading)
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
        <p>Loading prediction...</p>
      </div>
    );

  if (!prediction) return null;

  const {
  prediction: result,
  input,
  timestamp,
  recommendations
  } = prediction;

  const normalised = result?.toLowerCase();

  const getPredictionClass = () => {
    if (normalised === "sleep apnea") return "apnea";
    if (normalised === "insomnia") return "insomnia";
    if (normalised === "healthy") return "healthy";
    return "";
  };

  const getDisplayLabel = () => {
    if (normalised === "sleep apnea") return "Sleep Apnea";
    if (normalised === "insomnia") return "Insomnia";
    if (normalised === "healthy") return "Healthy";
    return result;
  };

  const getBannerIcon = () => {
    if (normalised === "healthy")
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      );

    if (normalised === "insomnia")
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      );

    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    );
  };

  const getBadgeLabel = () => {
    if (normalised === "healthy") return "No disorder detected";
    if (normalised === "insomnia") return "Sleep disorder detected";
    if (normalised === "sleep apnea") return "Breathing sleep disorder detected";
    return "Result available";
  };

  const inputEntries = Object.entries(input).filter(
    ([, value]) => value !== null && value !== ""
  );

  const predClass = getPredictionClass();

  return (
    <div className="pd-page">
      <div className="pd-container">

        {/* Result Banner */}
        <div className={`pd-banner pd-banner--${predClass}`}>
          <div className="pd-banner__icon">{getBannerIcon()}</div>
          <div className="pd-banner__text">
            <h1 className="pd-banner__title">{getDisplayLabel()}</h1>
            <p className="pd-banner__sub">{getBadgeLabel()}</p>
          </div>
        </div>

        {/* Timestamp */}
        <div className="pd-timestamp">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {new Date(timestamp).toLocaleString()}
        </div>

        {/* Inputs */}
        {inputEntries.length > 0 && (
          <>
            <p className="pd-section-label">User inputs</p>
            <div className="pd-card pd-inputs-grid">
              {inputEntries.map(([key, value]) => (
                <div key={key} className="pd-input-item">
                  <span className="pd-input-key">{key.replace(/_/g, " ")}</span>
                  <span className="pd-input-val">{value}</span>
                </div>
              ))}
            </div>
          </>
        )}
        

        {/* Recommendations */}
        {recommendations?.length > 0 && (
        <>
        <p className="pd-section-label">
        <i className="ti ti-clipboard-list" aria-hidden="true" style={{ fontSize: 15 }} />
        Recommendations
        </p>
    <div className="pd-card">
      <ul className="pd-recommendation-list">
        {recommendations.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
    </>
     )}
        {/* Back Button */}
        <button className="pd-back-fab" onClick={() => navigate(-1)}>
          ← Back to Predictions
        </button>

      </div>
    </div>
  );
}

export default PredictionDetail;