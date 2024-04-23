import React, { createContext, useContext, useReducer, useEffect } from "react";
import {
  settingsReducer,
  initialState,
} from "../../store/reducers/settingsReducer";

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(settingsReducer, initialState);

  // Effets pour mettre jour sessionStorage
  useEffect(() => {
    localStorage.setItem("theme", state.theme);
  }, [state.theme]);

  useEffect(() => {
    localStorage.setItem("sound", state.sound);
  }, [state.sound]);

  useEffect(() => {
    localStorage.setItem("animation", state.animation);
  }, [state.animation]);

  useEffect(() => {
    localStorage.setItem("language", state.language);
  }, [state.language]);

  // Fonctions pour dispatcher les actions
  const toggleTheme = () => {
    dispatch({ type: "TOGGLE_THEME" });
  };

  const toggleSound = () => {
    dispatch({ type: "TOGGLE_SOUND" });
  };

  const toggleAnimation = () => {
    dispatch({ type: "TOGGLE_ANIMATION" });
  };

  const changeLanguage = (lang) => {
    dispatch({ type: "CHANGE_LANGUAGE", payload: lang });
  };

  return (
    <SettingsContext.Provider
      value={{ ...state, toggleTheme, toggleSound, toggleAnimation, changeLanguage }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
