// forgotPassword.jsx
import React from "react";
import Button from "../../button/buttons";
import LogoComponent from "../../logo/logo";
import TextInputComponent from "../../textInput/TextInput";

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
