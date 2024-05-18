import React, { useState, useEffect } from "react";
import "./settingsMenu.css";
import { useSettings } from "../../Utiles/SettingsContext";
import { useTranslation } from "../../Utiles/Translations";

/**
 * SettingsWindow component provides a UI for the user to manage their settings
 * including theme, sound, animations, and language preferences.
 */
const SettingsWindow = () => {
  const { getTranslatedWord } = useTranslation();

  const {
    theme,
    sound,
    animation,
    language,
    toggleTheme,
    toggleSound,
    toggleAnimation,
    changeLanguage,
  } = useSettings();

  const [themeDark, setThemeDark] = useState();

  // Effect to set the theme toggle based on the current theme.
  useEffect(() => {
    setThemeDark(theme === "dark");
  }, [theme]);
  
  // Handle language change event.
  const handleLanguageChange = (event) => {
    changeLanguage(event.target.value);
  };

  return (
    <div className="settingsMenu">
      <h1>{getTranslatedWord("navbar.settings")}</h1>
      <div className="container-settingsParameteres">
        <span className="container-switchSettings">
          <p>{getTranslatedWord("settings.sound")}</p>

          <label className="switch">
            <input type="checkbox" checked={sound} onChange={toggleSound} />
            <span className="slider" />
          </label>
        </span>

        <span className="container-switchSettings">
          <p>{getTranslatedWord("settings.animations")}</p>
          <label className="switch">
            <input
              type="checkbox"
              checked={animation}
              onChange={toggleAnimation}
            />
            <span className="slider" />
          </label>
        </span>

        <span className="container-switchSettings container-switch-theme">
          <p>{getTranslatedWord("settings.theme")}</p>

          <label className="switch">
            <input type="checkbox" checked={themeDark} onChange={toggleTheme} />
            <span className="slider" />
          </label>
        </span>

        <span className="container-select-lang">
          <p>{getTranslatedWord("settings.langSelect")}</p>
          <select
            name="lang"
            className="select-lang"
            id="language-select"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="es">Español</option>
            <option value="de">Deutsch</option>
            <option value="ch">中文 </option>
            <option value="fa">فارسی</option>
          </select>
        </span>
      </div>
    </div>
  );
};

export default SettingsWindow;
