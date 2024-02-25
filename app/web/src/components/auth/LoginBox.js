import React from "react";
import logo from "./logo.png";
import InputField from "./InputField";
import Button from "./Button";

const LoginBox = ({ onSignupClick }) => {
  const handleBoxClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="login-box" id="login-box" onClick={handleBoxClick}>
      <img src={logo} alt="Logo du site" className="logo" />
      <InputField type="text" placeholder="Username" />
      <InputField type="password" placeholder="Password" />
      <Button className="button login-button">Login</Button>
      <button className="forgot-button">
        I forgot my password. Click here to reset
      </button>
      <Button className="button register-button" onClick={onSignupClick}>
        Register New Account
      </Button>
      <p>or</p>
      <Button className="button login-button google-button">
        Sign in with google
      </Button>
    </div>
  );
};

export default LoginBox;
