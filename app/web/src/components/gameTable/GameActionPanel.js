import React , { useState } from 'react';
import './gameActionPanel.css';
import RaiseSlider from './RaiseSlider';


const GameActionButtons = ({ handleFoldProp , handleCheckOrCallProp , handleRaiseProp }) => {

  //checkValue = true -> Check
  //checkValue = False -> Call
  const checkValue = useState(true);
  //to open the raise range
  const [showPopup, setShowPopup] = useState(false);
  //sliderValue text -> percentage of the raise
  const [sliderValueText, setSliderValueText] = useState("");
  
  let checkOrCall = checkValue ? 'Check' : 'Call';

  const handleSliderChange = (value) => {
    setSliderValueText(value);
  };

  return (
    <div className="container-gameAction">
    <div className={`container-ActionButtons ${showPopup ? "container-ActionButtons-slideUp" : ""}`}>
          <button className="btn-raise" onClick={() => {handleRaiseProp(); setShowPopup(!showPopup);}} >Raise {sliderValueText ? sliderValueText + "%" : ""}</button>
          <button className="btn-checkOrCall" onClick={handleCheckOrCallProp}>{checkOrCall}</button>
          <button className="btn-fold" onClick={handleFoldProp}>Fold</button>
      </div>
      <div className={`rangeSlider ${showPopup ? "rangeSlider-open" : ""}`}><RaiseSlider initialValue={25} onSliderChange={handleSliderChange}/></div>
    </div>
  )
}

export default GameActionButtons;