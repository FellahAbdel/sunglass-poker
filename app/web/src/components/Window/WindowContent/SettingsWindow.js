import React , {useState, useEffect} from 'react';
import './settingsMenu.css'
import { useSettings } from '../../Utiles/SettingsContext';

const SettingsWindow = () => {
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
          <h1>SETTINGS</h1>
          <span className='container-switch-mute'>
            <p>Mute</p>
            <label className="switch">
              <input type="checkbox" checked={mute} onChange={toggleMute}/>
              <span className="slider"/>
            </label>
          </span>

          <span className='container-switch-theme'>
            <p>Theme</p>
            <label className="switch">
              <input type="checkbox" checked={themeDark} onChange={toggleTheme}/>
              <span className="slider"/>
            </label>
          </span>

          <span className='container-select-lang'>
          <p>Select Language</p>
          <select
              className='select-lang'
              id="language-select"
              value={language}
              onChange={handleLanguageChange}
            >
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="es">Spanish</option>
          </select>
          </span>
    </div>
  );
}

export default SettingsWindow;