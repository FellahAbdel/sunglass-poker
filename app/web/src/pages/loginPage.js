// LoginPage.js
import React, { useState } from "react";
import Login from "../components/login/Login";
import SignUp from "../components/signup/Signup";

const LoginPage = () => {
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [isSignUpVisible, setSignUpVisible] = useState(false);

  const showLogin = () => {
    setLoginVisible(true);
    setSignUpVisible(false);
  };

  const hideLogin = () => {
    setLoginVisible(false);
  };

  const showSignUp = () => {
    setLoginVisible(false);
    setSignUpVisible(true);
  };

  const hideSignUp = () => {
    setSignUpVisible(false);
  };

  return (
    <div>
      <button onClick={showSignUp}>Create an account</button>
      <button onClick={showLogin}>Login</button>
      {isSignUpVisible ? (
        <SignUp showLogin={showLogin} hideSignUp={hideSignUp} />
      ) : null}
      {isLoginVisible ? (
        <Login showSignUp={showSignUp} hideLogin={hideLogin} />
      ) : null}
    </div>
  );
};

export default LoginPage;
