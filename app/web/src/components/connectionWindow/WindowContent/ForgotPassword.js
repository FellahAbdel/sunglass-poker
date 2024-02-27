// forgotPassword.jsx
import React from "react";
import Button from "../../button/Buttons";
import LogoComponent from "../../logo/Logo";
import TextInputComponent from "../../textInput/TextInput";

const ForgotPassword = ({ openResetPassword, openLoginWindow }) => {
  return (
    <div className="box">
      <h1 className="text">You forgot your password?</h1>
      <LogoComponent className="logoconnexion"/>
      <p>Enter your account email here</p>
      <TextInputComponent type="email" placeholder="Email" />
      <Button
        className="buttonconnexion button login-button"
        onClick={openResetPassword}
        label="Send"
      />
      <p></p>
      <Button
        className="buttonconnexion forgot-button"
        onClick={openLoginWindow}
        label="Return to connection menu"
      />
      <p></p>
    </div>
  );
};

export default ForgotPassword;
