import React, { useState, useSelector } from "react";
import "./gameActionPanel.css";
import RaiseSlider from "../Range/RaiseSlider";
import Button from "../../button/Button.tsx";
import { useDispatch } from 'react-redux'


const GameActionButtons = ({ }) => {
  //checkValue = true -> Check
  //checkValue = False -> Call
  const checkValue = useState(true);
  //to open the raise range
  const [showPopup, setShowPopup] = useState(false);
  //sliderValue text -> percentage of the raise
  const [sliderValueText, setSliderValueText] = useState("");
  const dispatch = useDispatch()
  const pot = useSelector(state.gameState.pot)

  let checkOrCall = checkValue ? "Check" : "Call";

  const handleSliderChange = (value) => {
    setSliderValueText(value);
  };

  console.log(pot)

const handleCheckOrCall = () => {
  dispatch({
    type: 'RAISE',
    payload: 10
  })
};

console.log(pot)

  return (
    <div className="container-gameAction">
      <div
        className={`container-ActionButtons ${
          showPopup ? "container-ActionButtons-slideUp" : ""
        }`}
      >
        <Button
          style={"btn-raise"}
          onClick={() => {
            handleRaiseProp();
            setShowPopup(!showPopup);
          }}
          label={`Raise ${sliderValueText ? sliderValueText + "%" : ""}`}
        />
        <Button
          style={"btn-checkOrCall"}
          onClick={handle}
          label={checkOrCall}
        />
        <Button style={"btn-fold"} onClick={handleFoldProp} label={"Fold"} />
      </div>
      <div className={`rangeSlider ${showPopup ? "rangeSlider-open" : ""}`}>
        <RaiseSlider initialValue={25} onSliderChange={handleSliderChange} />
      </div>
    </div>
  );
};

export default GameActionButtons;
