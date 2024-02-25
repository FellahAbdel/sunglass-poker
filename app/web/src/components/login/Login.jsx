// Login.js
import React, { useState } from "react";
import logo from "./logo.png";
import "./login.css"; // Import CSS file

const Login = ({ showSignUp, hideAll, showForgotPassword, showResetPassword  }) => {
  // Component code
  const handleBoxClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="container" id="login-box">
      <div className="overlay" onClick={hideAll}>
        <h1 className="text">Sign in to your account</h1>
        <div className="login-box" id="login-box" onClick={handleBoxClick}>
          <img src={logo} alt="Logo du site" className="logo" />
          <input type="text" placeholder="Username" className="input" />
          <input type="password" placeholder="Password" className="input" />
          <button className="button login-button">Login</button>
          <button className="forgot-button" onClick={showForgotPassword}>
            I forgot my password. Click here to reset
          </button>
          <p></p>
          <button className="button register-button" onClick={showSignUp}>
            Register New Account
          </button>
          <p>or</p>
          <button className="button login-button google-button">
            Sign in with google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
