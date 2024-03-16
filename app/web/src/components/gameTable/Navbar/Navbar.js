//react imports
import React, { useState } from "react";
import { useAuth, getUserInfo } from "./../../AuthProvider.jsx";
import { useWindowContext } from "../../WindowContext";

//css
import "./navbar.css";
//components
import ChipsCash from "./ChipsCash";
import Button from "../../button/Button.tsx";

const Navbar = ({
  profileOnClick,
  exitOnClick,
  settingsOnClick,
  isLoggedNavbar,
  logInOnClick,
  tutorialOnClick,
}) => {
  const { isLogged, logingIn, logingOut, getUserInfo } = useAuth();

  const { openWindow, closeWindow, isWindowOpen, windowType } =
    useWindowContext();

  return (
    <div className="container-nav">
      {/* Current Chips inventory and LogOut Button */}
      {isLogged && (
        <>
          <ChipsCash currentChips={9999999999} style={`box-chips`} />
          <Button label={"LogOut"} onClick={exitOnClick} style="btn-exit" />
        </>
      )}

      {/* Profile/LogIn Button */}

      <Button
        label={isLogged ? "Profile" : "LogIn"}
        onClick={() =>
            isLogged ? profileOnClick() : openWindow("login")
        }
        style={`${isLogged ? "btn-profile" : "btn-logIn"}`}
        iconStyle="icon-profile"
        iconSrc={require("./../../assets/images/icons/profile-icon.png")}
      />

      {/* Settings/Tutorial Buttons */}
      <Button
        label={isLogged ? "Settings" : "Tutorial"}
        onClick={() => isLogged ? settingsOnClick() : openWindow("tutorial")}
        style={`${isLogged ? "btn-settings" : "btn-tutorial"}`}
        iconStyle={`${isLogged ? "icon-settings" : "icon-tutorial"}`}
        iconSrc={
            isLogged
            ? require("./../../assets/images/icons/settings-icon.png")
            : require("./../../assets/images/icons/tutorial-icon.png")
        }
      />
    </div>
  );
};

export default Navbar;
