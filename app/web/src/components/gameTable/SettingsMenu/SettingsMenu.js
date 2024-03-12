import React ,{useState} from 'react';
import './settingsMenu.css'
import Button from '../Button/Button.tsx';

const settingsMenu = ({handleSliderChange,checkBox,darkMode,mute}) => {

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
          
    </div>
  )
}

export default settingsMenu;