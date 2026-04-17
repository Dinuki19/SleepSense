import { useEffect, useState } from "react";
import API from "../api/api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import "../styles/ProfilePage.css";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  // 📥 Load user profile
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/auth/me");
      setUser(res.data);
      setEmail(res.data.email);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔐 Reset password
  const handleResetPassword = async () => {
    try {
      await API.put("/auth/reset-password", {
        email,
        newPassword,
      });

      alert("Password reset successful");
      setNewPassword("");
    } catch (err) {
      alert(err.response?.data?.detail || "Error resetting password");
    }
  };

  // 🗑 Delete account
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

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <Header />

      <div className="profile-container">
        <h2>Profile Page</h2>

        {/* 👤 USER INFO */}
        {user && (
          <div className="card">
            <h3>User Information</h3>
            <p><b>Name:</b> {user.name}</p>
            <p><b>Email:</b> {user.email}</p>
            <p>
              <b>Joined:</b>{" "}
              {new Date(user.created_at).toLocaleString()}
            </p>
          </div>
        )}

        {/* 🔐 RESET PASSWORD */}
        <div className="card">
          <h3>Reset Password</h3>

          <input
            type="email"
            value={email}
            disabled
            placeholder="Email"
          />

          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
          />

          <button onClick={handleResetPassword}>
            Reset Password
          </button>
        </div>

        {/* 🗑 DELETE ACCOUNT */}
        <div className="card danger">
          <h3>Danger Zone</h3>
          <button onClick={handleDelete}>
            Delete Account
          </button>
        </div>

        {/* 🚪 LOGOUT */}
        <div className="card">
          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProfilePage;