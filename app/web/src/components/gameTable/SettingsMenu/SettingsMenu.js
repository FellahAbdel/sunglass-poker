import React, { useState } from 'react';
import './settingsMenu.css'
import Button from '../Button/Button.tsx';

const SettingsMenu = ({handleSliderChange,darkMode,mute,onLanguageChange}) => {

  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const handleLanguageChange = (event) => {
    const language = event.target.value;
    setSelectedLanguage(language);
    onLanguageChange(language);
  };

  return (
    <div className="settingsMenu">
          <h1>SETTINGS</h1>

          <span className='container-switch'>
            <p>Mute</p>
          <label class="switch">
            <input type="checkbox" onClick={mute}/>
            <span class="slider"/>
          </label>
          </span>

          <span className='container-switch'>
            <p>DARK MODE</p>
            <label class="switch">
            <input type="checkbox" onClick={darkMode}/>
            <span class="slider"/>
          </label>
          </span>



          <div className='container-ranges'>
          <div className='rangeContainer-blah'>
            BLAH BLAH   
            <input className='slider-blah' type='range' min={1} max={100}  step={1} onChange={handleSliderChange}/>
            </div>
          </div>


          <span htmlFor="language-select">Select Language:</span>
          <select
              id="language-select"
              value={selectedLanguage}
              onChange={handleLanguageChange}
            >
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="es">Spanish</option>
          </select>

              
    </div>
    
  )
}

export default SettingsMenu;