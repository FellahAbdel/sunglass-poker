// forgotPassword.jsx
import React from "react";
import Button from "../../button/Buttons";
import LogoComponent from "../../logo/Logo";
import TextInputComponent from "../../textInput/TextInput";
import Text from "../../text/Text";

const ForgotPassword = ({ openResetPassword, openLoginWindow }) => {
  return (
    <div className="box">
      <Text className="title" content="You forgot your password?" />
      <LogoComponent className="logoconnexion" />
      <Text className="littletext" content="Enter your account email here" />
      <TextInputComponent type="email" placeholder="Email" />
      <Button
        className="buttonconnexion button login-button"
        onClick={openResetPassword}
        label="Send"
      />
      <Button
        className="buttonconnexion forgot-button"
        onClick={openLoginWindow}
        label="Return to connection menu"
      />
    </div>
  );
};

export default ForgotPassword;
