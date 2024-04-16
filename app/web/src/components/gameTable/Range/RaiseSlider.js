import React, { useState, useEffect } from 'react'; // Import useState
import Styles from "./raiseSlider.module.css";

const RaiseSlider = ({ onSliderChange , initialValue }) => {
  const [sliderValue, setSliderValue] = useState(1); 

  const handleSliderChange = (event) => {
    const value = event.target.value;
    setSliderValue(value);
    onSliderChange(value); 
  };
  useEffect(() => {
    setSliderValue(initialValue); 
  }, [initialValue]);

  return (
    <div className={`${Styles.range}`}>
      <div className={`${Styles.field}`}>
        {/* <div className={`${Styles.minValue}`}></div> */}
        <input
          className={`${Styles.rangeStyle}`}
          type="range"
          min={1}
          max={100}
          step={1}
          value={sliderValue}
          onChange={handleSliderChange}
        />
        <div className={`${Styles.maxValue}`}>{sliderValue}%</div> 
      </div>
    </div>
  );
};

export default RaiseSlider;
