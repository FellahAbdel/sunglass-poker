import React , { useState } from 'react';
import './gameActionPanel.css';
import RaiseSlider from './RaiseSlider';


const GameActionButtons = ({onClickOrCall, onFold, onRaise}) => {

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

  const handleRaise = () => {
      setShowPopup(!showPopup);
  };
  
  const handleCheckOrCall = () => {
  };

  const handleFold = () => {

  };


  return (
    <div className="container-gameAction">
    <div className={`container-ActionButtons ${showPopup ? "container-ActionButtons-slideUp" : ""}`}>
          <button className="btn-raise" onClick={handleRaise} >Raise {sliderValueText ? sliderValueText + "%" : ""}</button>
          <button className="btn-checkOrCall" onClick={handleCheckOrCall}>{checkOrCall}</button>
          <button className="btn-fold" onClick={handleFold}>Fold</button>
      </div>
      <div className={`rangeSlider ${showPopup ? "rangeSlider-open" : ""}`}><RaiseSlider initialValue={25} onSliderChange={handleSliderChange}/></div>
    </div>
  )
}

export default GameActionButtons;