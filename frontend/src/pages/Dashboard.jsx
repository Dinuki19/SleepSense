import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/DashboardPage.css";

function DashboardPage() {
  const navigate = useNavigate();

  // Mock data – replace with real data from your context/API
  const user = { name: "Dhinuki" };
  const stats = {
    totalPredictions: 5,
    lastResult: "Insomnia",
    riskLevel: "Moderate",
  };
  const recentPredictions = [
    { date: "Feb 10", result: "Insomnia" },
    { date: "Feb 02", result: "None" },
    { date: "Jan 25", result: "Sleep Apnea" },
    { date: "Jan 17", result: "None" },
  ];

  return (
    <div className="dashboard-page">
      <Header />

      <div className="dashboard-layout">
        {/* ── LEFT COLUMN ── */}
        <div className="dashboard-left">

          {/* Welcome + CTA banner */}
          <div className="welcome-banner">
            <div className="welcome-text">
              <h2>Welcome back, {user.name} 👋</h2>
              <p>Here's your sleep health overview.</p>
            </div>
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
                onClick={() => navigate("/new-prediction")}
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
                <strong>{stats.totalPredictions}</strong>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-label">Last Result</span>
              <div className="stat-value">
                <span className="stat-icon">🛏️</span>
                <strong>{stats.lastResult}</strong>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-label">Risk Level</span>
              <div className="stat-value">
                <span className="stat-icon warning">⚠️</span>
                <strong className="risk-moderate">{stats.riskLevel}</strong>
              </div>
            </div>
          </div>

          {/* Recent Predictions table */}
          <div className="table-card">
            <div className="table-card-header">
              <h4>Recent Predictions</h4>
              <span className="dots">•••</span>
            </div>
            <table className="predictions-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Result</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {recentPredictions.map((p, i) => (
                  <tr key={i}>
                    <td>{p.date}</td>
                    <td>{p.result}</td>
                    <td>
                      {i < recentPredictions.length - 1 ? (
                        <button className="btn-view">View &rsaquo;</button>
                      ) : (
                        <button
                          className="btn-full-history"
                          onClick={() => navigate("/history")}
                        >
                          View Full History
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="dashboard-right">

          {/* Sleep Disorder Info */}
          <div className="info-card">
            <h4>What is Sleep Disorder?</h4>
            <p>
              Learn about sleep disorders, their causes, and how they can
              affect your health.
            </p>
            <div className="video-wrapper">
              <iframe
                src="https://www.youtube.com/embed/k-GG1drfPu4"
                title="Sleep Disorders"
                frameBorder="0"
                allowFullScreen
              />
            </div>
            <p className="video-caption">
              Learn about sleep disorders, their causes, and how they can
              affect your health.
            </p>
          </div>

          {/* Recent Predictions (right panel) */}
          <div className="table-card">
            <div className="table-card-header">
              <span className="header-icon">📋</span>
              <h4>Recent Predictions</h4>
              <span className="dots">•••</span>
            </div>
            <div className="mini-predictions">
              {recentPredictions.slice(0, 2).map((p, i) => (
                <div className="mini-prediction-row" key={i}>
                  <span>{p.date}</span>
                  <button className="btn-view">View &rsaquo;</button>
                </div>
              ))}
              <button
                className="btn-full-history"
                onClick={() => navigate("/history")}
              >
                View Full History
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default DashboardPage;