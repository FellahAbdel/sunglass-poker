import React from 'react';
import Styles from './raiseSlider.module.css';

function handleSliderChange(event) {
    const step = 25; // Define your desired interval size
    const value = event.target.value;
    const snappedValue = Math.round(value / step) * step;
    event.target.value = snappedValue;
}

const RaiseSlider = () =>{

/*     const sliderValue = document.querySelector("span");
    const inputSlider = document.querySelector("input");
    inputSlider.oninput = (() => {
        let value = inputSlider.value;
        sliderValue.textContent =  value;
        sliderValue.style.left = (value/2) + "%";
    }); */
    
  return (
    <div className={`${Styles.range}`}>
        <div className={`${Styles.sliderValue}`}> 
            <span></span>
        </div>
        <div className={`${Styles.field}`}>
            <div className={`${Styles.minValue}`}>0%</div>
            <input type='range' min={0} max={100}  step={1} list="hardStops"  onChange={handleSliderChange}></input>
            <div className={`${Styles.maxValue}`}>100%</div>
            
        </div>

    </div>
  )
}

export default RaiseSlider;