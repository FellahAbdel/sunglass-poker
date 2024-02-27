// LoginWindow.jsx
import React from "react";
import Button from "./buttonComponent/buttons";
import LogoComponent from "./logoComponent/logo";
import TextInputComponent from "./textInputComponent/TextInput";

const LoginWindow = ({ openSignUpWindow, openForgotPassword }) => {
  return (
    <div className="box">
      <h1 className="text">Sign in to your account</h1>
      <LogoComponent />
      <TextInputComponent placeholder="Username" />
      <TextInputComponent type="password" placeholder="Password" />
      <Button className="login-button" label="Login" />
      <Button
        onClick={openForgotPassword}
        className="forgot-button"
        label="I forgot my password. Click here to reset"
      />
      <p></p>
      <Button
        onClick={openSignUpWindow}
        className="register-button"
        label="Register New Account"
      />
      <p>or</p>
      <Button
        className="login-button google-button"
        label="Sign in with google"
      />
    </div>
  );
};

export default LoginWindow;
