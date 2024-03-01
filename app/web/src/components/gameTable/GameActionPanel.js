import React , { useState } from 'react';
import './gameActionPanel.css';
import RaiseSlider from './RaiseSlider';

//checkValue = true -> Check
//checkValue = False -> Call
//sliderValue text -> percentage of the raise
const GameActionButtons = () => {
    const checkValue = useState(true);
    let checkOrCall = checkValue ? 'Check' : 'Call';

    const [sliderValueText, setSliderValueText] = useState("");
    const handleSliderChange = (value) => {setSliderValueText(value)};


    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };
    

  return (
    <div className="container-gameAction">
    <div className={`container-ActionButtons ${showPopup ? "container-ActionButtons-slideUp" : ""}`}>
          <button className="btn-raise" onClick={togglePopup} >Raise {sliderValueText ? sliderValueText + "%" : ""}</button>
          <button className="btn-checkOrCall">{checkOrCall}</button>
          <button className="btn-fold">Fold</button>
      </div>
      <div className={`rangeSlider ${showPopup ? "rangeSlider-open" : ""}`}><RaiseSlider initialValue={25} onSliderChange={handleSliderChange}/></div>
    </div>
  )
}

export default GameActionButtons;