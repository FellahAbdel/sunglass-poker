//react imports
import React, { useState } from "react";

//css
import "./navbarV2.css";
//components
//import ChipsCash from "./ChipsCash";
import Button from "../button/Button.tsx";
import TextInputComponent from "../textInput/TextInput.jsx";
import { useTranslation } from "../Utiles/Translations";
import { useAuth } from "../Utiles/AuthProvider";
import { useWindowContext } from "../Utiles/WindowContext.jsx";
import { useUserData } from "../Utiles/useUserData.jsx";

const Navbar = ({}) => {
  const { isLogged, logingOut } = useAuth();
  const {
    isGameTableVisible,
    closeWindow,
    openWindow,
    showHome,
    windowType,
    isWindowOpen,
  } = useWindowContext();
  const { user } = useUserData();

  const handleLogOutButton = () => {
    console.log("handleLogOutButton :", windowType);
    console.log("isLogged :", isLogged);
    if (windowType === "accueil") {
      logingOut();
      closeWindow();
    } else if (windowType !== "") {
      closeWindow();
    } else if (isGameTableVisible) {
      openWindow("leaving_table");
      //showHome();
    } else {
      logingOut();
      closeWindow();
    }
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };
  const { getTranslatedWord } = useTranslation();

  const [isChatOpen, setisChatOpen] = useState(false);

  const handleChatOpen = () => {
    setisChatOpen(true);
  };

  const handleChatClose = () => {
    setisChatOpen(false);
  };

  const handleNull = () => {};

  let label;
  if (windowType === "accueil") {
    label = getTranslatedWord("navbar.logout");
  } else if (isWindowOpen) {
    label = getTranslatedWord("navbar.exit");
  } else {
    label = getTranslatedWord("navbar.exitTable");
  }

  return (
    <div className="container-nav-V2" onClick={handleClick}>
      {/* Current Chips inventory and LogOut Button */}
      {isLogged && (
        <div className="container-nav-lefttop">
          <div className={`chatBox-V2 ${isChatOpen && "chatBoxOpen-V2"}`}>
            {isGameTableVisible && (
              <>
                {!isChatOpen && (
                  <Button
                    label={""}
                    onClick={handleChatOpen}
                    iconSrc={require("./../assets/images/icons/white/chat.png")}
                  />
                )}

                {isChatOpen && (
                  <>
                    <img
                      className={"btn-chatClose-V2"}
                      onClick={handleChatClose}
                      src={require("./../assets/images/icons/white/cross.png")}
                      alt="exit-chat"
                    />
                    <TextInputComponent
                      name="Message"
                      value={handleNull}
                      onChange={handleNull}
                      placeholder={"Messages"}
                      styleClass={"input-chatBox-V2"}
                    />
                  </>
                )}
              </>
            )}
          </div>
          {/* {windowType === "shop" && <p  className={`box-chips-V2`}>{user.coins} SC</p>} */}
        </div>
      )}

      {/* Profile/LogIn Button 
      isLogged ? userData.user.avatar : 
      */}

      <div className="container-navMain-V2">
        {isLogged && (
          <Button
            label={
              isLogged
                ? getTranslatedWord("navbar.profile")
                : getTranslatedWord("navbar.login")
            }
            onClick={() =>
              isLogged ? openWindow("profile") : openWindow("login")
            }
            styleClass={`${isLogged ? "btn-profile-V2 " : "btn-logIn-V2 "}`}
            iconSrc={require("./../assets/images/icons/white/profile.png")}
          />
        )}

        <Button
          label={getTranslatedWord("navbar.settings")}
          onClick={() => openWindow("settings")}
          styleClass={`${isLogged ? "btn-settings-V2 " : "btn-settings-V2 "}`}
          iconSrc={require("./../assets/images/icons/white/settings.png")}
        />

        <Button
          label={getTranslatedWord("navbar.tutorial")}
          onClick={() => openWindow("tutorial")}
          styleClass={`${isLogged ? "btn-tutorial-V2 " : "btn-tutorial-V2 "}`}
          iconSrc={require("./../assets/images/icons/white/tutorial.png")}
        />
        {isLogged && (<>
          <Button
          label={getTranslatedWord("shop.shop")}
          onClick={() => openWindow("shop")}
          styleClass="btn-shop-V2"
          iconSrc={require("./../assets/images/icons/white/shop.png")}
          />
          <Button
            label={label}
            onClick={handleLogOutButton}
            styleClass="btn-exit-V2"
            iconSrc={require("./../assets/images/icons/white/exit.png")}
          />
        </>)}
      </div>
    </div>
  );
};

export default Navbar;