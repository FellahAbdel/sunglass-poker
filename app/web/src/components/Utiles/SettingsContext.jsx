import React, { createContext, useContext, useState } from 'react';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [mute, setMute] = useState(false);
  const [language, setLanguage] = useState('en');

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleMute = () => setMute(!mute);
  const changeLanguage = (lang) => setLanguage(lang);

  return (
    <SettingsContext.Provider value={{ darkMode, mute, language, toggleDarkMode, toggleMute, changeLanguage }}>
      {children}
    </SettingsContext.Provider>
  );
};
