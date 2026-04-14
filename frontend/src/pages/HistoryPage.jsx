import { useEffect, useState } from "react";
import API from "../api/api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/HistoryPage.css";

import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function HistoryPage() {
  const [predictions, setPredictions] = useState([]);
  const [filter, setFilter] = useState("All");

  // 📥 Load data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await API.get("/predict/history");
      setPredictions(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const getPredictionValue = (type) => {
    switch (type) {
      case "Healthy":
        return 1;
      case "Insomnia":
        return 2;
      case "Sleep Apnea":
        return 3;
      default:
        return 0;
    }
  };

  // 📊 Summary
  const total = predictions.length;

  const counts = {
    Healthy: predictions.filter((p) => p.prediction === "Healthy").length,
    Insomnia: predictions.filter((p) => p.prediction === "Insomnia").length,
    Apnea: predictions.filter((p) => p.prediction === "Sleep Apnea").length,
  };

  // 🥧 Pie chart data
  const pieData = [
    { name: "Healthy", value: counts.Healthy },
    { name: "Insomnia", value: counts.Insomnia },
    { name: "Sleep Apnea", value: counts.Apnea },
  ];

  const COLORS = ["#4CAF50", "#FF9800", "#F44336"];

  // line chart
  const lineData = predictions
    .map((p) => ({
      time: new Date(p.timestamp),
      prediction: p.prediction,
      value: getPredictionValue(p.prediction),
    }))
    .sort((a, b) => a.time - b.time)
    .map((p) => ({
      time: p.time.toLocaleString(),
      prediction: p.prediction,
      value: p.value,
    }));

  // 🔍 Filter system
  const filtered =
    filter === "All"
      ? predictions
      : predictions.filter((p) => p.prediction === filter);

  const getRiskClass = (risk) => {
    if (!risk) return "";
    const r = risk.toLowerCase();
    if (r.includes("low")) return "risk-low";
    if (r.includes("medium") || r.includes("moderate")) return "risk-medium";
    if (r.includes("high")) return "risk-high";
    return "";
  };

  const getPredictionClass = (prediction) => {
    if (!prediction) return "";
    if (prediction === "Healthy") return "pred-healthy";
    if (prediction === "Insomnia") return "pred-insomnia";
    if (prediction === "Sleep Apnea") return "pred-apnea";
    return "";
  };

  return (
    <>
      <Header />

      <div className="history-container">
        <div className="history-hero">
          <span className="history-eyebrow">Sleep Analysis</span>
          <h2>Prediction History</h2>
          <p className="history-subtitle">Track your sleep health patterns over time</p>
        </div>

        {/* 📊 Summary */}
        <div className="summary-cards">
          <div className="card card-total">
            <span className="card-number">{total}</span>
            <span className="card-label">Total Records</span>
          </div>
          <div className="card card-healthy">
            <span className="card-number">{counts.Healthy}</span>
            <span className="card-label">Healthy</span>
          </div>
          <div className="card card-insomnia">
            <span className="card-number">{counts.Insomnia}</span>
            <span className="card-label">Insomnia</span>
          </div>
          <div className="card card-apnea">
            <span className="card-number">{counts.Apnea}</span>
            <span className="card-label">Sleep Apnea</span>
          </div>
        </div>

        {/* Charts Row */}
        <div className="charts-row">
          {/* 🥧 Pie Chart */}
          <div className="chart-container">
            <h3>Prediction Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} dataKey="value" outerRadius={100} label>
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* 📈 Line Chart */}
          <div className="chart-container">
            <h3>Prediction Type Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="time" tick={{ fill: "#8899aa", fontSize: 11 }} />
                <YAxis
                  tick={{ fill: "#8899aa", fontSize: 11 }}
                  tickFormatter={(value) => {
                    if (value === 1) return "Healthy";
                    if (value === 2) return "Insomnia";
                    if (value === 3) return "Apnea";
                    return "";
                  }}
                />
                <Tooltip
                  formatter={(value) => {
                    if (value === 1) return "Healthy";
                    if (value === 2) return "Insomnia";
                    if (value === 3) return "Sleep Apnea";
                    return value;
                  }}
                  contentStyle={{
                    background: "#1a2236",
                    border: "1px solid rgba(99,179,237,0.2)",
                    borderRadius: "10px",
                    color: "#e2e8f0",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#63b3ed"
                  strokeWidth={2.5}
                  dot={{ fill: "#63b3ed", r: 4 }}
                  activeDot={{ r: 6, fill: "#90cdf4" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 🔍 Filter */}
        <div className="filter-section">
          <span className="filter-label">Filter by:</span>
          <div className="filter-tabs">
            {["All", "Healthy", "Insomnia", "Sleep Apnea"].map((option) => (
              <button
                key={option}
                className={`filter-tab ${filter === option ? "filter-tab--active" : ""} ${
                  option === "Healthy" ? "tab-healthy" :
                  option === "Insomnia" ? "tab-insomnia" :
                  option === "Sleep Apnea" ? "tab-apnea" : "tab-all"
                }`}
                onClick={() => setFilter(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* 📋 List */}
        <div className="prediction-list">
          {filtered.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">🌙</span>
              <p>No predictions found.</p>
            </div>
          ) : (
            filtered.map((p) => (
              <div
                key={p._id}
                className={`prediction-card ${getPredictionClass(p.prediction)}`}
              >
                <div className="prediction-card__left">
                  <span className={`prediction-badge ${getPredictionClass(p.prediction)}`}>
                    {p.prediction}
                  </span>
                </div>
                <div className="prediction-card__body">
                  <p className="card-meta">
                    <span className="meta-label">Risk Level</span>
                    <span className={`meta-value risk-badge ${getRiskClass(p.risk_level)}`}>
                      {p.risk_level}
                    </span>
                  </p>
                  <p className="card-meta">
                    <span className="meta-label">Date</span>
                    <span className="meta-value">
                      {new Date(p.timestamp).toLocaleString()}
                    </span>
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default HistoryPage;