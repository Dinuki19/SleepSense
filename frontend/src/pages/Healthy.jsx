import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/ResultPage.css";

function HealthyPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { userInput } = location.state || {};

  const getExplanation = () => {
    return "Your sleep duration, stress level, and activity levels are within a healthy range.";
  };

  return (
    <div className="result-page healthy">
      <Header />

      <div className="result-container">
        <h1 className="healthy-text">You Are Healthy 🎉</h1>

        <div className="result-card">
          <p>Great job! Your sleep patterns look healthy.</p>
        </div>

        <div className="result-card">
          <h3>Your Sleep Health</h3>
          <p>
            Your current sleep patterns appear healthy. Maintaining good sleep
            habits helps improve energy, focus, and overall well-being.
          </p>
        </div>

        <div className="result-card">
          <h3>Learn More</h3>
          <iframe
            width="100%"
            height="250"
            src="https://www.youtube.com/embed/TaLFBTvB1iQ"
            title="Healthy Sleep"
            allowFullScreen
          ></iframe>
        </div>

        <div className="result-card">
          <h3>Why this result?</h3>
          <p>{getExplanation()}</p>
        </div>

        <div className="result-card">
          <h3>Keep It Up</h3>
          <ul>
            <li>Maintain your current routine</li>
            <li>Exercise regularly</li>
            <li>Manage stress effectively</li>
            <li>Keep consistent sleep timing</li>
          </ul>
        </div>

        <div className="result-card">
          <h3>Your Input Summary</h3>
          <ul>
            <li>Sleep Duration: {userInput?.Sleep_Duration ?? "-"} hours</li>
            <li>Stress Level: {userInput?.Stress_Level ?? "-"}</li>
            <li>Quality of Sleep: {userInput?.Quality_of_Sleep ?? "-"}</li>
            <li>
              Physical Activity: {userInput?.Physical_Activity_Level ?? "-"} min/day
            </li>
          </ul>
        </div>

        <button className="button" onClick={() => navigate("/predict")}>
          Check Again
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default HealthyPage;