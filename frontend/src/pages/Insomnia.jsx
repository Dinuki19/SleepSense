import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/ResultPage.css";
import SleepChart from "../components/SleepChart";

function InsomniaPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { userInput } = location.state || {};

  const getExplanation = () => {
    let reasons = [];

    if (userInput?.Sleep_Duration < 6)
      reasons.push("Low sleep duration");
    if (userInput?.Stress_Level > 7)
      reasons.push("High stress level");
    if (userInput?.Quality_of_Sleep < 5)
      reasons.push("Poor sleep quality");
    if (userInput?.Physical_Activity_Level < 30)
      reasons.push("Low physical activity");

    return reasons.length > 0
      ? reasons.join(", ")
      : "No strong negative indicators detected";
  };

  return (
    <div className="result-page insomnia">
      <Header />

      <div className="result-container">
        <h1 className="insomnia-text">Insomnia Detected 😴</h1>

        <div className="result-card">
          <p>You may be experiencing insomnia based on your inputs.</p>
        </div>

        <div className="result-card">
          <h3>What is Insomnia?</h3>
          <p>
            Insomnia is a sleep disorder where people have trouble falling
            asleep, staying asleep, or getting restful sleep. It can lead to
            fatigue, poor concentration, and mood changes.
          </p>
        </div>

        <div className="result-card">
          <h3>Learn More</h3>
          <iframe
            width="100%"
            height="250"
            src="https://www.youtube.com/embed/j5Sl8LyI7k8"
            title="Insomnia Video"
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
            <li>Maintain a consistent sleep schedule</li>
            <li>Avoid screens before bedtime</li>
            <li>Practice relaxation techniques</li>
            <li>Reduce caffeine intake</li>
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

export default InsomniaPage;