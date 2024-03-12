import React ,{useState} from 'react';
import './settingsMenu.css'
import Button from '../Button/Button.tsx';

const settingsMenu = ({handleSliderChange,checkBox,nightMode}) => {

  return (
    <div className="settingsMenu">
          <h1>SETTINGS</h1>

          <label>
            <input type="checkbox" value={checkBox}/>
            Mute
          </label>

          NIGHT MODE
          <label class="switch">
            <input type="checkbox" onClick={nightMode}/>
            <span class="slider"></span>
          </label>

          <div className='container-ranges'>
          <div className='rangeContainer-blah'>
            BLAH BLAH   
            <input className='slider-blah' type='range' min={1} max={100}  step={1} onChange={handleSliderChange}/>
            </div>
          </div>
          
    </div>
  )
}

export default settingsMenu;