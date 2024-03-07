// Window.jsx

import React, { useState, useEffect } from "react";
import "./window.css";
import { Link } from "react-router-dom";
import LoginWindow from "./WindowContent/LoginWindow";
import SignUpWindow from "./WindowContent/SignupWindow";
import ResetPasswordWindow from "./WindowContent/ResetPassword";
import ForgotPassword from "./WindowContent/ForgotPassword";
import SuccessWindow from "./WindowContent/SuccessWindow";

const Window = ({ onClose, windowType }) => {
  const [currentWindow, setWindowType] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

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

  const openSuccessWindow = (message) => {
    setWindowType("success");
    setSuccessMessage(message);
  };

  const handleBoxClick = (event) => {
    event.stopPropagation();
  };

  const handleSuccessClose = () => {
    setWindowType(null);
    setSuccessMessage("");
    onClose();
  };

  useEffect(() => {
    setWindowType(windowType);
  }, [windowType]);

  return (
    <div className="overlay" onClick={onClose}>
      <div className="login-box" id="login-box" onClick={handleBoxClick}>
        {currentWindow === "login" && (
          <LoginWindow
            openSignUpWindow={openSignUpWindow}
            openForgotPassword={openForgotPassword}
            showSuccess={openSuccessWindow}
          />
        )}
        {currentWindow === "signup" && (
          <SignUpWindow
            openLoginWindow={openLoginWindow}
            onClose={onClose}
            showSuccess={openSuccessWindow}
          />
        )}
        {currentWindow === "forgot" && (
          <ForgotPassword
            openLoginWindow={openLoginWindow}
            openResetPassword={openResetPassword}
            showSuccess={openSuccessWindow}
          />
        )}
        {currentWindow === "reset" && (
          <ResetPasswordWindow
            openLoginWindow={openLoginWindow}
            onClose={onClose}
          />
        )}
        {currentWindow === "success" && (
          <SuccessWindow
            message={successMessage}
            onClose={handleSuccessClose}
          />
        )}
      </div>
    </div>
  );
};

export default Window;
