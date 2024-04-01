// Window.jsx

import React from "react";
import "./window.css";
import LoginWindow from "./WindowContent/LoginWindow";
import SignUpWindow from "./WindowContent/SignupWindow";
import ResetPasswordWindow from "./WindowContent/ResetPassword";
import ForgotPassword from "./WindowContent/ForgotPassword";
import SuccessWindow from "./WindowContent/SuccessWindow";
import TutorialWindow from "./WindowContent/TutorialWindow";
import SettingsWindow from "./WindowContent/SettingsWindow";
import ProfileWindow from "./WindowContent/ProfileWindow";
import StatsWindow from "./WindowContent/StatsWindow";
import ListTableWindow from "./WindowContent/ListTableWindow";
import CreateTableWindow from "./WindowContent/CreateTableWindow";


import { useWindowContext } from "../Utiles/WindowContext";

const Window = () => {
  const { windowType } = useWindowContext();

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
        {windowType === "list_table" && <ListTableWindow />}
        {windowType === "create_table" && <CreateTableWindow />}
        
      </div>
    </div>
  );
};

export default Window;
