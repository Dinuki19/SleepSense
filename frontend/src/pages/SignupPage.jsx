import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/SignupPage.css";
import API from "../api/api";

function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  // ✅ FIXED (was missing before)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match ❌");
    return;
  }

  try {
    const response = await API.post("/auth/signup", {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    // ✅ SAVE username
    localStorage.setItem("username", response.data.username);

    alert("User created successfully ✅");

    // ✅ Go directly to dashboard (better UX)
    navigate("/dashboard");

  } catch (err) {
    console.error(err);
    alert(err.response?.data?.detail || "Signup failed ❌");
  }
};

  return (
    <div className="signup-page">
      <Header />

      <div className="signup-container">
        <div className="signup-card">
          <h2>Create an Account</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />

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

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              required
            />

            <button type="submit">Sign Up</button>
          </form>

          <p className="login-link">
            Already have an account?{" "}
            <span onClick={() => navigate("/dashboard")}>Login</span>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SignupPage;