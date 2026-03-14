import { useNavigate } from "react-router-dom";
import landingIllustration from "../assets/Landing_illustration.svg";
import Header from "../components/Header";
import Footer from "../components/Footer";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div>
      <Header />

      {/* Hero Section */}
      <div style={styles.hero}>
        <div>
          <h1>Understand and Predict Your Sleep Health</h1>
          <p>Analyze your sleep patterns and get insights to improve your rest.</p>

          <button style={styles.primaryBtn} onClick={() => navigate("/signup")}>
            Sign up
          </button>

          <button style={styles.secondaryBtn} onClick={() => navigate("/login")}>
            Login
          </button>
        </div>

        <img src={landingIllustration} alt="sleep" width="600" />
      </div>

      {/* Features */}
      <div style={styles.features}>
        <h2>How SleepSense Helps You</h2>
        <div style={styles.featureGrid}>
          <div>
            <h3>Sleep Prediction</h3>
            <p>Detect potential sleep disorders using machine learning.</p>
          </div>

          <div>
            <h3>Health Insights</h3>
            <p>Understand how lifestyle affects your sleep quality.</p>
          </div>

          <div>
            <h3>Recommendations</h3>
            <p>Receive personalized tips to improve sleep habits.</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

const styles = {
  hero: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "80px",
    background: "linear-gradient(to right, #7ea2f7, #9cb8ff)"
  },

  primaryBtn: {
    padding: "10px 20px",
    marginRight: "10px",
    background: "#3b6bdc",
    color: "white",
    border: "none",
    borderRadius: "5px"
  },

  secondaryBtn: {
    padding: "10px 20px",
    background: "#6c8bd9",
    color: "white",
    border: "none",
    borderRadius: "5px"
  },

  features: {
    padding: "60px",
    textAlign: "center"
  },

  featureGrid: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "30px"
  }
};

export default LandingPage;