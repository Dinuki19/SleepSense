import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ResultPage.css";

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
    <div className="rp-page rp-page--insomnia">
      

      <div className="rp-container">

        {/* ── Hero Banner ── */}
        <div className="rp-hero rp-hero--insomnia">
          <div className="rp-hero__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </div>
          <div>
            <h1 className="rp-hero__title">Insomnia Detected 😴</h1>
            <p className="rp-hero__sub">You may be experiencing insomnia based on your inputs.</p>
          </div>
        </div>

        {/* ── Cards ── */}
        <div className="rp-card rp-card--insomnia rp-animate" style={{ animationDelay: "0.05s" }}>
          <div className="rp-card__label">What is Insomnia?</div>
          <p className="rp-card__body">
            Insomnia is a sleep disorder where people have trouble falling asleep, staying asleep, or getting restful sleep. It can lead to fatigue, poor concentration, and mood changes.
          </p>
        </div>

        <div className="rp-card rp-card--insomnia rp-animate" style={{ animationDelay: "0.1s" }}>
          <div className="rp-card__label">Learn More</div>
          <iframe
            width="100%"
            height="250"
            src="https://www.youtube.com/embed/j5Sl8LyI7k8"
            title="Insomnia Video"
            allowFullScreen
          ></iframe>
        </div>

        <div className="rp-card rp-card--insomnia rp-animate" style={{ animationDelay: "0.15s" }}>
          <div className="rp-card__label">Why this result?</div>
          <p className="rp-card__body">{getExplanation()}</p>
        </div>

        <div className="rp-card rp-card--insomnia rp-animate" style={{ animationDelay: "0.2s" }}>
          <div className="rp-card__label">Recommendations</div>
          <ul className="rp-list rp-list--insomnia">
            <li>Maintain a consistent sleep schedule</li>
            <li>Avoid screens before bedtime</li>
            <li>Practice relaxation techniques</li>
            <li>Reduce caffeine intake</li>
          </ul>
        </div>

        <div className="rp-card rp-card--insomnia rp-animate" style={{ animationDelay: "0.25s" }}>
          <div className="rp-card__label">Your Input Summary</div>
          <div className="rp-summary-grid">
            <div className="rp-summary-item">
              <span className="rp-summary-key">Sleep Duration</span>
              <span className="rp-summary-val rp-summary-val--insomnia">{userInput?.Sleep_Duration ?? "-"} hrs</span>
            </div>
            <div className="rp-summary-item">
              <span className="rp-summary-key">Stress Level</span>
              <span className="rp-summary-val rp-summary-val--insomnia">{userInput?.Stress_Level ?? "-"}</span>
            </div>
            <div className="rp-summary-item">
              <span className="rp-summary-key">Quality of Sleep</span>
              <span className="rp-summary-val rp-summary-val--insomnia">{userInput?.Quality_of_Sleep ?? "-"}</span>
            </div>
            <div className="rp-summary-item">
              <span className="rp-summary-key">Physical Activity</span>
              <span className="rp-summary-val rp-summary-val--insomnia">{userInput?.Physical_Activity_Level ?? "-"} min/day</span>
            </div>
          </div>
        </div>

        <button className="rp-btn rp-btn--insomnia" onClick={() => navigate("/predict")}>
          Try Again
        </button>

      </div>

      
    </div>
  );
}

export default InsomniaPage;