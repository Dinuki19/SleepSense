import logo from "../assets/logo.svg";
import "./Header.css";

function Header() {
  return (
    <nav className="header-nav">
      <div className="header-left">
        <img src={logo} alt="SleepSense Logo" className="header-logo" />
        <h1 className="header-title">SleepSense</h1>
      </div>

      <div className="header-menu">
        <button className="header-link">Home</button>
        <button className="header-link">Dashboard</button>
        <button className="header-link">History</button>
        <button className="header-link">Profile</button>
      </div>
    </nav>
  );
}

export default Header;