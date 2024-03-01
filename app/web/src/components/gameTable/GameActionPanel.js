import React , { useState } from 'react';
import './gameActionPanel.css';
import RaiseSlider from './RaiseSlider';

const GameActionButtons = () => {
    const checkValue = useState(true);
    let checkOrCall = checkValue ? 'Check' : 'Call';

    const [sliderValueText, setSliderValueText] = useState("");
    const handleSliderChange = (value) => {setSliderValueText(value)};

  return (
    <div className="container">
    <div className="container-buttons">
          <button className="btn-raise">Raise {sliderValueText ? sliderValueText + "%" : sliderValueText}</button>
          <button className="btn-checkOrCall">{checkOrCall}</button>
          <button className="btn-fold">Fold</button>
      </div>
      <RaiseSlider  initialValue={25} onSliderChange={handleSliderChange}/>
    </div>
  )
}

export default GameActionButtons;