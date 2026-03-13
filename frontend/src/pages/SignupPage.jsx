import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SignupPage() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    navigate("/login");
  };

  return (
    <div style={styles.container}>

      {/* Left Panel */}
      <div style={styles.left}>
        <h1>SleepSense</h1>
        <p>Start understanding your sleep health today.</p>

        <ul>
          <li>Predict sleep disorders</li>
          <li>Track sleep patterns</li>
          <li>Get health recommendations</li>
        </ul>
      </div>

      {/* Right Panel */}
      <div style={styles.right}>
        <h2>Create an Account</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
          />

          <button type="submit">Sign Up</button>

        </form>

      </div>

    </div>
  );
}

const styles = {

  container: {
    display: "flex",
    height: "100vh"
  },

  left: {
    flex: 1,
    background: "#6c8bd9",
    color: "white",
    padding: "60px"
  },

  right: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "60px"
  }

};

export default SignupPage;