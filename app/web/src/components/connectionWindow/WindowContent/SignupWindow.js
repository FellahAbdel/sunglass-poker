// forgotPassword.jsx
import React from "react";
import Button from "../../button/Buttons";
import LogoComponent from "../../logo/Logo";
import TextInputComponent from "../../textInput/TextInput";

const SignUpWindow = ({ openLoginWindow }) => {
  return (
    <div className="box">
      <h1 className="text">Create your account</h1>
      <LogoComponent className="logoconnexion"/>
      <TextInputComponent placeholder="Username" />
      <TextInputComponent type="email" placeholder="Email" />
      <TextInputComponent type="password" placeholder="Password" />
      <TextInputComponent type="password" placeholder="Repeat your password" />
      <Button className="buttonconnexion login-button" label="Register" />
      <p></p>
      <Button
        className="buttonconnexion login-button google-button"
        label="Register with google"
      />
      <p> </p>
      <Button
        onClick={openLoginWindow}
        className="buttonconnexion forgot-button"
        label="Already have an account ?"
      />
    </div>
  );
};

export default SignUpWindow;
