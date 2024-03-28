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
