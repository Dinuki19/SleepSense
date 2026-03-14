function Footer() {
  return (
    <footer style={styles.footer}>
      <p>About | Contact | Privacy</p>
      <p>© 2026 SleepSense</p>
    </footer>
  );
}

const styles = {
  footer: {
    textAlign: "center",
    padding: "20px",
    background: "#3b6bdc",
    color: "white",
    marginTop: "40px"
  }
};

export default Footer;