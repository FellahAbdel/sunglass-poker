// forgotPassword.jsx
import React from "react";
import Button from "../../button/Buttons";
import LogoComponent from "../../logo/Logo";
import TextInputComponent from "../../textInput/TextInput";
import Text from "../../text/Text";

const ResetPasswordWindow = ({ openLoginWindow }) => {
  return (
    <div className="box">
      <Text className="title" content= "Reset your password"/>
      <LogoComponent className="logoconnexion"/>
      <Text className="littletext" content= "Enter your new password here"/>
      <TextInputComponent type="password" placeholder="Password" />
      <TextInputComponent type="password" placeholder="Repeat your password" />
      <Button className="buttonconnexion button login-button" label="Send" />
      <Button
        className="buttonconnexion forgot-button"
        onClick={openLoginWindow}
        label="Return to connection menu"
      />
    </div>
  );
};

export default ResetPasswordWindow;
