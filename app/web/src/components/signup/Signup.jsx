// SignUp.js
import React, { useState } from "react";
import logo from "./logo.png";
import "./signup.css"; // Import CSS file

const SignUp = ({ showLogin, hideSignUp }) => {
  const handleBoxClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="container" id="login-box">
      <div className="overlay" onClick={hideSignUp}>
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
          <p>Already have an account ?</p>
          <button className="button register-button" onClick={showLogin}>
            Login
          </button>
          <p>or</p>
          <button className="button login-button google-button">
            Register with google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
