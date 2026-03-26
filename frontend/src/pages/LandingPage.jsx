import { useNavigate } from "react-router-dom";
import illustrationLeft from "../assets/Landing_illustration.svg";
import illustrationRight from "../assets/sleep.jpg";
import Header from "../components/Header";
import Footer from "../components/Footer";
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

/* Articles data */
const articles = [
  {
    id: 1,
    title: "The Importance of REM Sleep",
    description:
      "Discover why REM sleep is critical for memory consolidation, emotional regulation, and overall brain health.",
    emoji: "🌙",
    url: "https://www.sleepfoundation.org/stages-of-sleep/rem-sleep",
  },
  {
    id: 2,
    title: "How Stress Affects Sleep",
    description:
      "Learn how chronic stress disrupts your sleep cycles and practical ways to break the cycle.",
    emoji: "🧠",
    url: "https://www.apa.org/topics/sleep/why",
  },
  {
    id: 3,
    title: "Foods for Better Sleep",
    description:
      "Explore which foods and nutrients promote restful sleep — and which ones to avoid before bedtime.",
    emoji: "🥗",
    url: "https://www.healthline.com/nutrition/9-foods-to-help-you-sleep",
  },
];

/* ── Signs data ─────────────────────────────────────────────────── */
const signs = [
  {
    icon: <Moon size={28} strokeWidth={1.8} />,
    title: "Trouble Sleeping",
    desc: "Difficulty falling or staying asleep.",
    color: "#6c63ff",
  },
  {
    icon: <Brain size={28} strokeWidth={1.8} />,
    title: "Daytime Fatigue",
    desc: "Feeling tired and unfocused during the day.",
    color: "#e06bbc",
  },
  {
    icon: <Heart size={28} strokeWidth={1.8} />,
    title: "Mood Changes",
    desc: "Irritability and increased stress.",
    color: "#e05b5b",
  },
];

/* ── Tips data ──────────────────────────────────────────────────── */
const tips = [
  {
    icon: <Clock size={28} strokeWidth={1.8} />,
    title: "Set a Consistent Schedule",
    desc: "Go to bed and wake up at the same time every day.",
    color: "#5b8de0",
  },
  {
    icon: <Smartphone size={28} strokeWidth={1.8} />,
    title: "Limit Screen Time",
    desc: "Avoid screens at least an hour before bed.",
    color: "#5b8de0",
  },
  {
    icon: <BedDouble size={28} strokeWidth={1.8} />,
    title: "Create a Restful Environment",
    desc: "Make your bedroom dark, quiet, and comfortable.",
    color: "#5b8de0",
  },
];

/* ── Component ──────────────────────────────────────────────────── */
function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-root">
      <Header />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="hero">
        {/* Starfield dots */}
        <span className="star s1" />
        <span className="star s2" />
        <span className="star s3" />
        <span className="star s4" />
        <span className="star s5" />

        <img
          src={illustrationLeft}
          alt="Sleeping person illustration"
          className="hero-illus hero-illus--left"
        />

        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-title--bold">Understand and Predict
            Your Sleep Health </span>
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
          </div>
        </div>

        <img
          src={illustrationRight}
          alt="Person reading in bed illustration"
          className="hero-illus hero-illus--right"
        />
      </section>

      {/* ── Main body ────────────────────────────────────────────── */}
      <main className="landing-main">

        {/* Recognize the Signs */}
        <section className="info-section">
          <h2 className="section-title">Recognize the Signs</h2>
          <div className="card-grid">
            {signs.map((s) => (
              <div className="info-card" key={s.title}>
                <span
                  className="info-card__icon"
                  style={{ color: s.color, background: `${s.color}1a` }}
                >
                  {s.icon}
                </span>
                <div>
                  <h3 className="info-card__title">{s.title}</h3>
                  <p className="info-card__desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tips for Better Sleep */}
        <section className="info-section">
          <h2 className="section-title">Tips for Better Sleep</h2>
          <div className="card-grid">
            {tips.map((t) => (
              <div className="info-card" key={t.title}>
                <span
                  className="info-card__icon"
                  style={{ color: t.color, background: `${t.color}1a` }}
                >
                  {t.icon}
                </span>
                <div>
                  <h3 className="info-card__title">{t.title}</h3>
                  <p className="info-card__desc">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Expert Articles & Resources */}
        <section className="info-section">
          <h2 className="section-title">Expert Articles &amp; Resources</h2>
          <div className="article-grid">
            {articles.map((a) => (
              <div className="article-card" key={a.id}>
                <div className="article-card__top">
                  <span className="article-card__emoji">{a.emoji}</span>
                  <h3 className="article-card__title">{a.title}</h3>
                </div>
                <p className="article-card__desc">{a.description}</p>
                <a
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="article-card__link"
                >
                  <BookOpen size={15} />
                  Read More
                  <ExternalLink size={13} />
                </a>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

export default LandingPage;
