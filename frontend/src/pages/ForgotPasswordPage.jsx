import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/ForgotPasswordPage.css";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  const handleReset = async () => {
    if (!email || !newPassword) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.put("/auth/reset-password", {
        email,
        newPassword,
      });

      alert("Password reset successful ✅");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.detail || "Error");
    }
  };

  return (
    <div className="forgot-page">
      <Header />

      <div className="forgot-container">
        <div className="forgot-card">
          <h2>Forgot Password</h2>

          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter new password"
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <button onClick={handleReset}>Reset Password</button>

          <p
            className="back-login"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ForgotPasswordPage;