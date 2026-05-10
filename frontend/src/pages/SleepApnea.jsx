import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ResultPage.css";

function SleepApneaPage() {
  const location = useLocation();
  const navigate = useNavigate();

  //  use backend result instead of userInput
  const { result } = location.state || {};
  const input = result?.input || {};

  const getExplanation = () => {
    let reasons = [];

    if (input["Sleep Duration (hours)"] < 5)
      reasons.push("Very low sleep duration");

    if (input["Stress Level (scale: 1-10)"] > 8)
      reasons.push("High stress level");

    if (input["Physical Activity Level (minutes/day)"] < 20)
      reasons.push("Very low physical activity");

    return reasons.length > 0
      ? reasons.join(", ")
      : "Possible breathing-related sleep issue";
  };

  return (
    <div className="rp-page rp-page--apnea">

      <div className="rp-container">

        {/*Hero Banner*/}
        <div className="rp-hero rp-hero--apnea">
          <div className="rp-hero__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <div>
            <h1 className="rp-hero__title">Sleep Apnea Risk 😷</h1>
            <p className="rp-hero__sub">You may be at risk of sleep apnea based on your inputs.</p>
            <p className="rp-warning">
    ⚠️ This is an AI-based prediction and not a medical diagnosis.  
    If you are having persistent sleep difficulties, please consult a healthcare professional.
  </p>
          </div>
        </div>

        {/* Cards */}
        <div className="rp-card rp-card--apnea rp-animate" style={{ animationDelay: "0.05s" }}>
          <div className="rp-card__label">What is Sleep Apnea?</div>
          <p className="rp-card__body">
            Sleep apnea is a condition where breathing repeatedly stops and starts during sleep. It can reduce oxygen levels and lead to serious health problems if untreated.
          </p>
        </div>

        <div className="rp-card rp-card--apnea rp-animate" style={{ animationDelay: "0.1s" }}>
          <div className="rp-card__label">Learn More</div>
          <iframe
            width="100%"
            height="250"
            src="https://www.youtube.com/embed/IMON9zmViu4"
            title="Sleep Apnea Video"
            allowFullScreen
          ></iframe>
        </div>

        <div className="rp-card rp-card--apnea rp-animate" style={{ animationDelay: "0.15s" }}>
          <div className="rp-card__label">Why this result?</div>
          <p className="rp-card__body">{getExplanation()}</p>
        </div>

      <div className="rp-card rp-card--apnea rp-animate" style={{ animationDelay: "0.2s" }}>
  <div className="rp-card__label">Recommendations</div>

  <ul className="rp-list rp-list--apnea">
    {result?.recommendations?.length > 0 ? (
      result.recommendations.map((item, index) => (
        <li key={index}>{item}</li>
      ))
    ) : (
      <>
        <li>Consult a medical professional</li>
        <li>Maintain a healthy weight</li>
        <li>Avoid alcohol before sleep</li>
        <li>Sleep on your side instead of your back</li>
      </>
    )}
  </ul>
</div>

        {/* UPDATED SUMMARY */}
        <div className="rp-card rp-card--apnea rp-animate" style={{ animationDelay: "0.25s" }}>
          <div className="rp-card__label">Your Health Insights</div>

          <div className="rp-summary-grid">

            <div className="rp-summary-item">
              <span className="rp-summary-key">Sleep Duration</span>
              <span className="rp-summary-val rp-summary-val--apnea">
                {input["Sleep Duration (hours)"] ?? "-"} hrs
              </span>
            </div>

            <div className="rp-summary-item">
              <span className="rp-summary-key">Sleep Quality</span>
              <span className="rp-summary-val rp-summary-val--apnea">
                {input["Quality of Sleep (scale: 1-10)"] ?? "-"} /10
              </span>
            </div>

            <div className="rp-summary-item">
              <span className="rp-summary-key">Stress Level</span>
              <span className="rp-summary-val rp-summary-val--apnea">
                {input["Stress Level (scale: 1-10)"] ?? "-"} /10
              </span>
            </div>

            <div className="rp-summary-item">
              <span className="rp-summary-key">Physical Activity</span>
              <span className="rp-summary-val rp-summary-val--apnea">
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

        <button className="rp-btn rp-btn--apnea" onClick={() => navigate("/predict")}>
          Try Again
        </button>

      </div>

    </div>
  );
}

export default SleepApneaPage;