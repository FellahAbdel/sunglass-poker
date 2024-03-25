//react imports
import React, { useState, useEffect } from "react";

//css
import "./navbar.css";
//components
import ChipsCash from "./ChipsCash";
import Button from "../button/Button.tsx";

const Navbar = ({
  profileOnClick,
  logOutOnClick,
  settingsOnClick,
  isLoggedNavbar,
  logInOnClick,
  tutorialOnClick,
}) => {
  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="container-nav" onClick={handleClick}>
      {/* Current Chips inventory and LogOut Button */}
      {isLoggedNavbar && (
        <>
          <ChipsCash currentChips={9999999999} style={`box-chips`} />
          <Button label={"LogOut"} onClick={logOutOnClick} style="btn-exit" />
        </>
      )}

      {/* Profile/LogIn Button */}

      <Button
        label={isLoggedNavbar ? "Profile" : "LogIn"}
        onClick={() => (isLoggedNavbar ? profileOnClick() : logInOnClick())}
        style={`${isLoggedNavbar ? "btn-profile" : "btn-logIn"}`}
        iconStyle="icon-profile"
        iconSrc={require("./../assets/images/icons/profile-icon.png")}
      />

      {/* Settings/Tutorial Buttons */}
      <Button
        label={isLoggedNavbar ? "Settings" : "Tutorial"}
        onClick={() => (isLoggedNavbar ? settingsOnClick() : tutorialOnClick())}
        style={`${isLoggedNavbar ? "btn-settings" : "btn-tutorial"}`}
        iconStyle={`${isLoggedNavbar ? "icon-settings" : "icon-tutorial"}`}
        iconSrc={
          isLoggedNavbar
            ? require("./../assets/images/icons/settings-icon.png")
            : require("./../assets/images/icons/tutorial-icon.png")
        }
      />
    </div>
  );
};

export default Navbar;
