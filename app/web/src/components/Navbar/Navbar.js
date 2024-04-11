//react imports
import React, { useState } from "react";

//css
import "./navbar.css";
//components
import ChipsCash from "./ChipsCash";
import Button from "../button/Button.tsx";
import TextInputComponent from "../textInput/TextInput.jsx";
import { useTranslation } from "../Utiles/Translations";
import { useAuth } from "../Utiles/AuthProvider";
import { useUserData } from "../Utiles/useUserData";
import { useWindowContext } from "../Utiles/WindowContext.jsx";

import AvatarDisplay from "../AvatarDisplay/AvatarDisplay.jsx";

const Navbar = ({}) => {
  const { user, isLogged,logingOut } = useAuth();
  const {isGameTableVisible,closeWindow,openWindow}= useWindowContext();
  const userData = useUserData();


  const handleLogOutButton = () => {
    logingOut();
    closeWindow();
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

  return (
    <div className="container-nav" onClick={handleClick}>
      {/* Current Chips inventory and LogOut Button */}
      {isLogged && (
        <>
          {isLogged && (
            <div className={`chatBox ${isChatOpen && "chatBoxOpen"}`}>
              {!isChatOpen && (
                <Button
                  label={getTranslatedWord("navbar.chat")}
                  onClick={handleChatOpen}
                />
              )}

              {isChatOpen && (
                <>
                  <img
                    className={"btn-chatClose"}
                    onClick={handleChatClose}
                    src={require("./../assets/images/icons/white/cross.png")}
                    style={{
                      opacity: isChatOpen ? "100" : "0",
                    }}
                    alt="exit-chat"
                  />
                  <TextInputComponent
                    name="Message"
                    value={handleNull}
                    onChange={handleNull}
                    placeholder={"Messages"}
                    styleClass={"input-chatBox"}
                  />
                </>
              )}
            </div>
          )}
          <ChipsCash
            currentChips={user?.coins}
            styleClass={`box-chips back-color3`}
          />
          <Button
            label={getTranslatedWord("navbar.exit")}
            onClick={handleLogOutButton}
            styleClass="btn-exit back-color3"
          />
        </>
      )}

      {/* Profile/LogIn Button 
      isLogged ? userData.user.avatar : 
      */}

      <Button
        label={
          isLogged
            ? getTranslatedWord("navbar.profile") 
            : getTranslatedWord("navbar.login")
        }
        onClick={() => (isLogged ? openWindow("profile") : openWindow("login"))}
        styleClass={`${
          isLogged ? "btn-profile back-color1" : "btn-logIn back-color2"
        }`}
        iconSrc={require("./../assets/images/icons/black/profile.png")}
      />

      {/* Settings/Tutorial Buttons */}
      <Button
        label={getTranslatedWord("navbar.tutorial")}
        onClick={() => openWindow("tutoriel")}
        styleClass={`${
          isLogged ? "btn-tutorial back-color2" : "btn-tutorial back-color3"
        }`}
        iconSrc={require("./../assets/images/icons/white/tutorial.png")}
      />
      <Button
        label={getTranslatedWord("navbar.settings")}
        onClick={() => openWindow("settings")}
        styleClass={`${
          isLogged ? "btn-settings back-color1" : "btn-settings back-color2"
        }`}
        iconSrc={require("./../assets/images/icons/white/settings.png")}
      />
    </div>
  );
};

export default Navbar;
