// Window.jsx

import React from "react";
import "./window.css";
import LoginWindow from "./WindowContent/connectionWindows/LoginWindow";
import SignUpWindow from "./WindowContent/connectionWindows/SignupWindow";
import ResetPasswordWindow from "./WindowContent/connectionWindows/ResetPassword";
import ForgotPassword from "./WindowContent/connectionWindows/ForgotPassword";
import ValidationCodeWindow from "./WindowContent/connectionWindows/Validation";
import SuccessWindow from "./WindowContent/SuccessWindow";
import TutorialWindow from "./WindowContent/TutorialWindow";
import SettingsWindow from "./WindowContent/SettingsWindow";
import ProfileWindow from "./WindowContent/ProfileWindow";
import ServerPanelWindow from "./WindowContent/ServerPanel";
import CreateTableWindow from "./WindowContent/CreateTableWindow";
import ShopWindow from "./WindowContent/shopWindows/ShopWindow";
import BuyCoinsWindow from "./WindowContent/shopWindows/BuyCoins";
import ValidationWindow from "./WindowContent/shopWindows/ValidationWindow";
import AcceuilWindow from "./WindowContent/AcceuilWindow";
import AlertWindow from "./WindowContent/AlertWindow";
import RankingWindow from "./WindowContent/RankingWindow";
import LoadingWindow from "./WindowContent/LoadingWindow";

import { useWindowContext } from "../Utiles/WindowContext";

/**
 * The Window component acts as a container for various modal windows in the application.
 * It renders different content based on the current window type from the context.
 */
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
        {windowType === "servers" && <ServerPanelWindow />}
        {windowType === "create_table" && <CreateTableWindow />}
        {windowType === "shop" && <ShopWindow />}
        {windowType === "validation" && <ValidationWindow />}
        {windowType === "" && !isGameTableVisible && <AcceuilWindow />}
        {windowType === "alert" && <AlertWindow />}
        {windowType === "ranking" && <RankingWindow />}
        {windowType === "coins" && <BuyCoinsWindow />}
        {windowType === "loading" && <LoadingWindow />}
        {windowType === "validationCode" && <ValidationCodeWindow/>}
      </div>
    </div>
  );
};

export default Window;
