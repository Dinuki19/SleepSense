import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/DashboardPage.css";

function DashboardPage() {
  const navigate = useNavigate();
  const [predictions, setPredictions] = useState([]);
  const [username, setUsername] = useState("User");

  useEffect(() => {
    setUsername(localStorage.getItem("username") || "User");

    const fetchPredictions = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/predictions", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setPredictions(res.data);
      } catch (err) {
        console.error("Failed to fetch predictions:", err);
      }
    };

    fetchPredictions();
  }, []);

  const totalPredictions = predictions.length;
  const lastPrediction = predictions[0];

  return (
    <div className="dashboard-page">
      <Header />

      <div className="dashboard-layout">
        {/* LEFT COLUMN */}
        <div className="dashboard-left">
          <div className="welcome-banner">
            <h2>Welcome back, {username}!</h2>
            <p>Here's your sleep health overview.</p>
          </div>
          

          {/* Start Prediction card */}
          <div className="prediction-card">
            <div className="prediction-card-text">
              <h3>Start New Sleep Prediction</h3>
              <p>
                Enter your latest sleep and lifestyle data to receive
                AI-based insights.
              </p>
              <button
                className="btn-start"
                onClick={() => navigate("/predict")}
              >
                Start Prediction
              </button>
            </div>
            <div className="prediction-card-illustration">
              <div className="illustration-circle large" />
              <div className="illustration-circle small" />
              <div className="illustration-icon brain">🧠</div>
              <div className="illustration-icon person">🛌</div>
            </div>
          </div>

          {/* Stats row */}
          <div className="stats-row">
            <div className="stat-card">
              <span className="stat-label">Total Predictions</span>
              <div className="stat-value">
                <span className="stat-icon bars">📊</span>
                <strong>{totalPredictions}</strong>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-label">Last Result</span>
              <div className="stat-value">
                <span className="stat-icon">🛏️</span>
                <strong>{lastPrediction?.prediction || "N/A"}</strong>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-label">Risk Level</span>
              <div className="stat-value">
                <span className="stat-icon warning">⚠️</span>
                <strong>{lastPrediction ? "Moderate" : "N/A"}</strong>
              </div>
            </div>
          </div>

          {/* Recent Predictions Table */}
          <div className="table-card">
            <div className="table-card-header">
              <h4>Recent Predictions</h4>
              <span className="dots">•••</span>
            </div>
            <table className="predictions-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Prediction</th>
                  <th>View</th>
                </tr>
              </thead>

              <tbody>
                {predictions.map((p, i) => (
                  <tr key={i}>
                    <td>{new Date(p.timestamp).toLocaleString("en-LK", {
                    timeZone: "Asia/Colombo",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true
                    }).replace(",", "").replace("/", ".").replace("/", ".").replace(" AM", " A.M.").replace(" PM", " P.M.")}
                    </td>
                    <td>{p.prediction}</td>
                    <td>
                      <button className="btn-view" onClick={() => navigate("/result", { state: { result: p, userInput: p.input } })}>
                        View &rsaquo;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        

        {/* RIGHT COLUMN */}
        <div className="dashboard-right">
          <div className="info-card">
            <h4>What is Sleep Disorder?</h4>
            <p>Learn about sleep disorders, their causes, and how they can affect your health.</p>
            <div className="video-wrapper">
              <iframe
                src="https://www.youtube.com/embed/k-GG1drfPu4"
                title="Sleep Disorders"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default DashboardPage;