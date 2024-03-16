// Window.jsx

import React, { useState, useEffect } from "react";
import "./window.css";
import LoginWindow from "./WindowContent/LoginWindow";
import SignUpWindow from "./WindowContent/SignupWindow";
import ResetPasswordWindow from "./WindowContent/ResetPassword";
import ForgotPassword from "./WindowContent/ForgotPassword";
import SuccessWindow from "./WindowContent/SuccessWindow";
import AvatarWindow from "./WindowContent/AvatarWindow";
import TutorialWindow from "./WindowContent/TutorialWindow";

import { useWindowContext } from "../WindowContext";

const Window = ({ onClose, logingIn }) => {
  const {
    closeWindow,
    isWindowOpen,
    windowType,
    openSuccessWindow,
    openWindow,
  } = useWindowContext();

  const [successMessage, setSuccessMessage] = useState("");

  const handleBoxClick = (event) => {
    event.stopPropagation();
  };

  const handleSuccessClose = () => {
    setSuccessMessage("");
    onClose();
  };

  return (
    <div className="component-login" onClick={() => closeWindow()}>
      <div className="login-box" onClick={() =>handleBoxClick}>
        {windowType === "login" && (
          <LoginWindow
            showSuccess={(message) => {
              setSuccessMessage(message);
              openSuccessWindow();
            }}
            logingIn={logingIn}
          />
        )}
        {windowType === "register" && (
          <SignUpWindow
            onClose={onClose}
            showSuccess={(message) => {
              setSuccessMessage(message);
              openSuccessWindow();
            }}
          />
        )}
        {windowType === "forgot" && (
          <ForgotPassword
            showSuccess={(message) => {
              setSuccessMessage(message);
              openSuccessWindow();
            }}
          />
        )}
        {windowType === "reset" && (
          <ResetPasswordWindow
            showSuccess={(message) => {
              setSuccessMessage(message);
              openSuccessWindow();
            }}
            onClose={onClose}
          />
        )}
        {windowType === "success" && (
          <SuccessWindow
            message={successMessage}
            onClose={handleSuccessClose}
          />
        )}
        {windowType === "avatar" && (
          <AvatarWindow onClose={handleSuccessClose} />
        )}
        {windowType === "tutorial" && (
          <TutorialWindow onClose={handleSuccessClose} />
        )}
      </div>
    </div>
  );
};

export default Window;
