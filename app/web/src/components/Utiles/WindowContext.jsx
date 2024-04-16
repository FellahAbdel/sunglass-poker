import React, { createContext, useContext, useReducer, useEffect } from "react";
import {
  windowReducer,
  initialState,
} from "../../store/reducers/windowReducer.js";

const WindowContext = createContext();

export const useWindowContext = () => useContext(WindowContext);

export const WindowProvider = ({ children }) => {
  const [state, dispatch] = useReducer(windowReducer, initialState);

  useEffect(() => {
    console.log("isWindowOpen:", state.isWindowOpen);
    console.log("windowType:", state.windowType);
    console.log("isGameTableVisible:", state.isGameTableVisible);
    console.log("connectionWindowOpen:", state.connectionWindowOpen);
  }, [state.isWindowOpen, state.windowType, state.isGameTableVisible, state.connectionWindowOpen]);


  useEffect(() => {
    if (state.windowType === 'alert') {
      dispatch({ type: "SET_WINDOW_TYPE", payload: "accueil" });
    }
  }, []);

  const setWindowOpen = (isOpen) => {
    dispatch({ type: "TOGGLE_WINDOW_OPEN", payload: isOpen });
  };

  const setWindowType = (type) => {
    dispatch({ type: "SET_WINDOW_TYPE", payload: type });
  };

  const setSelectedItem = (item) => {
    dispatch({ type: "SET_SELECTED_ITEM", payload: item });
  };

  const setAlertParams = (params) => {
    dispatch({ type: "SET_ALERT_PARAMS", payload: params });
  };

  const setSuccessMessage = (message) => {
    dispatch({ type: "SET_SUCCESS_MESSAGE", payload: message });
  };

  const setRedirectAfterSuccess = (redirect) => {
    dispatch({ type: "SET_REDIRECT_AFTER_SUCCESS", payload: redirect });
  };

  const toggleGameTableVisibility = () => {
    dispatch({ type: "TOGGLE_GAME_TABLE_VISIBLE" });
  };

  const openWindow = (type, params = {}) => {
    console.log(`Opening window: ${type}`, params);
    if (type === "alert") {
      setAlertParams({
        message: params.message || "Default message",
        onConfirm:
          params.onConfirm ||
          (() => {
            console.log("No confirm action set");
          }),
        onCancel:
          params.onCancel ||
          (() => {
            console.log("No cancel action set");
          }),
      });
    }
    setWindowOpen(true);
    setWindowType(type);
  };

  const closeWindow = () => {
    console.log("Fermeture de la fenêtre");
    setAlertParams({ message: "", onConfirm: () => {}, onCancel: () => {} });
    setWindowOpen(false);
    setWindowType("");
    if (state.redirectAfterSuccess) {
      openWindow(state.redirectAfterSuccess);
      setRedirectAfterSuccess("");
    }
    setSuccessMessage("");
  };

  const showHome = () => {
    toggleGameTableVisibility();
    setWindowOpen(false);
    setWindowType("accueil");
  };

  const openSuccessWindow = (message, redirect = "accueil") => {
    console.log(
      `Ouverture de la fenêtre de succès avec le message : ${message}`
    );
    setSuccessMessage(message);
    setRedirectAfterSuccess(redirect);
    setWindowType("success");
    setWindowOpen(true);
  };

  const openValidationWindow = (item) => {
    console.log(
      `Ouverture de la fenêtre de validation pour l'élément : ${item.imgSrc}`
    );
    dispatch({ type: "SET_SELECTED_ITEM", payload: item });
    dispatch({ type: "SET_WINDOW_TYPE", payload: "validation" });
    dispatch({ type: "TOGGLE_WINDOW_OPEN", payload: true });
  };

  const showGameTable = () => {
    toggleGameTableVisibility();
  };

  const onClickStartGame = () => {
    openWindow('game'); // Assurez-vous que 'game' est géré dans votre reducer pour `windowType`
};



  // Effets pour gérer la persistance de sessionStorage
  useEffect(() => {
    sessionStorage.setItem("isWindowOpen", state.isWindowOpen.toString());
    sessionStorage.setItem("windowType", state.windowType);
    sessionStorage.setItem(
      "isGameTableVisible",
      state.isGameTableVisible.toString()
    );
  }, [state.isWindowOpen, state.windowType, state.isGameTableVisible]);

  return (
    <WindowContext.Provider
      value={{
        ...state,
        openWindow,
        closeWindow,
        toggleGameTableVisibility,
        setSelectedItem,
        setWindowType,
        setWindowOpen,
        setAlertParams,
        setSuccessMessage,
        setRedirectAfterSuccess,
        showHome,
        openSuccessWindow,
        openValidationWindow,
        showGameTable,
        onClickStartGame
      }}
    >
      {children}
    </WindowContext.Provider>
  );
};
