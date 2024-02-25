// forgotPassword.jsx
import React, { useState } from "react";
import logo from "../login/logo.png";
import "./forgotPassword.css"; // Import CSS file

const ForgotPassword = ({
  showLogin,
  showSignUp,
  hideAll,
  showForgotPassword,
  showResetPassword,
}) => {
  // Component code
  const handleBoxClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="container" id="login-box">
      <div className="overlay" onClick={hideAll}>
        <h1 className="text">You forgot your password ? </h1>
        <div className="login-box" id="login-box" onClick={handleBoxClick}>
          <img src={logo} alt="Logo du site" className="logo" />
          <p>Enter your account email here</p>
          <input type="email" placeholder="Email" className="input" />
          <button className="button login-button" onClick={showResetPassword}>
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

export default ForgotPassword;
