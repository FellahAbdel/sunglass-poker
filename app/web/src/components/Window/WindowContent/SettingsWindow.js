import React, { useState } from 'react';
import './settingsMenu.css'
import Button from "../../button/Button.tsx";
import { useSettings } from '../../SettingsContext';

const SettingsWindow = () => {
  const { darkMode, mute, language, toggleDarkMode, toggleMute, changeLanguage } = useSettings();

  const handleLanguageChange = (event) => {
    changeLanguage(event.target.value);
  };

  return (
    <div className="settingsMenu">
          <h1>SETTINGS</h1>
          <span className='container-switch'>
            <p>Mute</p>
            <label className="switch">
              <input type="checkbox" checked={mute} onChange={toggleMute}/>
              <span className="slider"/>
            </label>
          </span>

          <span className='container-switch'>
            <p>DARK MODE</p>
            <label className="switch">
              <input type="checkbox" checked={darkMode} onChange={toggleDarkMode}/>
              <span className="slider"/>
            </label>
          </span>

          <span>Select Language:</span>
          <select
              id="language-select"
              value={language}
              onChange={handleLanguageChange}
            >
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="es">Spanish</option>
          </select>
    </div>
  );
}

export default SettingsWindow;