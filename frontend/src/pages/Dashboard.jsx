import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DashboardPage.css";
import API from "../api/api";
import { jwtDecode } from "jwt-decode";
import { confirmDelete } from "../utils/confirm";

function DashboardPage() {
  const navigate = useNavigate();
  const [predictions, setPredictions] = useState([]);
  const [username, setUsername] = useState("User");

  // ----------------- Fetch predictions -----------------
  const fetchPredictions = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get(
        "http://127.0.0.1:8000/predict/predictions",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Decode token to get logged-in user ID
      const decoded = jwtDecode(token);
      const loggedUserId = decoded.sub;

      // Filter + Sort predictions (latest first)
      const filteredPredictions = res.data
        .filter((p) => String(p.user_id) === String(loggedUserId))
        .sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );

      setPredictions(filteredPredictions);
    } catch (err) {
      console.error("Failed to fetch predictions:", err);
    }
  };

  useEffect(() => {
    // Redirect if not logged in
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    // Safe user retrieval
    const storedUser = localStorage.getItem("user");
    let user = storedUser ? JSON.parse(storedUser) : null;

    if (!user) {
      const username = localStorage.getItem("username");
      user = username ? { name: username } : null;
    }

    setUsername(user?.name || "User");

    // Fetch predictions
    fetchPredictions();
  }, []);

  const totalPredictions = predictions.length;
  const lastPrediction = predictions?.[0];

  // ----------------- Risk Level -----------------
  const getRiskLevel = (prediction) => {
    if (!prediction) return "N/A";
    if (prediction === "Sleep Apnea") return "High";
    if (prediction === "Insomnia") return "Moderate";
    if (prediction === "Healthy") return "Low";
    return "Unknown";
  };

  const getRiskIcon = (level) => {
    if (level === "High") return "❗";
    if (level === "Moderate") return "⚠️";
    if (level === "Low") return "✅";
    return "❔";
  };

  // ----------------- Delete Function -----------------
 const handleDelete = async (id) => {
  const confirm = await confirmDelete(
    "Are you sure you want to delete this prediction?"
  );

  if (!confirm) return;

  try {
    await API.delete(
      `http://127.0.0.1:8000/predict/prediction/${id}`
    );

    // Remove only deleted prediction
    setPredictions((prev) =>
      prev.filter((p) => p._id !== id)
    );
  } catch (err) {
    console.error("Delete failed:", err);
  }
};
  const riskLevel =
    lastPrediction?.risk_level || getRiskLevel(lastPrediction?.prediction);

  const getPredictionBadgeClass = (pred) => {
    const n = pred?.toLowerCase();
    if (n === "healthy") return "db-pred-badge db-pred-badge--healthy";
    if (n === "insomnia") return "db-pred-badge db-pred-badge--insomnia";
    if (n === "sleep apnea") return "db-pred-badge db-pred-badge--apnea";
    return "db-pred-badge";
  };

  const getRiskClass = (level) => {
    if (level === "High") return "db-stat-val db-stat-val--high";
    if (level === "Moderate") return "db-stat-val db-stat-val--moderate";
    if (level === "Low") return "db-stat-val db-stat-val--low";
    return "db-stat-val";
  };

  // Initial letter for avatar
  const avatarLetter = username.charAt(0).toUpperCase();

  return (
    <div className="db-page">
     

      <div className="db-layout">

        {/* ── LEFT COLUMN ── */}
        <div className="db-col">

          {/* Welcome */}
          <div className="db-welcome">
            <div className="db-welcome-text">
              <h2>Welcome back, {username}!</h2>
              <p>Here's your sleep health overview.</p>
            </div>
            <div className="db-avatar">{avatarLetter}</div>
          </div>

          {/* Hero Card */}
          <div className="db-hero">
            <div className="db-hero-text">
              <h3>Start a New Sleep Prediction</h3>
              <p>Enter your latest sleep and lifestyle data to receive AI-based insights.</p>
              <button className="db-hero-btn" onClick={() => navigate("/predict")}>
                Start Prediction
              </button>
            </div>
            <div className="db-hero-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </div>
          </div>

          {/* Stats Row */}
          <div className="db-stats">
            <div className="db-stat">
              <div className="db-stat-top">
                <span className="db-stat-label">Total Predictions</span>
                <div className="db-stat-dot db-stat-dot--blue">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="18" y="3" width="4" height="18" /><rect x="10" y="8" width="4" height="13" /><rect x="2" y="13" width="4" height="8" />
                  </svg>
                </div>
              </div>
              <div className="db-stat-val">{totalPredictions}</div>
              <div className="db-stat-sub">All time</div>
            </div>

            <div className="db-stat">
              <div className="db-stat-top">
                <span className="db-stat-label">Last Result</span>
                <div className="db-stat-dot db-stat-dot--green">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                </div>
              </div>
              <div className="db-stat-val db-stat-val--sm">
                {lastPrediction?.prediction || "N/A"}
              </div>
              <div className="db-stat-sub">Most recent</div>
            </div>

            <div className="db-stat">
              <div className="db-stat-top">
                <span className="db-stat-label">Risk Level</span>
                <div className="db-stat-dot db-stat-dot--amber">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
              </div>
              <div className={getRiskClass(riskLevel)}>{riskLevel}</div>
              <div className="db-stat-sub">Based on last result</div>
            </div>
          </div>

          {/* Table */}
          <div className="db-table-card">
            <div className="db-table-head">
              <h4>Recent Predictions</h4>
              <span className="db-count-badge">{totalPredictions} records</span>
            </div>

            <table className="db-table">
              <thead>
                <tr>
                  <th>Date & Time</th>
                  <th>Prediction</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {predictions.map((p) => (
                  <tr key={p._id}>
                    <td>
                      {new Date(p.timestamp)
                        .toLocaleString("en-LK", {
                          timeZone: "Asia/Colombo",
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })
                        .replace(",", "")
                        .replace("/", ".")
                        .replace("/", ".")
                        .replace(" AM", " A.M.")
                        .replace(" PM", " P.M.")}
                    </td>
                    <td>
                      <span className={getPredictionBadgeClass(p.prediction)}>
                        {p.prediction}
                      </span>
                    </td>
                    <td>
                      <div className="db-actions">
                        <button
                          className="db-btn-view"
                          onClick={() => navigate(`/prediction/${p._id}`)}
                        >
                          View &rsaquo;
                        </button>
                        <button
                          className="db-btn-delete"
                          onClick={() => handleDelete(p._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="db-col">
          <div className="db-info-card">
            
            <h4>What is Sleep Disorder?</h4>
            <p>Learn about sleep disorders, their causes, and how they can affect your health.</p>
            <div className="db-video-wrapper">
              <iframe
                src="https://www.youtube.com/embed/k-GG1drfPu4"
                title="Sleep Disorders"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          <div className="db-tip-card">
            <div className="db-tip-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </div>
            <div>
              <h5>Sleep Tip</h5>
              <p>Maintain a consistent sleep schedule — go to bed and wake up at the same time every day, even on weekends.</p>
            </div>
          </div>
        </div>

      </div>

     
    </div>
  );
}

export default DashboardPage;