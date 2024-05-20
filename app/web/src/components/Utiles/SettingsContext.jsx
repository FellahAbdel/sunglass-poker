import React, { createContext, useContext, useReducer, useEffect } from "react";
import {
  settingsReducer,
  initialState,
} from "../../store/reducers/settingsReducer";

// Create a context for managing settings state throughout the application.
const SettingsContext = createContext();

// Custom hook to provide easy access to the settings context.
export const useSettings = () => useContext(SettingsContext);

/**
 * SettingsProvider is a component that provides settings state and dispatcher methods
 * to its child components via a React context.
 *
 * @param {object} props - Component props containing children to render within the provider.
 */
export const SettingsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(settingsReducer, initialState);

  // Effets pour mettre à jour localStorage
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

  useEffect(() => {
    localStorage.setItem("volume", state.volume);
  }, [state.volume]);

  // Fonctions pour dispatcher les actions
  const toggleTheme = () => {
    dispatch({ type: "TOGGLE_THEME" });
  };

  const toggleSound = () => {
    dispatch({ type: "TOGGLE_SOUND" });
  };

  const setVolume = (volume) => {
    dispatch({ type: "SET_VOLUME", payload: volume });
  };

  const toggleAnimation = () => {
    dispatch({ type: "TOGGLE_ANIMATION" });
  };

  const changeLanguage = (lang) => {
    dispatch({ type: "CHANGE_LANGUAGE", payload: lang });
  };

  return (
    <SettingsContext.Provider
      value={{
        ...state,
        toggleTheme,
        toggleSound,
        toggleAnimation,
        changeLanguage,
        setVolume,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
