import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import "../styles/ForgotPasswordPage.css";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState(""); 
  const [error, setError] = useState("");     

  const navigate = useNavigate();

  const handleReset = async () => {
    setMessage("");
    setError("");

    if (!email || !newPassword) {
      setError("Please fill all fields");
      return;
    }

    try {
      await API.put("/auth/reset-password", {
        email,
        newPassword,
      });

      setMessage("Password reset successfully ✅");

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong");
    }
  };

  return (
    <div className="forgot-page">
      <div className="forgot-container">
        <div className="forgot-card">
          <h2>Forgot Password</h2>

          {message && <p className="success-msg">{message}</p>}
          {error && <p className="error-msg">{error}</p>}

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

          <p className="back-login" onClick={() => navigate("/login")}>
            Back to Login
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;