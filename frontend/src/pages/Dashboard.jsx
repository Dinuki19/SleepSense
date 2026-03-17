import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/DashboardPage.css";

function DashboardPage() {
  return (
    <div className="dashboard-page">
      <Header />

      <div className="dashboard-container">

        {/* Intro Section */}
        <div className="intro-card">
          <h2>Welcome to SleepSense</h2>
          <p>
            Sleep disorders are conditions that affect the quality, timing, and duration of sleep,
            impacting your overall health and well-being.
          </p>
        </div>

        {/* Video Section */}
        <div className="video-card">
          <iframe
            width="100%"
            height="300"
            src="https://www.youtube.com/embed/5MuIMqhT8DM"
            title="Sleep Disorders"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>

        {/* CTA Section */}
        <div className="cta-card">
          <h3>Ready to check your sleep health?</h3>
          <button>Start New Prediction</button>
        </div>

      </div>

      <Footer />
    </div>
  );
}

export default DashboardPage;