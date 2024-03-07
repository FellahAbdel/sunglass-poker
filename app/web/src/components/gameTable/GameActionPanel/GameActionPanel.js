import React , { useState } from 'react';
import './gameActionPanel.css';
import RaiseSlider from '../Range/RaiseSlider';
import Button from '/Users/mostafahqv/Documents/SunGameStudio/sunglass-poker/app/web/src/components/gameTable/Button/Button.tsx';


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
          <Button style={"btn-raise"} onClick={() => {handleRaiseProp(); setShowPopup(!showPopup);}} children={`Raise ${sliderValueText ? sliderValueText + "%" : ""}`}/>
          <Button style={"btn-checkOrCall"} onClick={handleCheckOrCallProp} children={checkOrCall}/>
          <Button style={"btn-fold"} onClick={handleFoldProp} children={"Fold"}/>
      </div>
      <div className={`rangeSlider ${showPopup ? "rangeSlider-open" : ""}`}><RaiseSlider initialValue={25} onSliderChange={handleSliderChange}/></div>
    </div>
  )
}

export default GameActionButtons;