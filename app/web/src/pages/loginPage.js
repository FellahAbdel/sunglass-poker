// LoginPage.js
import React, { useState } from "react";
import Login from "../components/login/Login";
import SignUp from "../components/signup/Signup";
import ForgotPassword from "../components/forgotPassword/ForgotPassword";
import ResetPassword from "../components/resetPassword/ResetPassword";

const LoginPage = () => {
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [isSignUpVisible, setSignUpVisible] = useState(false);
  const [isForgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  const [isResetPasswordVisible, setResetPasswordVisible] = useState(false);

  const showLogin = () => {
    setLoginVisible(true);
    setSignUpVisible(false);
    setForgotPasswordVisible(false);
    setResetPasswordVisible(false);
  };

  const showSignUp = () => {
    setLoginVisible(false);
    setSignUpVisible(true);
    setForgotPasswordVisible(false);
    setResetPasswordVisible(false);
  };

  const showResetPassword = () => {
    setLoginVisible(false);
    setSignUpVisible(false);
    setForgotPasswordVisible(false);
    setResetPasswordVisible(true);
  };

  const showForgotPassword = () => {
    setLoginVisible(false);
    setSignUpVisible(false);
    setForgotPasswordVisible(true);
    setResetPasswordVisible(false);
  };

  const hideAll = () => {
    setLoginVisible(false);
    setSignUpVisible(false);
    setForgotPasswordVisible(false);
    setResetPasswordVisible(false);
  };


  return (
    <div>
      <button onClick={showSignUp}>Create an account</button>
      <button onClick={showLogin}>Login</button>
      <button onClick={showForgotPassword}>showForgotPassword</button>
      <button onClick={showResetPassword}>showResetPassword</button>
      {isSignUpVisible ? (
        <SignUp showLogin={showLogin} hideAll={hideAll} showForgotPassword={showForgotPassword} showResetPassword={showResetPassword} />
      ) : null}
      {isLoginVisible ? (
        <Login showSignUp={showSignUp} hideAll={hideAll} showForgotPassword={showForgotPassword} showResetPassword={showResetPassword}/>
      ) : null}
      {isForgotPasswordVisible ? (
        <ForgotPassword showLogin={showLogin} showSignUp={showSignUp} hideAll={hideAll} showForgotPassword={showForgotPassword} showResetPassword={showResetPassword}/>
      ) : null}
      {isResetPasswordVisible ? (
        <ResetPassword showLogin={showLogin} showSignUp={showSignUp} hideAll={hideAll} showForgotPassword={showForgotPassword} showResetPassword={showResetPassword}/>
      ) : null}
    </div>
  );
};

export default LoginPage;
