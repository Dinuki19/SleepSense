import { useEffect, useState } from "react";
import { getPredictions } from "../services/adminApi";
import AdminLayout from "../components/AdminLayout";
import "../../styles/admin/Predictions.css";

function getInitials(name) {
  if (!name) return "?";
  return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
}

function getRiskClass(risk) {
  if (!risk) return "risk-none";
  const r = risk.toLowerCase();
  if (r === "high") return "risk-high";
  if (r === "medium") return "risk-medium";
  if (r === "low") return "risk-low";
  return "risk-none";
}

function Predictions() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getPredictions().then(res => setData(res.data));
  }, []);

  return (
    <AdminLayout>
      <div className="predictions-page-header">
        <div>
          <h2 className="predictions-title">Predictions</h2>
          <p className="predictions-subtitle">All sleep disorder predictions logged in the system</p>
        </div>
        <span className="predictions-count-badge">{data.length} Predictions</span>
      </div>

      {data.length === 0 ? (
        <div className="predictions-empty">
          <p>No predictions found.</p>
        </div>
      ) : (
        <div className="predictions-table-wrap">
          <table className="predictions-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Prediction</th>
                <th>Risk Level</th>
              </tr>
            </thead>
            <tbody>
              {data.map((p) => (
                <tr key={p._id}>
                  <td>
                    <div className="pred-user-cell">
                      <div className="pred-avatar">{getInitials(p.user_name)}</div>
                      <span className="pred-username">{p.user_name}</span>
                    </div>
                  </td>
                  <td>
                    <span className="pred-label">{p.prediction}</span>
                  </td>
                  <td>
                    <span className={`risk-pill ${getRiskClass(p.risk_level)}`}>
                      {p.risk_level}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}

export default Predictions;