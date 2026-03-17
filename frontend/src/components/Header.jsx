import logo from "../assets/logo.svg";
import "./Header.css";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <nav className="header-nav">
      <div className="header-left" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        <img src={logo} alt="SleepSense Logo" className="header-logo" />
        <h1 className="header-title">SleepSense</h1>
      </div>

      <div className="header-menu">
        <button className="header-link" onClick={() => navigate("/")}>
          Home
        </button>

        <button className="header-link" onClick={() => navigate("/dashboard")}>
          Dashboard
        </button>

        <button className="header-link" onClick={() => navigate("/history")}>
          History
        </button>

        <button className="header-link" onClick={() => navigate("/profile")}>
          Profile
        </button>
      </div>
    </nav>
  );
}

export default Header;