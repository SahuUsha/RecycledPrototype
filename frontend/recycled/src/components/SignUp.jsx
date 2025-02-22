import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/signup.css"

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    contact: "",
  });
 
  const navigate = useNavigate(); // 🔹 Use navigate for redirection


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://recycledprototype.onrender.com/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        window.alert("Signup successful! Please log in.");
        setFormData({ username: "", email: "", password: "", contact: "" }); // Reset form
        navigate("/login");
      } else {
        window.alert(result.message || "Signup failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      window.alert("Something went wrong. Try again. : ",error);
    }
  };

  return (
    <div className="signup-container">
    <Link to="/" className="back-link">← Back to Home</Link>
    <div className="signup-box">
      <h2>Create your account</h2>
      <p>Join the eco-friendly community and start earning rewards</p>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <div className="input-box">
          <span className="icon">👤</span>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <label>Email address</label>
        <div className="input-box">
          <span className="icon">📧</span>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <label>Password</label>
        <div className="input-box">
          <span className="icon">🔒</span>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <label>Contact Number</label>
        <div className="input-box">
          <span className="icon">📞</span>
          <input
            type="number"
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="signup-btn">Create Account</button>
      </form>
      <p className="login-text">
        Already signed up? <Link to="/login">Login</Link>
      </p>
    </div>
  </div>
  );
};

export default SignUp;
