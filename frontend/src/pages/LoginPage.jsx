import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/LoginPage.css";
import API from "../api/api";

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await API.post("/auth/login", {
      email: formData.email,
      password: formData.password
    });

    // ✅ Save token
    localStorage.setItem("token", response.data.access_token);

    // ✅ SAVE username (THIS IS MISSING)
    localStorage.setItem("username", response.data.username);

    alert("Login successful ✅");

    navigate("/dashboard");

  } catch (err) {
    console.error(err);
    alert("Invalid email or password ❌");
  }
};

  return (
    <div className="login-page">
      <Header />

      <div className="login-container">
        <div className="login-card">
          <h2>Welcome Back</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />

            <button type="submit">Login</button>
          </form>

          <p className="signup-link">
            Don’t have an account?{" "}
            <span onClick={() => navigate("/signup")}>Sign Up</span>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default LoginPage;