import React, { createContext, useContext, useState, useEffect } from "react";

const WindowContext = createContext();

export const useWindowContext = () => useContext(WindowContext);

export const WindowProvider = ({ children }) => {

  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [windowType, setWindowType] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [isGameTableVisible, setIsGameTableVisible] = useState(() => {
    const saved = localStorage.getItem("isGameTableVisible");
    return saved === "true" ? true : false;
  });

  useEffect(() => {
    console.log("Gametable visible ? ", isGameTableVisible ? "Oui" : "Non");
  }, [isGameTableVisible]);


  useEffect(() => {
    localStorage.setItem("isGameTableVisible", isGameTableVisible);
  }, [isGameTableVisible]);

  const toggleGameTableVisibility = () => {
    setIsGameTableVisible(!isGameTableVisible);
  };

  const showHome = () => {
    setIsGameTableVisible(false);
  };

  const showGameTable = () => {
    setIsGameTableVisible(true);
  };

  const openWindow = (type) => {
    if (isWindowOpen && (windowType == type) ) { //for the buttons to act as a back button too
       closeWindow(type);
    } else {
      console.log(`Ouverture de la fenêtre : ${type}`);
      setIsWindowOpen(true); // Assurez-vous que cela est appelé pour ouvrir la fenêtre
      setWindowType(type);
    }
  };
  

  const closeWindow = () => {
    console.log("Fermeture de la fenêtre");
    setIsWindowOpen(false); // Permet de fermer la fenêtre
    setWindowType("");
    setSuccessMessage("");
  };

  const openSuccessWindow = (message) => {
    console.log(
      `Ouverture de la fenêtre de succès avec le message : ${message}`
    );
    setIsWindowOpen(true);
    setWindowType("success");
    setSuccessMessage(message);
  };

  // Fonctions spécifiques pour chaque type de fenêtre
  const openLoginWindow = () => openWindow("login");
  const openSignUpWindow = () => openWindow("signup");
  const openForgotPassword = () => openWindow("forgot");
  const openResetPassword = () => openWindow("reset");

  return (
    <WindowContext.Provider
      value={{
        isWindowOpen,
        windowType,
        openWindow,
        closeWindow,
        openLoginWindow,
        openSignUpWindow,
        openForgotPassword,
        openResetPassword,
        openSuccessWindow,
        successMessage,
        isGameTableVisible,
        toggleGameTableVisibility,
        showHome,
        showGameTable,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
};
