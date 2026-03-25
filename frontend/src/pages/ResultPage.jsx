import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/ResultPage.css";

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get prediction data from navigation state
  const { result, userInput } = location.state || {};

  if (!result) {
    return (
      <div>
        <Header />
        <h2>No prediction data found</h2>
        <button onClick={() => navigate("/predict")}>Go Back</button>
        <Footer />
      </div>
    );
  }

  const prediction = result.prediction;

  // Explanation logic
  const getExplanation = () => {
    let reasons = [];
    if (userInput.Sleep_Duration < 6) reasons.push("Low sleep duration");
    if (userInput.Stress_Level > 7) reasons.push("High stress level");
    if (userInput.Quality_of_Sleep < 5) reasons.push("Poor sleep quality");
    if (userInput.Physical_Activity_Level < 30) reasons.push("Low physical activity");

    return reasons.length > 0 ? reasons.join(", ") : "No strong negative indicators detected";
  };

  // Recommendations logic
  const getRecommendations = () => {
    if (prediction === "Insomnia") {
      return [
        "Maintain a consistent sleep schedule",
        "Avoid screens before bedtime",
        "Practice relaxation techniques (meditation, breathing)",
        "Reduce caffeine intake",
      ];
    }
    if (prediction === "Sleep Apnea") {
      return [
        "Consult a medical professional",
        "Maintain a healthy weight",
        "Avoid alcohol before sleep",
        "Sleep on your side instead of your back",
      ];
    }
    return [
      "Maintain your healthy lifestyle",
      "Continue regular exercise",
      "Keep a consistent sleep schedule",
      "Manage stress effectively",
    ];
  };

  return (
    <div className="result-page">
      <Header />
      <div className="result-container">
        <h1>Sleep Analysis Result</h1>

        {/* Prediction Card */}
        <div className="result-card">
          <h2>
            You may have: <span>{prediction}</span>
          </h2>
          <p className="note">
            ⚠️ This is not a medical diagnosis. It is an AI-based prediction.
          </p>
        </div>

        {/* Explanation Card */}
        <div className="result-card">
          <h3>Why this result?</h3>
          <p>{getExplanation()}</p>
        </div>

        {/* Recommendations Card */}
        <div className="result-card">
          <h3>Recommendations</h3>
          <ul>
            {getRecommendations().map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Input Summary Card */}
        <div className="result-card">
          <h3>Your Input Summary</h3>
          <ul>
            <li>Sleep Duration: {userInput.Sleep_Duration} hours</li>
            <li>Stress Level: {userInput.Stress_Level}</li>
            <li>Quality of Sleep: {userInput.Quality_of_Sleep}</li>
            <li>Physical Activity: {userInput.Physical_Activity_Level} min/day</li>
          </ul>
        </div>

        {/* Back Button */}
        <button className="btn-back" onClick={() => navigate("/predict")}>
          Try Again
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ResultPage;