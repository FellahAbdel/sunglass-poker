//react imports
import React from "react";

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
          <Button label={"Chat"} onClick={null} styleClass="btn-chat" />
          <ChipsCash currentChips={9999999999} styleClass={`box-chips`} />
          <Button label={"LogOut"} onClick={logOutOnClick} styleClass="btn-exit" />
        </>
      )}

      {/* Profile/LogIn Button */}

      <Button
        label={isLoggedNavbar ? "Profile" : "LogIn"}
        onClick={() => (isLoggedNavbar ? profileOnClick() : logInOnClick())}
        styleClass={`${isLoggedNavbar ? "btn-profile" : "btn-logIn"}`}
        iconSrc={require("./../assets/images/icons/black/profile.png")}
      />

      {/* Settings/Tutorial Buttons */}
      <Button
        label={isLoggedNavbar ? "Settings" : "Tutorial"}
        onClick={() => (isLoggedNavbar ? settingsOnClick() : tutorialOnClick())}
        styleClass={`${isLoggedNavbar ? "btn-settings" : "btn-tutorial"}`}
        iconSrc={
          isLoggedNavbar
            ? require("./../assets/images/icons/white/settings.png")
            : require("./../assets/images/icons/white/tutorial.png")
        }
      />
    </div>
  );
};

export default Navbar;
