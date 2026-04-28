import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/admin/AdminLogin.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/auth/login", {
        email,
        password,
      });

      if (res.data.role !== "admin") {
        alert("Access denied");
        return;
      }

      localStorage.setItem("token", res.data.token);
      navigate("/admin/dashboard");

    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-card">
          <h2>Admin Login</h2>

          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;