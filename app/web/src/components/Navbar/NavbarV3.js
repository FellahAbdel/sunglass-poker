// react imports
import React, { useState } from "react";

// css
import "./navbarV3.css";
// components
import Button from "../button/Button.tsx";
import TextInputComponent from "../textInput/TextInput.jsx";
import { useTranslation } from "../Utiles/Translations";
import { useAuth } from "../Utiles/AuthProvider";
import { useWindowContext } from "../Utiles/WindowContext.jsx";
import { useUserData } from "../Utiles/useUserData.jsx";
import * as actions from "../../store/actions/clientInteractionsCreator.js";
import { useDispatch } from "react-redux";
import { comm } from "../../services/socket.js";

const Navbar = () => {
  const { isLogged, logingOut } = useAuth();
  const dispatch = useDispatch();
  const { getTranslatedWord } = useTranslation();

  const handleleaveRoom = () => {
    dispatch(actions.leaveRoom());
  };

  const handleRefreshGame = () => {
    comm.refresh();
  };

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
    if (windowType === "accueil") {
      openWindow("alert", {
        message: "alert.logout",
        onConfirm: () => {
          logingOut();
          showHome();
        },
        onCancel: closeWindow,
      });
    } else if (windowType !== "") {
      closeWindow();
    } else if (isGameTableVisible) {
      openWindow("alert", {
        message: "alert.confirmExitMessage",
        onConfirm: () => {
          handleleaveRoom();
          showHome();
        },
        onCancel: closeWindow,
      });
    } else {
      openWindow("alert", {
        message: "alert.logout",
        onConfirm: () => {
          logingOut();
          showHome();
        },
        onCancel: closeWindow,
      });
    }
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };

  // Gestion du chatbox
  const [isChatOpen, setisChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    "Hello!",
    "How are you?",
    "Welcome to the chat!",
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [users] = useState(["User1", "User2", "User3"]);
  const currentUser = user ? user.name : "Anonymous";

  const handleChatOpen = () => {
    setisChatOpen(true);
  };

  const handleChatClose = () => {
    setisChatOpen(false);
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, newMessage]);
      setNewMessage("");
    }
  };

  // Crée un label pour le bouton de déconnexion
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
                    <div className="current-user">
                      <p>Logged in as: {currentUser}</p>
                    </div>
                    <div className="connected-users">
                      <h3>Connected Users</h3>
                      <ul>
                        {users.map((user, index) => (
                          <li key={index}>{user}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="message-list">
                      {messages.map((msg, index) => (
                        <div key={index} className="message-item">
                          {msg}
                        </div>
                      ))}
                    </div>
                    <TextInputComponent
                      name="Message"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      styleClass={"input-chatBox-V2"}
                    />
                    <Button
                      label="Send"
                      onClick={sendMessage}
                      styleClass="btn-send"
                      iconSrc={require("./../assets/images/icons/white/return.png")}
                    />
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}

      <div className="container-navMain-V2">
        {isLogged && (
          <>
            <Button
              label={getTranslatedWord("navbar.profile")}
              onClick={() =>
                isLogged ? openWindow("profile") : openWindow("login")
              }
              styleClass={`${isLogged ? "btn-profile-V2 " : "btn-logIn-V2 "}`}
              iconSrc={require("./../assets/images/icons/white/profile.png")}
            />
            <Button
              label={getTranslatedWord("navbar.ranking")}
              onClick={() => openWindow("ranking")}
              styleClass="btn-tutorial-V2"
              iconSrc={require("./../assets/images/icons/white/ranking.png")}
            />
          </>
        )}

        <Button
          label={getTranslatedWord("navbar.settings")}
          onClick={() => openWindow("settings")}
          styleClass="btn-settings-V2"
          iconSrc={require("./../assets/images/icons/white/settings.png")}
        />

        <Button
          label="REFRESH GAME PAGE"
          onClick={handleRefreshGame}
          styleClass="btn-settings-V2"
          iconSrc={require("./../assets/images/icons/white/password-repeat.png")}
        />

        {isLogged && (
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
          styleClass="btn-tutorial-V2"
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
