import logo from "../assets/logo.svg";

function Header() {
  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <img src={logo} alt="SleepSense Logo" style={styles.logo} />
        <h2>SleepSense</h2>
      </div>

      <div>
        <button style={styles.link}>Home</button>
        <button style={styles.link}>Dashboard</button>
        <button style={styles.link}>History</button>
        <button style={styles.link}>Profile</button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    background: "#f5f5f5"
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },

  logo: {
    width: "50px",
    height: "auto"
  },

  link: {
    margin: "0 10px",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "16px"
  }
};

export default Header;