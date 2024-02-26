// forgotPassword.jsx
import React from "react";
import Button from "./buttonComponent/buttons";
import LogoComponent from "./logoComponent/logo";
import TextInputComponent from "./textInputComponent/TextInput";

const ResetPasswordWindow = ({ openLoginWindow }) => {
  return (
    <div className="box">
      <h1 className="text">Reset your password</h1>
      <LogoComponent />
      <p>Enter your new password here</p>
      <TextInputComponent type="password" placeholder="Password" />
      <TextInputComponent type="password" placeholder="Repeat your password" />
      <Button className="button login-button" label="Send" />
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

export default ResetPasswordWindow;
