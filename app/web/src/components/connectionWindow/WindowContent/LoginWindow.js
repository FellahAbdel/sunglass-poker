// LoginWindow.jsx
import React from "react";
import Button from "../../button/Buttons";
import LogoComponent from "../../logo/Logo";
import TextInputComponent from "../../textInput/TextInput";
import Text from "../../text/Text";

const LoginWindow = ({ openSignUpWindow, openForgotPassword }) => {
  return (
    <div className="box">
      <Text className="title" content= "Sign in to your account"/>
      <LogoComponent className="logoconnexion"/>
      <TextInputComponent placeholder="Username" />
      <TextInputComponent type="password" placeholder="Password" />
      <Button className="buttonconnexion login-button" label="Login" />
      <Button
        onClick={openForgotPassword}
        className="buttonconnexion forgot-button"
        label="I forgot my password. Click here to reset"
      />
      <p></p>
      <Button
        onClick={openSignUpWindow}
        className="buttonconnexion register-button"
        label="Register New Account"
      />
      <Text className="littletext" content= "or"/>
      <Button
        className="buttonconnexion login-button google-button"
        label="Sign in with google"
      />
    </div>
  );
};

export default LoginWindow;
