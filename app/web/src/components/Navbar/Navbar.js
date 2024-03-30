//react imports
import React, {useState} from "react";

//css
import "./navbar.css";
//components
import ChipsCash from "./ChipsCash";
import Button from "../button/Button.tsx";
import TextInputComponent from "../textInput/TextInput.jsx";

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


  const [isChatOpen, setisChatOpen] = useState(false);

  const handleChatOpen = () => {
    setisChatOpen(true);
  };

  const handleChatClose = () => {
    setisChatOpen(false);
  };

  const handleNull = () => {

  }

  return (
    <div className="container-nav" onClick={handleClick}>
      {/* Current Chips inventory and LogOut Button */}
      {isLoggedNavbar && (
        <>
        {isLoggedNavbar && 
          <div  className={`chatBox ${isChatOpen && "chatBoxOpen"}`} >
            
            {!isChatOpen && 
            <Button
              label={"Chat"}
              onClick={handleChatOpen}
              style={{}}
            />}

            {isChatOpen && (<>
              <img
                className={"btn-chatClose"}
                onClick={handleChatClose}
                src={require("./../assets/images/icons/white/cross.png")}
                style={{
                  opacity: isChatOpen ? '100' : '0',
                }}
                />
                <TextInputComponent 
                  name="Message"
                  value={handleNull}
                  onChange={handleNull}
                  placeholder={"Message"}
                  styleClass={"input-chatBox"}
                />

                </>)}
          </div>}
          <ChipsCash currentChips={9999999999} styleClass={`box-chips back-color3`} />
          <Button label={"Exit"} onClick={logOutOnClick} styleClass="btn-exit back-color3" />
        </>
      )}

      {/* Profile/LogIn Button */}

      <Button
        label={isLoggedNavbar ? "Profile" : "LogIn"}
        onClick={() => (isLoggedNavbar ? profileOnClick() : logInOnClick())}
        styleClass={`${isLoggedNavbar ? "btn-profile back-color1" : "btn-logIn back-color2"}`}
        iconSrc={require("./../assets/images/icons/black/profile.png")}
      />

      {/* Settings/Tutorial Buttons */}
      <Button
        label={"Tutorial"}
        onClick={() => (tutorialOnClick())}
        styleClass={`${isLoggedNavbar ? "btn-tutorial back-color2" : "btn-tutorial back-color3"}`}
        iconSrc={require("./../assets/images/icons/white/tutorial.png")}
      />
      <Button
        label={"Settings"}
        onClick={() => (settingsOnClick())}
        styleClass={`${isLoggedNavbar ? "btn-settings back-color1" : "btn-settings back-color2"}`}
        iconSrc={require("./../assets/images/icons/white/settings.png")}
      />

    </div>
  );
};

export default Navbar;
