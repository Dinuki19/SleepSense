import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import "../styles/ProfilePage.css";
import { confirmDelete } from "../utils/confirm";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
    fetchStats();
  }, []);

  // USER INFO
  const fetchProfile = async () => {
    try {
      const res = await API.get("/auth/me");
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // STATS + INSIGHTS
  const fetchStats = async () => {
    try {
      const res = await API.get("/predict/history");
      const data = res.data || [];

      const total = data.length;
      const lastPrediction = data.length > 0 ? data[0] : null;

      const counts = {
        Healthy: data.filter((p) => p.prediction === "Healthy").length,
        Insomnia: data.filter((p) => p.prediction === "Insomnia").length,
        Apnea: data.filter((p) => p.prediction === "Sleep Apnea").length,
      };

      const mostCommon = Object.keys(counts).reduce((a, b) =>
        counts[a] > counts[b] ? a : b
      );

      const healthyRate = total
        ? ((counts.Healthy / total) * 100).toFixed(1)
        : 0;

      setStats({
        total,
        lastPrediction,
        mostCommon,
        counts,
        healthyRate,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE ACCOUNT
 const handleDelete = async () => {
  const confirmed = await confirmDelete(
    "Are you sure you want to delete your account? This action cannot be undone."
  );

  if (!confirmed) return;

  try {
    await API.delete("/auth/delete-account");
    localStorage.removeItem("token");
    navigate("/login");
  } catch (err) {
    alert("Error deleting account");
  }
};

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

 
  const getInitials = (name) =>
    name
      ? name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
      : "??";

  
  const conditionStyle = (condition) => {
    if (condition === "Healthy")
      return { background: "#eef8f0", color: "#3b7d5a" };
    if (condition === "Insomnia")
      return { background: "#fdf0f8", color: "#c45fa0" };
    return { background: "#fff3ee", color: "#e07040" };
  };

  return (
    <>
     

      <div className="profile-container">

        {/* Banner */}
        {user && (
          <div className="profile-banner">
            <div className="profile-avatar">{getInitials(user.name)}</div>
            <div className="profile-banner-info">
              <div className="profile-banner-name">{user.name}</div>
              <div className="profile-banner-email">{user.email}</div>
              <div className="profile-banner-badge">
                <span className="badge-dot" />
                Active account
              </div>
              <div className="profile-banner-joined">
                Member since{" "}
                {new Date(user.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>
        )}

        {/*Stats Row */}
        {stats && (
          <div className="profile-stats-row">
            <div className="stat-box">
              <div className="stat-box-num">{stats.total}</div>
              <div className="stat-box-lbl">Total predictions</div>
            </div>
            <div className="stat-box">
              <div className="stat-box-num stat-box-num--green">
                {stats.healthyRate}%
              </div>
              <div className="stat-box-lbl">Healthy rate</div>
            </div>
            <div className="stat-box">
              <div className="stat-box-num stat-box-num--accent">
                {stats.mostCommon}
              </div>
              <div className="stat-box-lbl">Most common result</div>
            </div>
          </div>
        )}

        {/*Account Info*/}
        {user && (
          <>
            <p className="section-label">Account information</p>
            <div className="profile-card">
              <div className="card-header">
                <div className="card-icon card-icon--blue">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <h3>Account Information</h3>
              </div>
              <div className="info-row">
                <span className="info-label">Full name</span>
                <span className="info-value">{user.name}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Email address</span>
                <span className="info-value">{user.email}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Joined</span>
                <span className="info-value">
                  {new Date(user.created_at).toLocaleString()}
                </span>
              </div>
            </div>
          </>
        )}

        {/* Activity Summary */}
        {stats && (
          <>
            <p className="section-label">Activity summary</p>
            <div className="profile-card">
              <div className="card-header">
                <div className="card-icon card-icon--green">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                  </svg>
                </div>
                <h3>Activity Summary</h3>
              </div>
              <div className="info-row">
                <span className="info-label">Total predictions</span>
                <span className="info-value">{stats.total}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Healthy</span>
                <span className="info-value info-value--green">
                  {stats.counts.Healthy}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Insomnia</span>
                <span className="info-value info-value--pink">
                  {stats.counts.Insomnia}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Sleep Apnea</span>
                <span className="info-value info-value--orange">
                  {stats.counts.Apnea}
                </span>
              </div>
            </div>
          </>
        )}

        {/* AI Insights */}
        {stats && (
          <>
            <p className="section-label">AI insights</p>
            <div className="profile-card">
              <div className="card-header">
                <div className="card-icon card-icon--purple">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                </div>
                <h3>AI Insights</h3>
              </div>
              <div className="info-row">
                <span className="info-label">Most common condition</span>
                <span className="insight-pill" style={conditionStyle(stats.mostCommon)}>
                  {stats.mostCommon}
                </span>
              </div>
              {stats.lastPrediction && (
                <div className="info-row">
                  <span className="info-label">Latest prediction</span>
                  <span
                    className="insight-pill"
                    style={conditionStyle(stats.lastPrediction.prediction)}
                  >
                    {stats.lastPrediction.prediction}
                  </span>
                </div>
              )}
              <div className="info-row info-row--col">
                <div className="info-row-top">
                  <span className="info-label">Healthy rate</span>
                  <span className="info-value">{stats.healthyRate}%</span>
                </div>
                <div className="progress-bar-bg">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${stats.healthyRate}%` }}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {/* System Info */}
        <p className="section-label">System info</p>
        <div className="profile-card">
          <div className="card-header">
            <div className="card-icon card-icon--amber">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="3" width="20" height="14" rx="2"/>
                <path d="M8 21h8M12 17v4"/>
              </svg>
            </div>
            <h3>System Info</h3>
          </div>
          <div className="info-row">
            <span className="info-label">App</span>
            <span className="info-value">SleepSense AI</span>
          </div>
          <div className="info-row">
            <span className="info-label">Version</span>
            <span className="info-value">1.0</span>
          </div>
          <div className="info-row">
            <span className="info-label">Model</span>
            <span className="info-value">Machine Learning Classification</span>
          </div>
          <div className="info-row">
            <span className="info-label">Status</span>
            <span className="insight-pill" style={{ background: "#eef8f0", color: "#3b7d5a" }}>
              Active
            </span>
          </div>
        </div>

        {/*Danger Zone*/}
        <p className="section-label">Danger zone</p>
        <div className="profile-card profile-card--danger">
          <div className="card-header">
            <div className="card-icon card-icon--danger">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <h3 className="card-title--danger">Danger Zone</h3>
          </div>
          <p className="danger-desc">
            Deleting your account is permanent and cannot be undone. All your
            prediction history and personal data will be erased.
          </p>
          <button
            className="profile-btn profile-btn-danger"
            onClick={handleDelete}
          >
            Delete Account
          </button>
        </div>

        {/* Logout */}
        <div className="profile-card profile-card--logout">
          <div className="card-header">
            <div className="card-icon card-icon--indigo">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </div>
            <h3 className="card-title--light">Sign Out</h3>
          </div>
          <p className="logout-desc">
            You will be signed out of your current session.
          </p>
          <button
            className="profile-btn profile-btn-primary"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

      </div>

      
    </>
  );
}

export default ProfilePage;