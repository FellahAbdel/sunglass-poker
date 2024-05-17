// React imports
import React, { useState } from "react";
// CSS file for styling
import "./navbarV3.css";
// Reusable components
import Button from "../button/Button.tsx";
import TextInputComponent from "../textInput/TextInput.jsx";
// Custom hooks for translations, authentication, and context management
import { useTranslation } from "../Utiles/Translations";
import { useAuth } from "../Utiles/AuthProvider";
import { useWindowContext } from "../Utiles/WindowContext.jsx";
import { useGameTable } from "../Utiles/GameTableProvider.jsx";
// Redux actions and hooks
import * as actions from "../../store/actions/clientInteractionsCreator.js";
// Import useSelector en haut avec les autres imports
import { useDispatch, useSelector } from "react-redux";

const Navbar = ({}) => {
  const { isLogged, logingOut, user } = useAuth();
  console.log("User in Navbar:", user); // Ajoutez ce log pour vérifier le contenu de user
  const { gameState } = useGameTable();
  const dispatch = useDispatch();
  // Local state for chat open/close and message input
  const [newMessage, setNewMessage] = useState("");

  // Handling leaving the room, with additional game state checks
  const handleleaveRoom = () => {
    if (gameState === "active") {
      dispatch(actions.fold()); // Forces a fold if game is active
    }
    dispatch(actions.leaveRoom());
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const messageData = {
        message: newMessage,
        sender: user.pseudo, // Inclure le pseudo de l'utilisateur
      };
      dispatch(actions.sendMessage(messageData));
      setNewMessage("");
    }
  };

  // Context and utilities for UI control
  const {
    isGameTableVisible,
    closeWindow,
    openWindow,
    showHome,
    windowType,
    isWindowOpen,
  } = useWindowContext();

  // Controls for user logout
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

  // Prevents propagation of click events
  const handleClick = (e) => {
    e.stopPropagation();
  };

  // Localization
  const { getTranslatedWord } = useTranslation();

  // Toggle chat visibility
  const [isChatOpen, setisChatOpen] = useState(false);

  const handleChatOpen = () => {
    setisChatOpen(true);
  };

  const handleChatClose = () => {
    setisChatOpen(false);
  };
  const messages = useSelector((state) => state.chat.messages);
  console.log("Messages in Navbar:", messages); // Vérifiez ici si les messages contiennent l'expéditeur

  // Determine the label based on the context
  let label;
  if (windowType === "accueil") {
    label = getTranslatedWord("navbar.logout");
  } else if (isWindowOpen) {
    label = getTranslatedWord("navbar.exit");
  } else {
    label = getTranslatedWord("navbar.exitTable");
  }

  // Main component return
  return (
    <div className="container-nav-V2" onClick={handleClick}>
      {isLogged && (
        <div className="container-nav-lefttop">
          {isGameTableVisible && (
            <div className={`chatBox-V2 ${isChatOpen ? "chatBoxOpen-V2" : ""}`}>
              {!isChatOpen && (
                <Button
                  label={""}
                  onClick={handleChatOpen}
                  iconSrc={"static/media/assets/images/icons/white/chat.png"}
                />
              )}

              {isChatOpen && (
                <>
                  <img
                    className="btn-chatClose-V2"
                    onClick={handleChatClose}
                    src={"static/media/assets/images/icons/white/cross.png"}
                    alt="exit-chat"
                  />
                  {/* liste des messages */}
                  {/* Mise à jour des messages pour inclure la classe CSS conditionnelle */}
                  <div className="message-list">
                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`message ${
                          msg.sender === user.pseudo
                            ? "own-message"
                            : "other-message"
                        }`}
                      >
                        <strong>{msg.sender}: </strong> {msg.message}
                      </div>
                    ))}
                  </div>
                  {/* formulaire d'envoi de message */}
                  <div className="chat-input">
                    <input
                      type="text"
                      name="Message"
                      placeholder="Messages"
                      className="text-input-1"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />

                    <Button
                      label={"Send"}
                      onClick={handleSendMessage}
                      styleClass="send-message-button"
                      iconSrc={
                        "static/media/assets/images/icons/white/return.png"
                      } // Assurez-vous d'avoir une icône d'envoi
                    />
                  </div>
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
              iconSrc={"static/media/assets/images/icons/white/profile.png"}
            />
            <Button
              label={getTranslatedWord("navbar.ranking")}
              onClick={() => openWindow("ranking")}
              styleClass={`${
                isLogged ? "btn-tutorial-V2 " : "btn-tutorial-V2 "
              }`}
              iconSrc={"static/media/assets/images/icons/white/ranking.png"}
            />
          </>
        )}
        <Button
          label={getTranslatedWord("navbar.settings")}
          onClick={() => openWindow("settings")}
          styleClass="btn-settings-V2"
          iconSrc={"static/media/assets/images/icons/white/settings.png"}
        />
        {isLogged && !isGameTableVisible && (
          <Button
            label={getTranslatedWord("shop.shop")}
            onClick={() => openWindow("shop")}
            styleClass="btn-shop-V2"
            iconSrc={"static/media/assets/images/icons/white/shop.png"}
          />
        )}
        <Button
          label={getTranslatedWord("navbar.tutorial")}
          onClick={() => openWindow("tutorial")}
          styleClass="btn-tutorial-V2"
          iconSrc={"static/media/assets/images/icons/white/tutorial.png"}
        />
        {isLogged && (
          <Button
            label={label}
            onClick={handleLogOutButton}
            styleClass="btn-exit-V2"
            iconSrc={"static/media/assets/images/icons/white/exit.png"}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
