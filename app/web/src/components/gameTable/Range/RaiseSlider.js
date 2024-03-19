import React, {useState} from 'react';
import Styles from './raiseSlider.module.css';


const RaiseSlider = ({initialValue, onSliderChange}) =>{

    const [sliderValue, setSliderValue] = useState(initialValue);

    const handleSliderChange = (event) => {
      const value = event.target.value;
      setSliderValue(value);
      onSliderChange(value);
    };
    
    return (
    <div className={`${Styles.range}`}>
        <div className={`${Styles.field}`}>
            <div className={`${Styles.minValue}`}>1%</div>
            <input type='range' min={1} max={100}  step={1} onChange={handleSliderChange}></input>
            <div className={`${Styles.maxValue}`}>100%</div>
        </div>

    </div>
  )
};

export default RaiseSlider;