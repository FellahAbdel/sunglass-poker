import React, { useState, useEffect } from "react";
import "./gameActionPanelV2.css";
import RaiseSlider from "../Range/RaiseSlider";
import Button from "../../button/Button.tsx";
import * as actions from "../../../store/actions/clientInteractionsCreator.js";
import { useDispatch } from "react-redux";
import { useTranslation } from "../../Utiles/Translations";
import { useGameTable } from "../../Utiles/GameTableProvider.jsx";

const GameActionButtons = ({}) => {
  //------------------------------------------------------LA FAUDRAIT AJOUTER gamePlayerCurrentBet
  const [value, setValue] = useState(0);
  const minValue = 0; // Set your minimum value here

  const { isFocus, playerMoney, gameCurrentBet, gamePlayerCurrentBet } =
    useGameTable();
  console.log("gameCurrentBet :", gameCurrentBet);
  const { getTranslatedWord } = useTranslation();
  //checkValue = true -> Check
  //checkValue = False -> Call
  const [checkValue] = useState(true);
  //to open the raise range
  const [showPopup, setShowPopup] = useState(false);
  //sliderValue text -> percentage of the raise
  const dispatch = useDispatch();
  const [sliderValueText, setSliderValueText] = useState();
  const [coins, setCoins] = useState(playerMoney);
  const [raiseCoin, setRaiseCoin] = useState(0);
  const [coinsAfterRaise, setCoinsAfterRaise] = useState(coins);
  const [amount, setAmount] = useState(0);

  const handleDecrement = () => {
    setValue(prevValue => Math.max(prevValue - 1, minValue));
  };

  const handleIncrement = () => {
    setValue(prevValue => prevValue + 1);
  };

  const handleInputChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue)) {
      setValue(Math.max(newValue, minValue));
    } else {
      setValue(minValue);
    }
  };


  return (
    <div className="container-gameAction">
      <div className="container-cashSituation">
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
          <div className="container-raiseButtons">
          <Button
              styleClass={"btn-mainAction"}
              onClick={() => setValue(0)}
              label={"Min"}
            />
            <Button
              styleClass={"btn-mainAction"}
              onClick={() => setValue(coins/2)}
              label={"1/2"}
            />
            <Button
              styleClass={"btn-mainAction"}
              onClick={() => setValue(coins*3/4)}
              label={"3/4"}
            />
            <Button
              styleClass={"btn-mainAction"}
              onClick={() => setValue(coins)}
              label={"All in"}
            />
          </div>
          <div className={`container-raiseAdjuster`}>
            <Button styleClass="btn-raiseDecrement" label={"−"} onClick={handleDecrement}/>
              <input
                type="number"
                className="raiseValueDisplay"
                value={value}
                onChange={handleInputChange}
                min={minValue}
              /> SC            
            <Button styleClass="btn-raiseIncrement" label={"+"} onClick={handleIncrement}/>
          </div>

      <div className={`container-ActionButtons`}>
        {/* LEBOUTON BET MAIS faut reclické alors jsp ou mettre le handle */}
        <Button
          styleClass={`btn-mainAction ${!isFocus && "disabled"}`}
          onClick={() => null}
          label={`${getTranslatedWord("gameActionPanel.raise")} ${
            !isFocus && amount !== 0
              ? `${Math.round(amount)} SC`
              : `${raiseCoin ? Math.round(raiseCoin) + " SC" : ""}`
          }`}
        />

        {/* Bouton "Check" ou "Call" en fonction de gameCurrentBet */}
        <Button
          styleClass={`btn-mainAction ${!isFocus && "disabled"}`}
          onClick={isFocus ? null : undefined}
          label={ getTranslatedWord("gameActionPanel.check")
             || getTranslatedWord("gameActionPanel.call")}
        />
        {/* LE BOUTON FOLD */}
        <Button
          styleClass={`btn-fold btn-mainAction ${!isFocus && "disabled"}`}
          onClick={isFocus ? null : undefined}
          label={getTranslatedWord("gameActionPanel.fold")}
        />
      </div>
      {/* <div className={`rangeSlider ${showPopup ? "rangeSlider-open" : ""}`}>
        <RaiseSlider initialValue={25} onSliderChange={handleSliderChange} />
      </div> */}
    </div>
  );
};

export default GameActionButtons;
