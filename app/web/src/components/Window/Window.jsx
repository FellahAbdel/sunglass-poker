// Window.jsx

import React from "react";
import "./window.css";
import LoginWindow from "./WindowContent/connectionWindows/LoginWindow";
import SignUpWindow from "./WindowContent/connectionWindows/SignupWindow";
import ResetPasswordWindow from "./WindowContent/connectionWindows/ResetPassword";
import ForgotPassword from "./WindowContent/connectionWindows/ForgotPassword";
import SuccessWindow from "./WindowContent/SuccessWindow";
import TutorialWindow from "./WindowContent/TutorialWindow";
import SettingsWindow from "./WindowContent/SettingsWindow";
import ProfileWindow from "./WindowContent/ProfileWindow";
import StatsWindow from "./WindowContent/StatsWindow";
import ServerPanelWindow from "./WindowContent/ServerPanel";
import CreateTableWindow from "./WindowContent/CreateTableWindow";
import ShopWindow from "./WindowContent/shopWindows/ShopWindow";
import ValidationWindow from "./WindowContent/shopWindows/ValidationWindow";
import AcceuilWindow from "./WindowContent/Acceuil";
import AlertWindow from "./WindowContent/AlertWindow";

import { useWindowContext } from "../Utiles/WindowContext";

const Window = () => {
  const { windowType, isGameTableVisible } = useWindowContext();

  const handleWindowClick = (event) => {
    event.stopPropagation();
  };

  const handleBoxClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="component-login" onClick={handleWindowClick}>
      <div className="login-box" onClick={() => handleBoxClick}>
        {windowType === "login" && <LoginWindow />}
        {windowType === "register" && <SignUpWindow />}
        {windowType === "forgot" && <ForgotPassword />}
        {windowType === "reset" && <ResetPasswordWindow />}
        {windowType === "success" && <SuccessWindow />}
        {windowType === "tutorial" && <TutorialWindow />}
        {windowType === "settings" && <SettingsWindow />}
        {windowType === "profile" && <ProfileWindow />}
        {windowType === "stats" && <StatsWindow />}
        {windowType === "servers" && <ServerPanelWindow />}
        {windowType === "create_table" && <CreateTableWindow />}
        {windowType === "shop" && <ShopWindow />}
        {windowType === "validation" && <ValidationWindow />}
        {(windowType==="" && !isGameTableVisible) && <AcceuilWindow />}
        {windowType === "alert" && <AlertWindow />}
      </div>
    </div>
  );
};

export default Window;
