import React , {useState, useEffect} from 'react';
import './settingsMenu.css'
import { useSettings } from '../../Utiles/SettingsContext';
import { useTranslation } from '../../Utiles/Translations';


const SettingsWindow = () => {
  const { getTranslatedWord } = useTranslation();

  const { theme, mute, language, toggleTheme, toggleMute, changeLanguage } = useSettings();

  const [themeDark,setThemeDark] = useState();
  useEffect(() => {
    setThemeDark(theme === "dark");
  }, [theme]);
  const handleLanguageChange = (event) => {
    changeLanguage(event.target.value);
  };

  return (
    <div className="settingsMenu">
          <h1>{getTranslatedWord("navbar.settings")}</h1>
          <span className='container-switch-mute'>
            <p>{getTranslatedWord("settings.mute")}</p>
            <label className="switch">
              <input type="checkbox" checked={mute} onChange={toggleMute}/>
              <span className="slider"/>
            </label>
          </span>

          <span className='container-switch-theme'>
            <p>{getTranslatedWord("settings.theme")}</p>
            <label className="switch">
              <input type="checkbox" checked={themeDark} onChange={toggleTheme}/>
              <span className="slider"/>
            </label>
          </span>

          <span className='container-select-lang'>
          <p>{getTranslatedWord("settings.langSelect")}</p>
          <select
              className='select-lang'
              id="language-select"
              value={language}
              onChange={handleLanguageChange}
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="es">Español</option>
              <option value="de">Deutsch</option>

          </select>
          </span>
    </div>
  );
}

export default SettingsWindow;