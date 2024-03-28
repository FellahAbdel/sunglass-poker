import React, { createContext, useContext, useState } from 'react';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const [theme , setTheme]=useState("dark");
  const [mute, setMute] = useState(false);
  const [language, setLanguage] = useState('en');

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
    console.log("theme is:" ,theme);
  };
  const toggleMute = () => setMute(!mute);
  const changeLanguage = (lang) => setLanguage(lang);


  return (
    <SettingsContext.Provider value={{ theme, mute, language, toggleTheme, toggleMute, changeLanguage }}>
      {children}
    </SettingsContext.Provider>
  );
};
