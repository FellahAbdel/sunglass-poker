import React, { useState, useEffect } from "react";
import "./gameActionPanel.css";
import RaiseSlider from "../Range/RaiseSlider";
import Button from "../../button/Button.tsx";
import * as actions from "../../../store/actions/clientInteractionsCreator.js";
import { useDispatch } from "react-redux";
import { useTranslation } from "../../Utiles/Translations";
import { useUserData } from "../../Utiles/useUserData.jsx";
import { useGameTable } from "../../Utiles/GameTableProvider.jsx";

const GameActionButtons = ({}) => {
  const { getTranslatedWord } = useTranslation();
  //checkValue = true -> Check
  //checkValue = False -> Call
  const [checkValue] = useState(true);
  //to open the raise range
  const [showPopup, setShowPopup] = useState(false);
  //sliderValue text -> percentage of the raise
  const dispatch = useDispatch();
  const [sliderValueText, setSliderValueText] = useState();
  const { user } = useUserData();
  const [coins, setCoins] = useState(user.coins);
  const [raiseCoin, setRaiseCoin] = useState(0);
  const [coinsAfterRaise, setCoinsAfterRaise] = useState(coins);

  let checkOrCall = checkValue
    ? getTranslatedWord("gameActionPanel.check")
    : getTranslatedWord("gameActionPanel.call");

  useEffect(() => {
    const newRaiseCoin = (coins * sliderValueText) / 100;
    setRaiseCoin(newRaiseCoin);
    setCoinsAfterRaise(coins - newRaiseCoin);
  }, [sliderValueText, coins]);

  const handleSliderChange = (value) => {
    setSliderValueText(value);
  };

  const { isFocus } = useGameTable();

  // Function to handle the fold action
  const handleFold = () => {
    if (isFocus) {
      dispatch(actions.fold());
    } else {
      console.log("You cannot fold, it's not your turn");
    }
  };

  const handleBet = (amount) => {
    dispatch(actions.bet(amount));
  };

  const handleCheck = () => {
    dispatch(actions.check());
  };

  //console.log(pot)
  const handlePercentageButton = (percentage) => {
    const newValue = coins * percentage;
    setRaiseCoin(newValue);
    setSliderValueText(percentage * 100);
  };

  const togglePopupAndRaise = () => {
    if (!showPopup) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
      setRaiseCoin(0);
      setCoins(coinsAfterRaise);
    }
  };
  useEffect(() => {
    if (!showPopup) {
      setRaiseCoin(0);
      console.log("sliderValueText :", sliderValueText);
      console.log("coins :", coins);
      console.log("raiseCoin :", raiseCoin);
      if (raiseCoin !== 0) handleBet(raiseCoin);
    }
  }, [raiseCoin]);

  useEffect(() => {
    setCoins(user.coins);
  }, [user.coins]);

  return (
    <div className="container-gameAction">
      <div className="conthis user undefined is focus:  nulltainer-cashSituation">
        <div className="userCoinCashs">
          {getTranslatedWord("gameActionPanel.currentSC")}: {Math.round(coins)}
        </div>
        {showPopup && (coinsAfterRaise || sliderValueText !== 0) ? (
          <div className="userCoinCashs">
            {getTranslatedWord("gameActionPanel.afterSC")}:{" "}
            {Math.round(coinsAfterRaise)}
          </div>
        ) : (
          ""
        )}
      </div>
      {showPopup && (
        <>
          <div className="container-raiseButtons">
            <Button
              styleClass={"btn-mainAction"}
              onClick={null}
              label={"Min"}
            />
            <Button
              styleClass={"btn-mainAction"}
              onClick={() => handlePercentageButton(0.5)}
              label={"1/2"}
            />
            <Button
              styleClass={"btn-mainAction"}
              onClick={() => handlePercentageButton(0.75)}
              label={"3/4"}
            />
            <Button
              styleClass={"btn-mainAction"}
              onClick={() => handlePercentageButton(1)}
              label={"All in"}
            />
          </div>
          <div className={`rangeSlide`}>
            <RaiseSlider
              initialValue={sliderValueText}
              onSliderChange={handleSliderChange}
            />
          </div>
        </>
      )}
      <div className={`container-ActionButtons`}>
        {/* LEBOUTON BET MAIS faut reclické alors jsp ou mettre le handle */}
        <Button
          styleClass={`btn-mainAction ${condition && "deactive"}`}
          onClick={() => togglePopupAndRaise()}
          label={`${getTranslatedWord("gameActionPanel.raise")} ${
            raiseCoin ? Math.round(raiseCoin) + " SC" : ""
          }`}
        />
        {/* LE BOUTON CHECK OR CALL  */}
        <Button
          styleClass={`btn-mainAction ${condition && "deactive"}`}
          onClick={handleCheck}
          label={checkOrCall}
        />
        {/* LE BOUTON FOLD */}
        <Button
          styleClass={`btn-fold btn-mainAction ${isFocus && "deactive"}`}
          onClick={isFocus && handleFold}
          label={getTranslatedWord("gameActionPanel.fold")}
        />
      </div>
      <div className={`rangeSlider ${showPopup ? "rangeSlider-open" : ""}`}>
        <RaiseSlider initialValue={25} onSliderChange={handleSliderChange} />
      </div>
    </div>
  );
};

export default GameActionButtons;
