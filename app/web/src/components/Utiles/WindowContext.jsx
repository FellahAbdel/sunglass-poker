import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import {
  windowReducer,
  initialState,
  SHOW_GAME_TABLE,
  HIDE_GAME_TABLE,
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
  }, [
    state.isWindowOpen,
    state.windowType,
    state.isGameTableVisible,
    state.connectionWindowOpen,
  ]);

  const setWindowOpen = useCallback((isOpen) => {
    dispatch({ type: "TOGGLE_WINDOW_OPEN", payload: isOpen });
  }, []);

  const setWindowType = useCallback((type) => {
    dispatch({ type: "SET_WINDOW_TYPE", payload: type });
  }, []);

  const setSelectedItem = useCallback((item) => {
    dispatch({ type: "SET_SELECTED_ITEM", payload: item });
  }, []);

  const setAlertParams = useCallback((params) => {
    dispatch({ type: "SET_ALERT_PARAMS", payload: params });
  }, []);

  const setSuccessMessage = useCallback((message) => {
    dispatch({ type: "SET_SUCCESS_MESSAGE", payload: message });
  }, []);

  const setRedirectAfterSuccess = useCallback((redirect) => {
    dispatch({ type: "SET_REDIRECT_AFTER_SUCCESS", payload: redirect });
  }, []);

  const showGameTable = useCallback(() => {
    dispatch({ type: SHOW_GAME_TABLE });
  }, []);

  const hideGameTable = useCallback(() => {
    dispatch({ type: HIDE_GAME_TABLE });
  }, []);

  const openWindow = useCallback(
    (type, params = {}) => {
      console.log(`Opening window: ${type}`, params);

      if (state.windowType === type && state.isWindowOpen) {
        closeWindow();
        return;
      }

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
    },
    [
      state.windowType,
      state.isWindowOpen,
      setAlertParams,
      setWindowOpen,
      setWindowType,
    ]
  );

  const closeWindow = useCallback(() => {
    console.log("Fermeture de la fenêtre");
    setAlertParams({ message: "", onConfirm: () => {}, onCancel: () => {} });
    setWindowOpen(false);
    setWindowType("");
    if (state.redirectAfterSuccess) {
      openWindow(state.redirectAfterSuccess);
      setRedirectAfterSuccess("");
    }
    setSuccessMessage("");
  }, [
    setAlertParams,
    setWindowOpen,
    setWindowType,
    openWindow,
    setRedirectAfterSuccess,
    setSuccessMessage,
    state.redirectAfterSuccess,
  ]);

  const showHome = useCallback(() => {
    hideGameTable();
    setWindowOpen(false);
    setWindowType("");
  }, [hideGameTable, setWindowOpen, setWindowType]);

  const openSuccessWindow = useCallback(
    (message, redirect = "") => {
      console.log(
        `Ouverture de la fenêtre de succès avec le message : ${message}`
      );
      setSuccessMessage(message);
      setRedirectAfterSuccess(redirect);
      setWindowType("success");
      setWindowOpen(true);
    },
    [setSuccessMessage, setRedirectAfterSuccess, setWindowType, setWindowOpen]
  );

  const openValidationWindow = useCallback((item) => {
    console.log(
      `Ouverture de la fenêtre de validation pour l'élément : ${item.imgSrc}`
    );
    dispatch({ type: "SET_SELECTED_ITEM", payload: item });
    dispatch({ type: "SET_WINDOW_TYPE", payload: "validation" });
    dispatch({ type: "TOGGLE_WINDOW_OPEN", payload: true });
  }, []);

  const onClickStartGame = useCallback(() => {
    openWindow("game");
  }, [openWindow]);

  // Effets pour gérer la persistance de sessionStorage
  useEffect(() => {
    sessionStorage.setItem("isWindowOpen", state.isWindowOpen);
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
        showGameTable,
        hideGameTable,
        setSelectedItem,
        setWindowType,
        setWindowOpen,
        setAlertParams,
        setSuccessMessage,
        setRedirectAfterSuccess,
        showHome,
        openSuccessWindow,
        openValidationWindow,
        onClickStartGame,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
};
