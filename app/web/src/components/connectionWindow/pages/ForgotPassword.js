// forgotPassword.jsx
import React from "react";
import Button from "./buttonComponent/buttons";
import LogoComponent from "./logoComponent/logo";
import TextInputComponent from "./textInputComponent/TextInput";

const ForgotPassword = ({ openResetPassword, openLoginWindow }) => {
  return (
    <div className="box">
      <h1 className="text">You forgot your password?</h1>
      <LogoComponent />
      <p>Enter your account email here</p>
      <TextInputComponent type="email" placeholder="Email" />
      <Button
        className="button login-button"
        onClick={openResetPassword}
        label="Send"
      />
      <p></p>
      <Button
        className="forgot-button"
        onClick={openLoginWindow}
        label="Return to connection menu"
      />
      <p></p>
    </div>
  );
};

export default ForgotPassword;
