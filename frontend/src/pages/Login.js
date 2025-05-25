// src/pages/Login.js
import React, { useState } from "react";
import { login, signup } from "../auth";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await signup(email, password);
        alert("Signup successful. Please login.");
        setIsSignup(false); // switch back to login
      } else {
        await login(email, password);
        alert("Login successful.");
        window.location.href = "/dashboard";
      }
    } catch (err) {
      setError(err.message);
    }
  };



 




  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{isSignup ? "Signup" : "Login"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">{isSignup ? "Signup" : "Login"}</button>
        </form>

        {error && <p style={{ color: "#ff6666", marginTop: "10px", textAlign: "center" }}>{error}</p>}

        <p
          onClick={() => {
            setIsSignup(!isSignup);
            setError("");
          }}
          style={{
            marginTop: "15px",
            color: "#61dafb",
            textAlign: "center",
            cursor: "pointer"
          }}
        >
          {isSignup ? "Already have an account? Login" : "New user? Signup"}
        </p>
      </div>
    </div>
  );
}

export default Login;
