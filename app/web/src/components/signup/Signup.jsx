// SignUp.js
import React, { useState } from "react";
import logo from "./logo.png";
import "./signup.css"; // Import CSS file

const SignUp = ({
  showLogin,
  hideAll,
  showForgotPassword,
  showResetPassword,
}) => {
  const handleBoxClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="container" id="login-box">
      <div className="overlay" onClick={hideAll}>
        <h1 className="text">Create your account</h1>
        <div className="login-box" id="login-box" onClick={handleBoxClick}>
          <img src={logo} alt="Logo du site" className="logo" />
          <input type="text" placeholder="Username" className="input" />
          <input type="email" placeholder="Email" className="input" />
          <input type="password" placeholder="Password" className="input" />
          <input
            type="passwordrepeat"
            placeholder="Repeat your password"
            className="input"
          />
          <button className="button login-button">Register</button>
          <p></p>
          <button className="button login-button google-button">
            Register with google
          </button>
          <p> </p>
          <button className="forgot-button" onClick={showLogin}>
            Already have an account ?
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
