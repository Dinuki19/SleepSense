import { useEffect, useState } from "react";
import API from "../api/api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import "../styles/ProfilePage.css";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
    fetchStats();
  }, []);

  // 👤 USER INFO
  const fetchProfile = async () => {
    try {
      const res = await API.get("/auth/me");
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 📊 STATS + INSIGHTS
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

  // 🗑 DELETE ACCOUNT
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete("/auth/delete-account");

      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      alert("Error deleting account");
    }
  };

  // 🚪 LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <Header />

      <div className="profile-container">
        <h2 className="profile-title">Profile</h2>

        {/* 👤 USER INFO */}
        {user && (
          <div className="profile-card">
            <h3>Account Information</h3>
            <p><b>Name:</b> {user.name}</p>
            <p><b>Email:</b> {user.email}</p>
            <p>
              <b>Joined:</b>{" "}
              {new Date(user.created_at).toLocaleString()}
            </p>
          </div>
        )}

        {/* 📊 SUMMARY */}
        {stats && (
          <div className="profile-card">
            <h3>Activity Summary</h3>
            <p><b>Total Predictions:</b> {stats.total}</p>
            <p><b>Healthy:</b> {stats.counts.Healthy}</p>
            <p><b>Insomnia:</b> {stats.counts.Insomnia}</p>
            <p><b>Sleep Apnea:</b> {stats.counts.Apnea}</p>
          </div>
        )}

        {/* 🧠 INSIGHTS */}
        {stats && (
          <div className="profile-card">
            <h3>AI Insights</h3>

            <p>
              <b>Most Common Condition:</b> {stats.mostCommon}
            </p>

            {stats.lastPrediction && (
              <p>
                <b>Latest Prediction:</b>{" "}
                {stats.lastPrediction.prediction}
              </p>
            )}

            <p>
              <b>Healthy Rate:</b> {stats.healthyRate}%
            </p>
          </div>
        )}

        {/* ⚙ SYSTEM INFO */}
        <div className="profile-card">
          <h3>System Info</h3>
          <p><b>App:</b> SleepSense AI</p>
          <p><b>Version:</b> 1.0</p>
          <p><b>Model:</b> Machine Learning Classification</p>
          <p><b>Status:</b> Active</p>
        </div>

        {/* ⚠ DANGER ZONE */}
        <div className="profile-card">
          <h3>Danger Zone</h3>
          <button
            className="profile-btn profile-btn-danger"
            onClick={handleDelete}
          >
            Delete Account
          </button>
        </div>

        {/* 🚪 LOGOUT */}
        <div className="profile-card">
          <button
            className="profile-btn profile-btn-primary"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProfilePage;