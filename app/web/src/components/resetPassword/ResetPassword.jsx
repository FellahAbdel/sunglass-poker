// forgotPassword.jsx
import React, { useState } from "react";
import logo from "../login/logo.png";
import "./resetPassword.css"; // Import CSS file

const Login = ({ showLogin, showSignUp, hideAll, showForgotPassword, showResetPassword    }) => {
  // Component code
  const handleBoxClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="container" id="login-box">
      <div className="overlay" onClick={hideAll}>
        <h1 className="text">Reset your password</h1>
        <div className="login-box" id="login-box" onClick={handleBoxClick}>
          <img src={logo} alt="Logo du site" className="logo" />
          <p>Enter your new password here</p>
          <input type="password" placeholder="Password" className="input" />
          <input
            type="passwordrepeat"
            placeholder="Repeat your password"
            className="input"
          />
          <button className="button login-button" onClick={hideAll}>
            Send
          </button>
          <p></p>
          <button className="forgot-button" onClick={showLogin}>
            Return to connection menu
          </button>
          
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
