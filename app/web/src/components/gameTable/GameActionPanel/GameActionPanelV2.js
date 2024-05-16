import React, { useState, useEffect } from "react";
import "./gameActionPanelV2.css";
import RaiseSlider from "../Range/RaiseSlider";
import Button from "../../button/Button.tsx";
import * as actions from "../../../store/actions/clientInteractionsCreator.js";
import { useDispatch } from "react-redux";
import { useTranslation } from "../../Utiles/Translations";
// import { useGameTable } from "../../Utiles/GameTableProvider.jsx";

const GameActionButtons = ({}) => {
  //------------------------------------------------------LA FAUDRAIT AJOUTER gamePlayerCurrentBet
  const { isFocus, playerMoney, gameCurrentBet, gamePlayerCurrentBet } =
    useState();
  console.log("gameCurrentBet :", gameCurrentBet);
  const { getTranslatedWord } = useTranslation();
  //checkValue = true -> Check
  //checkValue = False -> Call
  const [checkValue] = useState(true);
  //to open the raise range
  //sliderValue text -> percentage of the raise
  const dispatch = useDispatch();



  const [coins, setCoins] = useState(100000);
  const [min , setMin] = useState(20); // minimum amount to raise
  const [max , setMax] = useState(coins); // maximum amount to raise set to coins
  const [step , setStep] = useState(Math.floor(coins / 10)); // toggle coin steps : setted to 10% of the coins
  const [amount, setAmount] = useState(min); //amount to raise
  const [showPopup, setShowPopup] = useState(false); // popUp to show raise panel
  const [coinsAfterRaise, setCoinsAfterRaise] = useState(0); // calculating the amount that player will be left after the raise to show before

  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  const [amountInput, setAmountInput] = useState(formatNumber(min));

  const handleIncrement = () => {
    setAmount((prevAmount) => {
      const newAmount = Math.min(prevAmount + step, max);
      setCoinsAfterRaise(coins - newAmount);
      return newAmount;
    });
  };

  const handleDecrement = () => {
    setAmount((prevAmount) => {
      const newAmount = Math.max(prevAmount - step, min);
      setCoinsAfterRaise(coins - newAmount);
      return newAmount;
    });
  };

  const handleChange = (event) => {
    const newAmount = event.target.value.replace(/,/g, '');
    if (/^\d*$/.test(newAmount)) { // Ensure only non-decimal numbers are allowed
      setAmountInput(newAmount === '' ? '' : formatNumber(newAmount));
      setAmount(newAmount === '' ? '' : Number(newAmount));
    }
  };

  const handleBet = (amount) => {
    console.log("amount :", amount);
    amount = Math.round(amount);
    dispatch(actions.bet(amount));
    setAmount(amount);
  };

  const handleRaise = () => {
    if (!showPopup) {
      setShowPopup(true);
    } else {
      if (amount < min || amount > max) {
        const validatedAmount = Math.max(min, Math.min(max, amount));
        setAmount(validatedAmount);
      }
      else{
        const totalAmount = amount + Math.max(0, gameCurrentBet - gamePlayerCurrentBet);
        handleBet(totalAmount);
        setShowPopup(false);
      }
    }
  };

  // Met à jour la valeur du bouton "Check" ou "Call" en fonction de gameCurrentBet
  const getCheckOrCallLabel = () => {
    if (gameCurrentBet > 0) {
      //le cas du tapis de ce qui me reste
      if(playerMoney<(gameCurrentBet-gamePlayerCurrentBet)){
        return `${getTranslatedWord(
          "gameActionPanel.call"
        )} ${playerMoney} SC`;
      }
      //le cas classic du call
      else{
        return `${getTranslatedWord(
          "gameActionPanel.call"
          )} ${gameCurrentBet - gamePlayerCurrentBet} SC`;
      }
    } else {
      return getTranslatedWord("gameActionPanel.check");
    }
  };

  const handleCheckOrCall = () =>{
    if (isFocus){
      if (gameCurrentBet > 0) {
        //le tapis de ce qui reste
        if (playerMoney < (gameCurrentBet - gamePlayerCurrentBet)) {
          // dispatch(actions.bet(playerMoney));
        } else {
          // Le cas classique du call
          // dispatch(actions.bet(gameCurrentBet - gamePlayerCurrentBet));
        }
      } else {
        // Sinon, effectue une action "Check"
        // dispatch(actions.check());
      }  
      setAmount(min);
      setShowPopup(false);
    }
  }

  const handleFold = () =>{
      if (isFocus){
        setAmount(min);
        setShowPopup(false);
        dispatch(actions.fold());
      }
    }

    useEffect( () =>{
      setCoinsAfterRaise(coins - amount);
    },[amount]);

    useEffect(() => {
      setCoins(playerMoney);
    }, [playerMoney]);  

    console.log("raise coins:", amount);

  return (
    <div className="container-gameAction">
      <div className="container-cashSituation">
        <div className="userCoinCashs">
          {getTranslatedWord("gameActionPanel.currentSC")}: {coins}
        </div>
        {showPopup && (coinsAfterRaise || amount) && (
          <div className="userCoinCashs">
            {getTranslatedWord("gameActionPanel.afterSC")}:{" "}
            {(coinsAfterRaise)}
          </div>
        )}
      </div>
      {showPopup && (<>
          <div className="container-raiseButtons">
            <Button
              styleClass={"btn-mainAction"}
              onClick={() => setAmount(min)}
              label={"Min"}
            />
            <Button
              styleClass={"btn-mainAction"}
              onClick={() => setAmount(min)}
              label={"1/4"}
            />
            <Button
              styleClass={"btn-mainAction"}
              onClick={() => setAmount(coins/2)}
              label={"1/2"}
            />
            <Button
              styleClass={"btn-mainAction"}
              onClick={() => setAmount(coins*3/4)}
              label={"3/4"}
            />
            <Button
              styleClass={"btn-mainAction"}
              onClick={() => setAmount(coins)}
              label={"All in"}
            />
          </div>
          <div className={`container-raiseAdjuster`}>
            <Button styleClass="btn-raiseDecrement" label={"−"} onClick={handleDecrement} disabled={amount <= min}/>
              <input
                type="text"
                className="raiseValueDisplay"
                value={amount === '' ? '' : formatNumber(amount)}
                onChange={handleChange}
              />SC
            <Button styleClass="btn-raiseIncrement" label={"+"} onClick={handleIncrement} disabled={amount >= max}/>
      </div>
          </>)}
      <div className={`container-ActionButtons`}>
        {/* LEBOUTON BET */}
        <Button
          styleClass={`btn-mainAction ${!isFocus && "disabled"} ${("isFocus" && amount !== 0 && showPopup) && "back-color1" }`}
          onClick={handleRaise}
          label={`${getTranslatedWord("gameActionPanel.raise")}`}
        />

        {/* Bouton "Check" ou "Call" en fonction de gameCurrentBet */}
        <Button
          styleClass={`btn-mainAction ${!isFocus && "disabled"}`}
          onClick={handleCheckOrCall}
          label={getCheckOrCallLabel}
        />
        {/* LE BOUTON FOLD */}
        <Button
          styleClass={`btn-fold btn-mainAction ${!isFocus && "disabled"}`}
          onClick={handleFold}
          label={getTranslatedWord("gameActionPanel.fold")}
        />
      </div>
    </div>
  );
};

export default GameActionButtons;
