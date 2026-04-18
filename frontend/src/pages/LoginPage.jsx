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
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    login: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Reset login error when user types
    setErrors({ ...errors, login: "" });

    // Optional: live email validation
    if (name === "email") {
      setErrors({
        ...errors,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Enter a valid email address",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset login error before submit
    setErrors({ ...errors, login: "" });

    // Optional: final check before API call
    if (!formData.email || !formData.password) {
      setErrors({ ...errors, login: "Please fill in all fields" });
      return;
    }

    try {
      const response = await API.post("/auth/login", {
  email: formData.email,
  password: formData.password,
});

localStorage.setItem("token", response.data.token);
localStorage.setItem(
  "user",
  JSON.stringify({ name: response.data.username })
);

navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setErrors({
        ...errors,
        login: err.response?.data?.detail || "Invalid email or password ❌",
      });
    }
  };

  return (
    <div className="login-page">
      <Header />

      <div className="login-container">
        <div className="login-card">
          <h2>Welcome Back</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <p
  className="forgot-password"
  onClick={() => navigate("/forgot-password")}
>
  Forgot Password?
</p>

            {errors.login && <span className="error login-error">{errors.login}</span>}

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