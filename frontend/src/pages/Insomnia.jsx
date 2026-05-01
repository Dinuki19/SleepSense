import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ResultPage.css";

function InsomniaPage() {
  const location = useLocation();
  const navigate = useNavigate();

  //  get full backend response
  const { result } = location.state || {};
  const input = result?.input || {};

  const getExplanation = () => {
    let reasons = [];

    if (input["Sleep Duration (hours)"] < 6)
      reasons.push("Low sleep duration");

    if (input["Stress Level (scale: 1-10)"] > 7)
      reasons.push("High stress level");

    if (input["Quality of Sleep (scale: 1-10)"] < 5)
      reasons.push("Poor sleep quality");

    if (input["Physical Activity Level (minutes/day)"] < 30)
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
            <p className="rp-warning">
    ⚠️ This is an AI-based prediction and not a medical diagnosis.  
    If you are having persistent sleep difficulties, please consult a healthcare professional.
  </p>
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
    {result?.recommendations?.length > 0 ? (
      result.recommendations.map((item, index) => (
        <li key={index}>{item}</li>
      ))
    ) : (
      <>
        <li>Maintain a consistent sleep schedule</li>
        <li>Avoid screens before bedtime</li>
        <li>Practice relaxation techniques</li>
        <li>Reduce caffeine intake</li>
      </>
    )}
  </ul>
</div>

        {/* ── Updated Summary ── */}
        <div className="rp-card rp-card--insomnia rp-animate" style={{ animationDelay: "0.25s" }}>
          <div className="rp-card__label">Your Health Insights</div>

          <div className="rp-summary-grid">

            <div className="rp-summary-item">
              <span className="rp-summary-key">Sleep Duration</span>
              <span className="rp-summary-val rp-summary-val--insomnia">
                {input["Sleep Duration (hours)"] ?? "-"} hrs
              </span>
            </div>

            <div className="rp-summary-item">
              <span className="rp-summary-key">Sleep Quality</span>
              <span className="rp-summary-val rp-summary-val--insomnia">
                {input["Quality of Sleep (scale: 1-10)"] ?? "-"} /10
              </span>
            </div>

            <div className="rp-summary-item">
              <span className="rp-summary-key">Stress Level</span>
              <span className="rp-summary-val rp-summary-val--insomnia">
                {input["Stress Level (scale: 1-10)"] ?? "-"} /10
              </span>
            </div>

            <div className="rp-summary-item">
              <span className="rp-summary-key">Physical Activity</span>
              <span className="rp-summary-val rp-summary-val--insomnia">
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

        <button className="rp-btn rp-btn--insomnia" onClick={() => navigate("/predict")}>
          Try Again
        </button>

      </div>

    </div>
  );
}

export default InsomniaPage;