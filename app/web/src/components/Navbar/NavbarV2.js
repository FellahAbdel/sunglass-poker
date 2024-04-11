//react imports
import React, { useState } from "react";

//css
import "./navbarV2.css";
//components
import ChipsCash from "./ChipsCash";
import Button from "../button/Button.tsx";
import TextInputComponent from "../textInput/TextInput.jsx";
import { useTranslation } from "../Utiles/Translations";
import { useAuth } from "../Utiles/AuthProvider";
import { useUserData } from "../Utiles/useUserData";
import { useWindowContext } from "../Utiles/WindowContext.jsx";


const Navbar = ({}) => {
  const { user, isLogged,logingOut } = useAuth();
  const {isGameTableVisible,closeWindow,openWindow} = useWindowContext();
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
    <div className="container-nav-V2" onClick={handleClick}>
      {/* Current Chips inventory and LogOut Button */}
      {isLogged && (
        <>
          <div className={`chatBox-V2 ${isChatOpen && "chatBoxOpen-V2"}`}>
            {isGameTableVisible && <>
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
            </>}
            </div>
        
          {/* <ChipsCash
            // currentChips={user?.coins}
            currentChips={99999999}
            styleClass={`box-chips-V2 `}
          /> */}

        </>
      )}

      {/* Profile/LogIn Button 
      isLogged ? userData.user.avatar : 
      */}

      <div className="container-navMain-V2">
        {isLogged &&
        <Button
          label={isLogged
            ? getTranslatedWord("navbar.profile") 
            : getTranslatedWord("navbar.login")}
          onClick={() => (isLogged ? openWindow("profile") :openWindow("login"))}
          styleClass={`${
            isLogged ? "btn-profile-V2 " : "btn-logIn-V2 "
          }`}
          iconSrc={require("./../assets/images/icons/white/profile.png")}
        />}


        <Button
          label={getTranslatedWord("navbar.settings")}
          onClick={() => openWindow("settings")}
          styleClass={`${
            isLogged ? "btn-settings-V2 " : "btn-settings-V2 "
          }`}
          iconSrc={require("./../assets/images/icons/white/settings.png")}
        />

        <Button
          label={getTranslatedWord("navbar.tutorial")}
          onClick={() => openWindow("tutorial")}
          styleClass={`${
            isLogged ? "btn-tutorial-V2 " : "btn-tutorial-V2 "
          }`}
          iconSrc={require("./../assets/images/icons/white/tutorial.png")}
        />
        {isLogged && 
        <Button
          label={getTranslatedWord("navbar.exit")}
          onClick={handleLogOutButton}
          styleClass="btn-exit-V2"
          iconSrc={require("./../assets/images/icons/white/exit.png")}
        />
      }
      </div>
    </div>
  );
};

export default Navbar;
