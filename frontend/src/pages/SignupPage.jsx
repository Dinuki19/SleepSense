import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/SignupPage.css";
import API from "../api/api";

function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Real-time input validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    switch (name) {
      case "name":
        setErrors({
          ...errors,
          name:
            value.trim().split(" ").length < 2
              ? "Please enter at least first and last name"
              : "",
        });
        break;
      case "email":
        setErrors({
          ...errors,
          email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            ? ""
            : "Enter a valid email address",
        });
        break;
      case "password":
        setErrors({
          ...errors,
          password:
            value.length < 8
              ? "Password must be at least 8 characters"
              : "",
          confirmPassword:
            formData.confirmPassword &&
            formData.confirmPassword !== value
              ? "Passwords do not match"
              : "",
        });
        break;
      case "confirmPassword":
        setErrors({
          ...errors,
          confirmPassword:
            value !== formData.password
              ? "Passwords do not match"
              : "",
        });
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final validation
    const finalErrors = {};
    if (formData.name.trim().split(" ").length < 2)
      finalErrors.name = "Please enter at least first and last name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      finalErrors.email = "Enter a valid email address";
    if (formData.password.length < 6)
      finalErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      finalErrors.confirmPassword = "Passwords do not match";

    setErrors(finalErrors);

    if (Object.keys(finalErrors).length === 0) {
      try {
        const response = await API.post("/auth/signup", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });

        // Store token and user data
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem(
          "user",
          JSON.stringify({ name: response.data.username })
        );

        
        navigate("/login", {
          state: {
            message: "Account created successfully! Please log in.",
          },
        });
      } catch (err) {
        console.error(err);
        setErrors({
          ...errors,
          email: err.response?.data?.detail || "Signup failed",
        });
      }
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-card">
          <h2>Create an Account</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && (
                <span className="error">{errors.name}</span>
              )}
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && (
                <span className="error">{errors.email}</span>
              )}
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
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>

            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {errors.confirmPassword && (
                <span className="error">
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            <button type="submit">Sign Up</button>
          </form>

          <p className="login-link">
            Already have an account?{" "}
            
            <span onClick={() => navigate("/login")}>
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;