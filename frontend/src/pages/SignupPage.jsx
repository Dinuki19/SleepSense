import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/SignupPage.css";

function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // navigate("/login");
  };

  return (
    <div className="signup-page">
      <Header />

      <div className="signup-container">
        {/* Left Panel */}
        <div className="left-panel">
          <h1>SleepSense</h1>
          <p>Start understanding your sleep health today.</p>

          <ul>
            <li>Predict sleep disorders</li>
            <li>Track sleep patterns</li>
            <li>Get health recommendations</li>
          </ul>
        </div>

        {/* Right Panel */}
        <div className="right-panel">
          <h2>Create an Account</h2>

          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />

            <button type="submit">Sign Up</button>
          </form>

          <p className="login-link">
            Already have an account? <span onClick={() => navigate("/login")}>Login</span>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SignupPage;