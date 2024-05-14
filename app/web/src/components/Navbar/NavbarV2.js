//react imports
import React, { useState } from "react";
//css
import "./navbarV2.css";
//components
import Button from "../button/Button.tsx";
import TextInputComponent from "../textInput/TextInput.jsx";
import { useTranslation } from "../Utiles/Translations";
import { useAuth } from "../Utiles/AuthProvider";
import { useWindowContext } from "../Utiles/WindowContext.jsx";
import * as actions from "../../store/actions/clientInteractionsCreator.js";
import { useDispatch } from "react-redux";
import { useGameTable } from "../Utiles/GameTableProvider.jsx";

const Navbar = ({}) => {
  const { isLogged, logingOut } = useAuth();
  const { gameState } = useGameTable();

  const dispatch = useDispatch();

  const handleleaveRoom = () => {
    // si le jeu est en cours
    if (gameState === "active") {
      // On le force à fold.
      dispatch(actions.fold());
    }

    dispatch(actions.leaveRoom());
  };

  const {
    isGameTableVisible,
    closeWindow,
    openWindow,
    showHome,
    windowType,
    isWindowOpen,
  } = useWindowContext();

  const handleLogOutButton = () => {
    console.log("handleLogOutButton :", windowType);
    console.log("isLogged :", isLogged);
    if (windowType === "accueil") {
      console.log("Open log out alert");
      openWindow("alert", {
        message: "alert.logout",
        onConfirm: () => {
          console.log("User confirms log out");

          logingOut();
          showHome();
        },
        onCancel: () => {
          console.log("User cancels log out");
          closeWindow();
        },
      });
    } else if (windowType !== "") {
      closeWindow();
    } else if (isGameTableVisible) {
      console.log("Open leaving table alert");
      openWindow("alert", {
        message: "alert.confirmExitMessage",
        onConfirm: () => {
          console.log("L'utilisateur quitte la table");
          handleleaveRoom();
          showHome();
        },
        onCancel: () => {
          closeWindow();
          console.log("L'utilisateur a choisi de rester sur la table");
        },
      });
    } else {
      console.log("Open log out alert");
      openWindow("alert", {
        message: "alert.logout",
        onConfirm: () => {
          console.log("User confirms log out");
          logingOut();
          showHome();
        },
        onCancel: () => {
          console.log("User cancels log out");
          closeWindow();
        },
      });
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
          
            {isGameTableVisible && (
              <div className={`chatBox-V2 ${isChatOpen && "chatBoxOpen-V2"}`}>
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
              </div>
            )}
          </div>
      )}

      <div className="container-navMain-V2">
        {isLogged && (
          <>
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
            <Button
              label={getTranslatedWord("navbar.ranking")}
              onClick={() => openWindow("ranking")}
              styleClass={`${
                isLogged ? "btn-tutorial-V2 " : "btn-tutorial-V2 "
              }`}
              iconSrc={require("./../assets/images/icons/white/ranking.png")}
            />
          </>
        )}

        <Button
          label={getTranslatedWord("navbar.settings")}
          onClick={() => openWindow("settings")}
          styleClass={`${isLogged ? "btn-settings-V2 " : "btn-settings-V2 "}`}
          iconSrc={require("./../assets/images/icons/white/settings.png")}
        />

        {isLogged && !isGameTableVisible && (
          <Button
            label={getTranslatedWord("shop.shop")}
            onClick={() => openWindow("shop")}
            styleClass="btn-shop-V2"
            iconSrc={require("./../assets/images/icons/white/shop.png")}
          />
        )}
        <Button
          label={getTranslatedWord("navbar.tutorial")}
          onClick={() => openWindow("tutorial")}
          styleClass={`${isLogged ? "btn-tutorial-V2 " : "btn-tutorial-V2 "}`}
          iconSrc={require("./../assets/images/icons/white/tutorial.png")}
        />

        {isLogged && (
          <Button
            label={label}
            onClick={handleLogOutButton}
            styleClass="btn-exit-V2"
            iconSrc={require("./../assets/images/icons/white/exit.png")}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
