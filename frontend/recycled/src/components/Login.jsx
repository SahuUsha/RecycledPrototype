import React, { useState } from "react";
import { loginUser } from "../Api/user.api";
import { Link, useNavigate } from "react-router-dom";
 // 🔹 Use navigate for redirection
import "../styles/signup.css"


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      setError(""); // Clear previous errors
      const loginData = { email, password };
  
      try {
        const response = await loginUser(loginData);
        console.log("Login successful:", response);
        console.log("accessToken : ",response.data.accessToken)
        localStorage.setItem("accessToken",response.data.accessToken);
        const token = localStorage.getItem('accessToken')
        console.log(" token : ",token)
        // localStorage.setItem("refreshToken",response.data.refreshToken);
        setEmail("");
        setPassword("");


        
        navigate("/ecorewards"); 

        window.location.href  = '/ecorewards';
        
      } 
      
      catch (error) {
        console.error("Error during login:", error);
        setError(error.message || "Login failed. Please try again.");
      }
    };
  
  
    return (
      <div className="signup-container">
    
      <div className="signup-box">
        <h2>Login to your account</h2>
        <p>Access your eco-friendly community dashboard</p>
        <form onSubmit={handleSubmit}>
          <label>Email address</label>
          <div className="input-box">
            <span className="icon">📧</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <label>Password</label>
          <div className="input-box">
            <span className="icon">🔒</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" className="signup-btn">Login</button>
        </form>
       
      </div>
    </div>
    );
};

export default Login;
