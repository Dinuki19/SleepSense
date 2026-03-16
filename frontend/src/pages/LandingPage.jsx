import { useNavigate } from "react-router-dom";
import landingIllustration from "../assets/Landing_illustration.svg";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div>
      <Header />

      {/* Hero Section */}
      <section className="hero">

        <div className="hero-text">
          <h1>Understand and Predict Your Sleep Health</h1>
          <p>Analyze your sleep patterns and get insights to improve your rest.</p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>

        <img
          src={landingIllustration}
          alt="sleep"
          className="hero-image"
        />

      </section>

      {/* Features */}
      <section className="features">

        <h2>How SleepSense Helps You</h2>

        <div className="feature-grid">

          <div className="feature-card">
            <h3>Sleep Prediction</h3>
            <p>Detect potential sleep disorders using machine learning.</p>
          </div>

          <div className="feature-card">
            <h3>Health Insights</h3>
            <p>Understand how lifestyle affects your sleep quality.</p>
          </div>

          <div className="feature-card">
            <h3>Recommendations</h3>
            <p>Receive personalized tips to improve sleep habits.</p>
          </div>

        </div>

      </section>

      <Footer />
    </div>
  );
}

export default LandingPage;