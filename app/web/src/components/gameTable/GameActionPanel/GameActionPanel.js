import React, { useState } from "react";
import "./gameActionPanel.css";
import RaiseSlider from "../Range/RaiseSlider";
import Button from "../../button/Button.tsx";

const GameActionButtons = ({
  handleFoldProp,
  handleCheckOrCallProp,
  handleRaiseProp,
}) => {
  //checkValue = true -> Check
  //checkValue = False -> Call
  const checkValue = useState(true);
  //to open the raise range
  const [showPopup, setShowPopup] = useState(false);
  //sliderValue text -> percentage of the raise
  const [sliderValueText, setSliderValueText] = useState("");

  let checkOrCall = checkValue ? "Check" : "Call";

  const handleSliderChange = (value) => {
    setSliderValueText(value);
  };

  return (
    <div className="container-gameAction">
      <div
        className={`container-ActionButtons ${
          showPopup ? "container-ActionButtons-slideUp" : ""
        }`}
      >
        <Button
          styleClass={"btn-raise"}
          onClick={() => {
            handleRaiseProp();
            setShowPopup(!showPopup);
          }}
          label={`Raise ${sliderValueText ? sliderValueText + "%" : ""}`}
        />
        <Button
          styleClass={"btn-checkOrCall"}
          onClick={handleCheckOrCallProp}
          label={checkOrCall}
        />
        <Button styleClass={"btn-fold"} onClick={handleFoldProp} label={"Fold"} />
      </div>
      <div className={`rangeSlider ${showPopup ? "rangeSlider-open" : ""}`}>
        <RaiseSlider initialValue={25} onSliderChange={handleSliderChange} />
      </div>
    </div>
  );
};

export default GameActionButtons;
