import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div>

      {/* Navbar */}
      <nav style={styles.nav}>
        <h2>SleepSense</h2>
        <div>
          <button style={styles.link}>Home</button>
          <button style={styles.link}>Dashboard</button>
          <button style={styles.link}>History</button>
          <button style={styles.link}>Profile</button>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={styles.hero}>
        <div>
          <h1>Understand and Predict Your Sleep Health</h1>
          <p>
            Analyze your sleep patterns and get insights to improve your rest.
          </p>

          <button
            style={styles.primaryBtn}
            onClick={() => navigate("/signup")}
          >
            Sign up
          </button>

          <button
            style={styles.secondaryBtn}
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>

        <img
          src="https://cdn-icons-png.flaticon.com/512/1048/1048953.png"
          alt="sleep"
          width="300"
        />
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

      {/* Footer */}
      <footer style={styles.footer}>
        <p>About | Contact | Privacy</p>
        <p>© 2026 SleepSense</p>
      </footer>

    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 40px",
    background: "#f5f5f5"
  },

  link: {
    margin: "0 10px",
    background: "none",
    border: "none",
    cursor: "pointer"
  },

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
  },

  footer: {
    textAlign: "center",
    padding: "20px",
    background: "#3b6bdc",
    color: "white"
  }
};

export default LandingPage;