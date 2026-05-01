import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ResultPage.css";

function HealthyPage() {
  const location = useLocation();
  const navigate = useNavigate();

  //  use backend result instead of userInput
  const { result } = location.state || {};
  const input = result?.input || {};

  const getExplanation = () => {
    return "Your sleep duration, stress level, and activity levels are within a healthy range.";
  };

  return (
    <div className="rp-page rp-page--healthy">

      <div className="rp-container">

        {/* ── Hero Banner ── */}
        <div className="rp-hero rp-hero--healthy">
          <div className="rp-hero__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div>
            <h1 className="rp-hero__title">You Are Healthy 🎉</h1>
            <p className="rp-hero__sub">Your sleep patterns look great , keep it up!</p>
          </div>
        </div>

        {/* ── Cards ── */}
        <div className="rp-card rp-card--healthy rp-animate" style={{ animationDelay: "0.05s" }}>
          <div className="rp-card__label">Overview</div>
          <p className="rp-card__body">
            Great job! Your sleep patterns look healthy. Maintaining good sleep habits helps improve energy, focus, and overall well-being.
          </p>
        </div>

        <div className="rp-card rp-card--healthy rp-animate" style={{ animationDelay: "0.1s" }}>
          <div className="rp-card__label">Learn More</div>
          <iframe
            width="100%"
            height="250"
            src="https://www.youtube.com/embed/gedoSfZvBgE?t=33s"
            title="Healthy Sleep"
            allowFullScreen
          ></iframe>
        </div>

        <div className="rp-card rp-card--healthy rp-animate" style={{ animationDelay: "0.15s" }}>
          <div className="rp-card__label">Why this result?</div>
          <p className="rp-card__body">{getExplanation()}</p>
        </div>

        <div className="rp-card rp-card--healthy rp-animate" style={{ animationDelay: "0.2s" }}>
  <div className="rp-card__label">Keep It Up</div>

  <ul className="rp-list rp-list--healthy">
    {result?.recommendations?.length > 0 ? (
      result.recommendations.map((item, index) => (
        <li key={index}>{item}</li>
      ))
    ) : (
      <>
        <li>Maintain your current routine</li>
        <li>Exercise regularly</li>
        <li>Manage stress effectively</li>
        <li>Keep consistent sleep timing</li>
      </>
    )}
  </ul>
</div>

        {/* ── UPDATED INPUT SUMMARY ── */}
        <div className="rp-card rp-card--healthy rp-animate" style={{ animationDelay: "0.25s" }}>
          <div className="rp-card__label">Your Health Insights</div>

          <div className="rp-summary-grid">

            <div className="rp-summary-item">
              <span className="rp-summary-key">Sleep Duration</span>
              <span className="rp-summary-val rp-summary-val--healthy">
                {input["Sleep Duration (hours)"] ?? "-"} hrs
              </span>
            </div>

            <div className="rp-summary-item">
              <span className="rp-summary-key">Sleep Quality</span>
              <span className="rp-summary-val rp-summary-val--healthy">
                {input["Quality of Sleep (scale: 1-10)"] ?? "-"} /10
              </span>
            </div>

            <div className="rp-summary-item">
              <span className="rp-summary-key">Stress Level</span>
              <span className="rp-summary-val rp-summary-val--healthy">
                {input["Stress Level (scale: 1-10)"] ?? "-"} /10
              </span>
            </div>

            <div className="rp-summary-item">
              <span className="rp-summary-key">Physical Activity</span>
              <span className="rp-summary-val rp-summary-val--healthy">
                {input["Physical Activity Level (minutes/day)"] ?? "-"} min/day
              </span>
            </div>

            
            <div className="rp-summary-item">
              <span className="rp-summary-key">Heart Rate</span>
              <span className="rp-summary-val">
                {input["Heart Rate (bpm)"] ?? "-"} bpm
              </span>
            </div>

            <div className="rp-summary-item">
              <span className="rp-summary-key">Daily Steps</span>
              <span className="rp-summary-val">
                {input["Daily Steps"] ?? "-"}
              </span>
            </div>

            <div className="rp-summary-item">
              <span className="rp-summary-key">Blood Pressure</span>
              <span className="rp-summary-val">
                {input["Systolic"] ?? "-"} / {input["Diastolic"] ?? "-"}
              </span>
            </div>

            <div className="rp-summary-item">
              <span className="rp-summary-key">BMI Category</span>
              <span className="rp-summary-val">
                {input["BMI Category"] ?? "-"}
              </span>
            </div>

          </div>
        </div>

        <button className="rp-btn rp-btn--healthy" onClick={() => navigate("/predict")}>
          Check Again
        </button>

      </div>

    </div>
  );
}

export default HealthyPage;