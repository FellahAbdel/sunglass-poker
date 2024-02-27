// Window.jsx

import React, { useState, useEffect } from "react";
import "./window.css";
import { Link } from "react-router-dom";
import LoginWindow from "./WindowContent/LoginWindow";
import SignUpWindow from "./WindowContent/SignupWindow";
import ResetPasswordWindow from "./WindowContent/ResetPassword";
import ForgotPassword from "./WindowContent/ForgotPassword";

const Window = ({ onClose, windowType }) => {
  const [currentWindow, setWindowType] = useState(null);

  useEffect(() => {
    setWindowType(windowType);
  }, [windowType]);

  const openLoginWindow = () => {
    setWindowType("login");
  };

  const openSignUpWindow = () => {
    setWindowType("signup");
  };

  const openForgotPassword = () => {
    setWindowType("forgot");
  };

  const openResetPassword = () => {
    setWindowType("reset");
  };

  const handleBoxClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="login-box" id="login-box" onClick={handleBoxClick}>
        {currentWindow === "login" && (
          <LoginWindow
            openSignUpWindow={openSignUpWindow}
            openForgotPassword={openForgotPassword}
          />
        )}
        {currentWindow === "signup" && (
          <SignUpWindow openLoginWindow={openLoginWindow} />
        )}
        {currentWindow === "forgot" && (
          <ForgotPassword
            openLoginWindow={openLoginWindow}
            openResetPassword={openResetPassword}
          />
        )}
        {currentWindow === "reset" && (
          <ResetPasswordWindow openLoginWindow={openLoginWindow} />
        )}
      </div>
    </div>
  );
};

export default Window;
