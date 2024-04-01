import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => sessionStorage.getItem('theme') || "dark");
  const [mute, setMute] = useState(() => sessionStorage.getItem('mute') === 'true');
  const [language, setLanguage] = useState(() => sessionStorage.getItem('language') || 'en');

  useEffect(() => {
    sessionStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    sessionStorage.setItem('mute', mute);
  }, [mute]);

  useEffect(() => {
    sessionStorage.setItem('language', language);
  }, [language]);

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  const toggleMute = () => {
    setMute((curr) => !curr);
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };
  return (
    <SettingsContext.Provider value={{ theme, mute, language, toggleTheme, toggleMute, changeLanguage }}>
      {children}
    </SettingsContext.Provider>
  );
};
