import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import ChipsCash from "./ChipsCash";
import Button from "../button/Button.tsx";
import TextInputComponent from "../textInput/TextInput.jsx";
import { useTranslation } from "../Utiles/Translations";
import { useAuth } from "../Utiles/AuthProvider";
import { useUserData } from "../Utiles/useUserData";
import { useWindowContext } from "../Utiles/WindowContext.jsx";
import AvatarDisplay from "../AvatarDisplay/AvatarDisplay.jsx";

const Navbar = () => {
  const { user, isLogged, logingOut } = useAuth();
  const { isGameTableVisible, closeWindow, openWindow } = useWindowContext();
  const userData = useUserData();
  const { getTranslatedWord } = useTranslation();
  const [isChatOpen, setisChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const socket = io("http://localhost:3000"); // Remplacez l'URL par l'URL de votre serveur Socket.IO

  useEffect(() => {
    // Écoutez les nouveaux messages du serveur
    socket.on("chatMessage", (message) => {
      setChatMessages([...chatMessages, message]);
    });

    return () => {
      // Nettoyez les écouteurs d'événements lorsque le composant est démonté
      socket.off("chatMessage");
    };
  }, [chatMessages]);

  const handleLogOutButton = () => {
    logingOut();
    closeWindow();
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };

  const handleChatOpen = () => {
    setisChatOpen(true);
  };

  const handleChatClose = () => {
    setisChatOpen(false);
  };

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("chatMessage", message);
      setMessage("");
    }
  };

  return (
    <div className="container-nav" onClick={handleClick}>
      {isLogged && (
        <>
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
                <div className="chat-messages">
                  {chatMessages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                  ))}
                </div>
                <TextInputComponent
                  name="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={"Messages"}
                  styleClass={"input-chatBox"}
                />
                <Button label="Send" onClick={sendMessage} />
              </>
            )}
          </div>
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
      <Button
        label={
          isLogged
            ? getTranslatedWord("navbar.profile")
            : getTranslatedWord("navbar.login")
        }
        onClick={() =>
          isLogged ? openWindow("profile") : openWindow("login")
        }
        styleClass={`${
          isLogged ? "btn-profile back-color1" : "btn-logIn back-color2"
        }`}
        iconSrc={require("./../assets/images/icons/black/profile.png")}
      />
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
