import logo from "../assets/logo.svg";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <nav className="header-nav">
      <div className="header-left" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        <img src={logo} alt="SleepSense Logo" className="header-logo" />
        <h1 className="header-title">SleepSense</h1>
      </div>

      <div className="header-menu">
      <Link className="header-link" to="/">Home</Link>
      <Link className="header-link" to="/dashboard">Dashboard</Link>
      <Link className="header-link" to="/history">History</Link>
      <Link className="header-link" to="/profile">Profile</Link>
      </div>
    </nav>
  );
}

export default Header;