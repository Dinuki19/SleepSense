import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/LoginPage.css";
import API from "../api/api";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    login: "",
  });


  const [toast, setToast] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    setErrors({ ...errors, login: "" });

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

    setErrors({ ...errors, login: "" });

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

  //Toast trigger from signup redirect
  useEffect(() => {
    if (location.state?.message) {
      setToast(location.state.message);

      const timer = setTimeout(() => {
        setToast("");
        window.history.replaceState({}, document.title);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <div className="login-page">

      
      {toast && (
        <div className="toast-notification">
           {toast}
        </div>
      )}

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

            {errors.login && (
              <span className="error login-error">{errors.login}</span>
            )}

            <button type="submit">Login</button>
          </form>

          <p className="signup-link">
            Don’t have an account?{" "}
            <span onClick={() => navigate("/signup")}>Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;