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
import SettingsWindow from "./WindowContent/SettingsWindow";
import ProfileWindow from "./WindowContent/ProfileWindow";
import AcceuilWindow from "./WindowContent/AcceuilWindow";
import StatsWindow from "./WindowContent/StatsWindow";

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
    <div className="component-login">
      <div className="login-box" onClick={() => handleBoxClick}>
        {windowType === "login" && <LoginWindow />}
        {windowType === "register" && <SignUpWindow />}
        {windowType === "forgot" && <ForgotPassword />}
        {windowType === "reset" && <ResetPasswordWindow />}
        {windowType === "success" && <SuccessWindow />}
        {windowType === "tutorial" && <TutorialWindow />}
        {windowType === "settings" && <SettingsWindow />}
        {windowType === "profil" && <ProfileWindow />}
        {windowType === "acceuil" && <AcceuilWindow />}
        {windowType === "stats" && <StatsWindow />}
      </div>
    </div>
  );
};

export default Window;
