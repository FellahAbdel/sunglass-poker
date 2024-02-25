import React from "react";
import { Link } from "react-router-dom";
import "../login.css";
import logo from "../logo.png";
import InputField from "../InputField";
import Button from "../Button";

const Signup = ({ onClose, onLoginClick }) => {
  const handleBoxClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="container" id="login-box">
      <div className="overlay" onClick={onClose}>
        <h1 className="text">Create your account</h1>
        <div className="login-box" id="login-box" onClick={handleBoxClick}>
          <img src={logo} alt="Logo du site" className="logo" />
          <InputField type="text" placeholder="Username" />
          <InputField type="email" placeholder="Email" />
          <InputField type="password" placeholder="Password" />
          <InputField type="password" placeholder="Repeat your password" />
          <Button className="button login-button">Register</Button>
          <p>Already have an account ?</p>
          <Button className="button register-button" onClick={onLoginClick}>
            Login
          </Button>
          <p>or</p>
          <Button className="button login-button google-button">
            Register with google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
