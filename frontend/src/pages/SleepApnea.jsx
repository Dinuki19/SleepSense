import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/ResultPage.css";
import SleepChart from "../components/SleepChart";

function SleepApneaPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { userInput } = location.state || {};

  const getExplanation = () => {
    let reasons = [];

    if (userInput?.Sleep_Duration < 5)
      reasons.push("Very low sleep duration");
    if (userInput?.Stress_Level > 8)
      reasons.push("High stress level");
    if (userInput?.Physical_Activity_Level < 20)
      reasons.push("Very low physical activity");

    return reasons.length > 0
      ? reasons.join(", ")
      : "Possible breathing-related sleep issue";
  };

  return (
    <div className="result-page apnea">
      <Header />

      <div className="result-container">
        <h1 className="apnea-text">Sleep Apnea Risk 😷</h1>

        <div className="result-card">
          <p>You may be at risk of sleep apnea.</p>
        </div>

        <div className="result-card">
          <h3>What is Sleep Apnea?</h3>
          <p>
            Sleep apnea is a condition where breathing repeatedly stops and
            starts during sleep. It can reduce oxygen levels and lead to
            serious health problems if untreated.
          </p>
        </div>

        <div className="result-card">
          <h3>Learn More</h3>
          <iframe
            width="100%"
            height="250"
            src="https://www.youtube.com/embed/IMON9zmViu4"
            title="Sleep Apnea Video"
            allowFullScreen
          ></iframe>
        </div>

        <div className="result-card">
          <h3>Why this result?</h3>
          <p>{getExplanation()}</p>
        </div>

        <div className="result-card">
          <h3>Recommendations</h3>
          <ul>
            <li>Consult a medical professional</li>
            <li>Maintain a healthy weight</li>
            <li>Avoid alcohol before sleep</li>
            <li>Sleep on your side instead of your back</li>
          </ul>
        </div>

        <div className="result-card">
          <h3>Your Input Summary</h3>
          <SleepChart userInput={userInput} />
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
          Try Again
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default SleepApneaPage;