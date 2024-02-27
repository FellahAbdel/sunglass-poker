// forgotPassword.jsx
import React from "react";
import Button from "../../button/Buttons";
import LogoComponent from "../../logo/Logo";
import TextInputComponent from "../../textInput/TextInput";

const ResetPasswordWindow = ({ openLoginWindow }) => {
  return (
    <div className="box">
      <h1 className="text">Reset your password</h1>
      <LogoComponent className="logoconnexion"/>
      <p>Enter your new password here</p>
      <TextInputComponent type="password" placeholder="Password" />
      <TextInputComponent type="password" placeholder="Repeat your password" />
      <Button className="buttonconnexion button login-button" label="Send" />
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

export default ResetPasswordWindow;
