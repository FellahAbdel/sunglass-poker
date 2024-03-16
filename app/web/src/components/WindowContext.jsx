import React, { createContext, useContext, useState } from "react";

const WindowContext = createContext();

export const useWindowContext = () => useContext(WindowContext);

export const WindowProvider = ({ children }) => {
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [windowType, setWindowType] = useState("");


  const openWindow = (type) => {
    console.log(`Ouverture de la fenêtre : ${type}`);
    setIsWindowOpen(true); // Assurez-vous que cela est appelé pour ouvrir la fenêtre
    setWindowType(type);
  };

  const closeWindow = () => {
    console.log("Fermeture de la fenêtre");
    setIsWindowOpen(false); // Permet de fermer la fenêtre
    setWindowType("");
  };

  const showSuccess = () => {
    console.log("Fermeture de la fenêtre");
    setIsWindowOpen(false); // Permet de fermer la fenêtre
    setWindowType("");
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
    }}
  >
    {children}
  </WindowContext.Provider>
);
};