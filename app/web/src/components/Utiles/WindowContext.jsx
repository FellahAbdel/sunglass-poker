import React, { createContext, useContext, useState, useEffect } from "react";

const WindowContext = createContext();

export const useWindowContext = () => useContext(WindowContext);

export const WindowProvider = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const [isWindowOpen, setIsWindowOpen] = useState(() => {
    const saved = sessionStorage.getItem("isWindowOpen");
    return saved === "true" ? true : false;
  });

  const openValidationWindow = (item) => {
    console.log(
      `Ouverture de la fenêtre de validation pour l'élément : ${item.imgSrc}`
    );
    setIsWindowOpen(true);
    setWindowType("validation");
    setSelectedItem(item); // Stocke l'item sélectionné
  };
  const [windowType, setWindowType] = useState(() => {
    const savedWindowType = sessionStorage.getItem("windowType");
    const isGameVisible = sessionStorage.getItem("isGameTableVisible") === "true";
  
    return savedWindowType || (isGameVisible ? "" : "accueil");
  });
  const [connectionWindowOpen, setconnectionWindowOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [isGameTableVisible, setIsGameTableVisible] = useState(() => {
    const saved = sessionStorage.getItem("isGameTableVisible");
    return saved === "true" ? true : false;
  });

  useEffect(() => {
    const isConnectionType = ["login", "register", "forgot", "reset"].includes(
      windowType
    );
    setconnectionWindowOpen(isConnectionType);
    console.log("window connection ?  ", isConnectionType ? "Oui" : "Non");
  }, [windowType]);

  useEffect(() => {
    console.log("Gametable visible ? ", isGameTableVisible ? "Oui" : "Non");
  }, [isGameTableVisible]);

  useEffect(() => {
    sessionStorage.setItem("isWindowOpen", isWindowOpen.toString());
  }, [isWindowOpen]);

  useEffect(() => {
    sessionStorage.setItem("windowType", windowType);
  }, [windowType]);

  useEffect(() => {
    sessionStorage.setItem("isGameTableVisible", isGameTableVisible);
  }, [isGameTableVisible]);

  const toggleGameTableVisibility = () => {
    setIsGameTableVisible(!isGameTableVisible);
  };

  const showHome = () => {
    setIsGameTableVisible(false);
    openWindow("accueil");
  };

  const showGameTable = () => {
    setIsGameTableVisible(true);
  };

  const openWindow = (type) => {
    if (isWindowOpen && windowType === type) {
      closeWindow(type);
    } else {
      console.log(`Ouverture de la fenêtre : ${type}`);
      setIsWindowOpen(true);
      setWindowType(type);
    }
  };

  const closeWindow = () => {
    console.log("Fermeture de la fenêtre");
    if (isGameTableVisible) {
      setIsWindowOpen(false);
      setWindowType("");
    } else {
      setIsWindowOpen(true);
      setWindowType("accueil");
    }
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
  const openSignUpWindow = () => openWindow("register");
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
        connectionWindowOpen,
        openValidationWindow,
        selectedItem,
        setWindowType,
        setIsWindowOpen,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
};
