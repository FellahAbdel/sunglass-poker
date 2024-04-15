import React, { useState, useEffect } from "react";
import "./gameActionPanel.css";
import RaiseSlider from "../Range/RaiseSlider";
import Button from "../../button/Button.tsx";
import { useTranslation } from "../../Utiles/Translations";
import { useUserData } from "../../Utiles/useUserData.jsx";

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
  const { user } = useUserData();
  const [raiseCoin, setRaiseCoin] = useState(0);
  const [coins, setCoins] = useState(1200); 

  useEffect(() => {
    const newRaiseCoin = coins * sliderValueText / 100;
    setRaiseCoin(newRaiseCoin);
}, [sliderValueText, coins]);

  let checkOrCall = checkValue
    ? getTranslatedWord("gameActionPanel.check")
    : getTranslatedWord("gameActionPanel.call");

  const handleSliderChange = (value) => {
    setSliderValueText(value);
  };

  return (
    <div className="container-gameAction">
      <div className="raised-value">9999 SC Raised</div>

      {showPopup && (<>
        <div className="container-raiseButtons">
          <Button styleClass={"btn-mainAction"} onClick={null} label={"Min"}/>
          <Button styleClass={"btn-mainAction"} onClick={null} label={"1/2"}/>
          <Button styleClass={"btn-mainAction"} onClick={null} label={"3/4"}/>
          <Button styleClass={"btn-mainAction"} onClick={null} label={"All in"}/>
        </div>
        <div className={`rangeSlide`}>
          <RaiseSlider initialValue={25} onSliderChange={handleSliderChange} />
        </div>
        </>)}
      <div className={`container-ActionButtons`}>
        <Button
          styleClass={"btn-mainAction"}
          onClick={() => {
            //handleRaiseProp();
            setShowPopup(!showPopup);
          }}
          label={`${getTranslatedWord("gameActionPanel.raise")} ${
            raiseCoin ? raiseCoin + " SC" : ""
          }`}
        />
        <Button
          styleClass={"btn-mainAction"}
          onClick={null}
          label={checkOrCall}
        />
        <Button
          styleClass={"btn-mainAction"}
          onClick={null}
          label={getTranslatedWord("gameActionPanel.fold")}
        />
      </div>

    </div>
  );
};

export default GameActionButtons;
