import React, { useState } from "react";
import "./gameActionPanel.css";
import RaiseSlider from "../Range/RaiseSlider";
import Button from "../../button/Button.tsx";
import { useTranslation } from "../../Utiles/Translations";

//import { useDispatch } from 'react-redux'

const GameActionButtons = ({}) => {
  const { getTranslatedWord } = useTranslation();
  //checkValue = true -> Check
  //checkValue = False -> Call
  const checkValue = useState(true);
  //to open the raise range
  const [showPopup, setShowPopup] = useState(false);
  //sliderValue text -> percentage of the raise
  const [sliderValueText, setSliderValueText] = useState("");
  //const dispatch = useDispatch()
  //const pot = useSelector(state.gameState.pot)

  let checkOrCall = checkValue
    ? getTranslatedWord("gameActionPanel.check")
    : getTranslatedWord("gameActionPanel.call");

  const handleSliderChange = (value) => {
    setSliderValueText(value);
  };

  //console.log(pot)

  // const handleCheckOrCall = () => {
  //   dispatch({
  //     type: 'RAISE',
  //     payload: 10s
  //   })
  // };

  //console.log(pot)

  return (
    <div className="container-gameAction">
      <div
        className={`container-ActionButtons ${
          showPopup ? "container-ActionButtons-slideUp" : ""
        }`}
      >
        <Button
          styleClass={"btn-raise back-color3"}
          onClick={() => {
            //handleRaiseProp();
            setShowPopup(!showPopup);
          }}
          label={`${getTranslatedWord("gameActionPanel.raise")} ${
            sliderValueText ? sliderValueText + "%" : ""
          }`}
        />
        <Button
          styleClass={"btn-checkOrCall back-color3"}
          onClick={null}
          label={checkOrCall}
        />
        <Button
          styleClass={"btn-fold back-color3"}
          onClick={null}
          label={getTranslatedWord("gameActionPanel.fold")}
        />
      </div>
      {showPopup && (
        <div className={`rangeSlider ${showPopup ? "rangeSlider-open" : ""}`}>
          <RaiseSlider initialValue={25} onSliderChange={handleSliderChange} />
        </div>
      )}
    </div>
  );
};

export default GameActionButtons;
