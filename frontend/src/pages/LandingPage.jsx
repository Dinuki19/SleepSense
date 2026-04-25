import { useNavigate } from "react-router-dom";
import illustrationLeft from "../assets/Landing_illustration.svg";
import illustrationRight from "../assets/Sleep.svg";
import "../styles/LandingPage.css";
import {
  Moon,
  Brain,
  Heart,
  Clock,
  Smartphone,
  BedDouble,
  BookOpen,
  ExternalLink,
} from "lucide-react";

const articles = [
  {
    id: 1,
    title: "The Importance of REM Sleep",
    description:
      "Discover why REM sleep is critical for memory consolidation, emotional regulation, and overall brain health.",
    emoji: "🌙",
    label: "Sleep science",
    url: "https://www.sleepfoundation.org/stages-of-sleep/rem-sleep",
  },
  {
    id: 2,
    title: "How Stress Affects Sleep",
    description:
      "Learn how chronic stress disrupts your sleep cycles and practical ways to break the cycle.",
    emoji: "🧠",
    label: "Mental health",
    url: "https://www.apa.org/topics/sleep/why",
  },
  {
    id: 3,
    title: "Foods for Better Sleep",
    description:
      "Explore which foods and nutrients promote restful sleep — and which ones to avoid before bedtime.",
    emoji: "🥗",
    label: "Nutrition",
    url: "https://www.healthline.com/nutrition/9-foods-to-help-you-sleep",
  },
];

const signs = [
  {
    icon: <Moon size={22} strokeWidth={1.8} />,
    title: "Trouble Sleeping",
    desc: "Difficulty falling or staying asleep, with frequent wake-ups throughout the night.",
    iconColor: "#5c6bc0",
    iconBg: "#eef1fd",
    tagColor: "#5c6bc0",
    tagBg: "#eef1fd",
    tag: "Insomnia risk",
  },
  {
    icon: <Brain size={22} strokeWidth={1.8} />,
    title: "Daytime Fatigue",
    desc: "Persistent tiredness, brain fog, and inability to concentrate during daylight hours.",
    iconColor: "#c45fa0",
    iconBg: "#fdf0f8",
    tagColor: "#c45fa0",
    tagBg: "#fdf0f8",
    tag: "Sleep deprivation",
  },
  {
    icon: <Heart size={22} strokeWidth={1.8} />,
    title: "Mood Changes",
    desc: "Increased irritability, anxiety spikes, and emotional sensitivity from disrupted rest.",
    iconColor: "#e07040",
    iconBg: "#fff3ee",
    tagColor: "#e07040",
    tagBg: "#fff3ee",
    tag: "Stress indicator",
  },
];

const tips = [
  {
    num: "01",
    icon: <Clock size={22} strokeWidth={1.8} />,
    title: "Set a Consistent Schedule",
    desc: "Go to bed and wake up at the same time every day — even weekends. Your circadian rhythm depends on it.",
  },
  {
    num: "02",
    icon: <Smartphone size={22} strokeWidth={1.8} />,
    title: "Limit Screen Time",
    desc: "Avoid blue-light screens at least 60 minutes before bed. Use night mode if you must use a device.",
  },
  {
    num: "03",
    icon: <BedDouble size={22} strokeWidth={1.8} />,
    title: "Create a Restful Environment",
    desc: "Make your bedroom dark, quiet, and comfortable. Use blackout curtains or a white noise machine.",
  },
];

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-root">
      

      {/* Hero Section */}
      <section className="hero">
        <span className="star s1" />
        <span className="star s2" />
        <span className="star s3" />
        <span className="star s4" />
        <span className="star s5" />
        <span className="star s6" />

        <img
          src={illustrationLeft}
          alt="Sleeping person illustration"
          className="hero-illus hero-illus--left"
        />

        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            AI-powered sleep analysis
          </div>

          <h1 className="hero-title">
            Understand and predict your sleep health
          </h1>

          <p className="hero-sub">
            Analyze your sleep patterns and get insights to improve your rest.
          </p>

          <div className="hero-buttons">
            <button
              className="btn btn--primary"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>

            <button
              className="btn btn--secondary"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
              <button
    className="btn btn--admin"
    onClick={() => navigate("/admin")}
  >
    Admin Login
  </button>

          </div>
        </div>

        <img
          src={illustrationRight}
          alt="Person reading in bed illustration"
          className="hero-illus hero-illus--right"
        />
      </section>

      {/* Main Section */}
      <main className="landing-main">

        {/* Signs */}
        <section className="info-section">
          <div className="section-head">
            <p className="section-label">Warning signs</p>
            <h2 className="section-title">Recognize the Signs</h2>
            <p className="section-sub">
              Know when your sleep patterns might be pointing to something more serious.
            </p>
            <div className="sec-divider" />
          </div>

          <div className="card-grid">
            {signs.map((s) => (
              <div className="info-card" key={s.title}>
                <span
                  className="info-card__icon"
                  style={{ color: s.iconColor, background: s.iconBg }}
                >
                  {s.icon}
                </span>

                <div>
                  <h3 className="info-card__title">{s.title}</h3>
                  <p className="info-card__desc">{s.desc}</p>

                  <span
                    className="info-card__tag"
                    style={{ color: s.tagColor, background: s.tagBg }}
                  >
                    {s.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section className="info-section">
          <div className="section-head">
            <p className="section-label">Sleep hygiene</p>
            <h2 className="section-title">Tips for Better Sleep</h2>
            <p className="section-sub">
              Simple, evidence-backed habits that can meaningfully improve your sleep quality.
            </p>
            <div className="sec-divider" />
          </div>

          <div className="card-grid">
            {tips.map((t) => (
              <div className="tip-card" key={t.title}>
                <div className="tip-num">{t.num}</div>
                <div>
                  <h3 className="info-card__title">{t.title}</h3>
                  <p className="info-card__desc">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Articles */}
        <section className="info-section">
          <div className="section-head">
            <p className="section-label">Expert reading</p>
            <h2 className="section-title">Expert Articles & Resources</h2>
            <p className="section-sub">
              Deep dives from sleep researchers and health organizations.
            </p>
            <div className="sec-divider" />
          </div>

          <div className="article-grid">
            {articles.map((a) => (
              <div className="article-card" key={a.id}>
                <div className="article-card__label">{a.label}</div>

                <div className="article-card__emoji-wrap">
                  <span>{a.emoji}</span>
                </div>

                <h3 className="article-card__title">{a.title}</h3>
                <p className="article-card__desc">{a.description}</p>

                {/* FIXED LINK */}
                <a
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="article-card__link"
                >
                  <BookOpen size={14} />
                  Read More
                  <ExternalLink size={12} />
                </a>
              </div>
            ))}
          </div>
        </section>

      {/* CTA Strip */}
        <div className="cta-strip">
          <h2 className="cta-strip__title">Start understanding your sleep today</h2>
          <p className="cta-strip__sub">
            It takes less than 2 minutes to get your first sleep health report.
          </p>
          <div className="cta-steps">
            <div className="cta-step"><div className="cta-step__num">1</div><p>Create your account</p></div>
            <div className="cta-step"><div className="cta-step__num">2</div><p>Log your sleep data</p></div>
            <div className="cta-step"><div className="cta-step__num">3</div><p>Get your prediction</p></div>
          </div>
        </div>

      </main>

     
    </div>
  );
}

export default LandingPage;