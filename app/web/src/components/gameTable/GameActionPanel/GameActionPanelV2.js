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
  const { isFocus, playerMoney, gameCurrentBet, gamePlayerCurrentBet } = useGameTable();
  console.log("gameCurrentBet :", gameCurrentBet);
  const { getTranslatedWord } = useTranslation();
  const [coins, setCoins] = useState(playerMoney);
  const [min , setMin] = useState(20); // minimum amount to raise
  const [max , setMax] = useState(playerMoney); // maximum amount to raise set to coins
  const [step , setStep] = useState(Math.floor(coins / 5)); // toggle coin steps : setted to 5% of the coins
  const [amount, setAmount] = useState(min); //amount to raise
  const [showPopup, setShowPopup] = useState(false); // popUp to show raise panel
  const [coinsAfterRaise, setCoinsAfterRaise] = useState(0); // calculating the amount that player will be left after the raise to show before
  // const [raiseConfirmed, setRaiseConfirmed] = useState(false); // New state variable to track confirmation  
  const dispatch = useDispatch();
  const [callActive , setCallActive] = useState(false);


  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
  };

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
    const input = event.target.value;
    // Remove commas for parsing
    const newAmount = parseInt(input.replace(/,/g, ''), 10);
    if (!isNaN(newAmount)) { // Only update if the parsed value is a valid number
        setAmount(newAmount); // Update the actual number
    }
    console.log("handleChange amount:", amount);
    console.log("handleChange newAmount:", newAmount);
};

  const handleBet = (amount) => {
    console.log("handleBet amount :", amount);
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
        const totalAmount =  amount + Math.max(0, gameCurrentBet - gamePlayerCurrentBet);
        handleBet(amount);
        setAmount(min);
        setShowPopup(false);
      }
    }
  };

  // Met à jour la valeur du bouton "Check" ou "Call" en fonction de gameCurrentBet
  const getCheckOrCallLabel = () => {
    if ((gameCurrentBet > 0) && (gameCurrentBet !== gamePlayerCurrentBet)) {
      //le cas du tapis de ce qui me reste
      if(playerMoney<=(gameCurrentBet-gamePlayerCurrentBet)){
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
          dispatch(actions.bet(playerMoney));
        } else {
          // Le cas classique du call
          dispatch(actions.bet(gameCurrentBet - gamePlayerCurrentBet));
        }
      } else {
        // Sinon, effectue une action "Check"
        dispatch(actions.check());
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
      if (gameCurrentBet) {
        setMin(gameCurrentBet-gamePlayerCurrentBet);
      }
      else {
        setMin(20);
      }
    },[gameCurrentBet]);

    useEffect( () =>{
      setCoinsAfterRaise(coins - amount);
    },[amount, coins]);

    useEffect( () =>{
      if (!isFocus){
        setShowPopup(false);
      }
    },[isFocus]);

    useEffect(() => {
      setCoins(playerMoney);
    }, [playerMoney]);  

    useEffect(() => {
      setMax(coins);
      setStep(Math.floor(coins / 5));
    }, [coins]);


  return (
    <div className="container-gameAction">
      <div className="container-cashSituation">
        <div className="userCoinCashs">
          {getTranslatedWord("gameActionPanel.currentSC")}:{" "}
          {formatNumber(coins)}
        </div>

        {showPopup && (coinsAfterRaise || amount) && ( <>
          <div className="userCoinCashs">
            {getTranslatedWord("gameActionPanel.afterSC")}:{" "}
            {formatNumber(coinsAfterRaise)}
          </div>
          {gamePlayerCurrentBet  ? (
            <div className="userCoinCashs">
              {getTranslatedWord("gameActionPanel.totalRaise")}:{" "}
              {formatNumber(gamePlayerCurrentBet)}
               + 
              {formatNumber(amount)}
            </div>
            ) : (null)
          }
        </>)}
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
              onClick={() => setAmount(Math.floor(coins/4))}
              label={"1/4"}
            />
            <Button
              styleClass={"btn-mainAction"}
              onClick={() => setAmount(Math.floor(coins/2))}
              label={"1/2"}
            />
            <Button
              styleClass={"btn-mainAction"}
              onClick={() => setAmount(Math.floor(coins*3/4))}
              label={"3/4"}
            />
            <Button
              styleClass={"btn-mainAction"}
              onClick={() => setAmount(coins)}
              label={"All in"}
            />
          </div>
          <div className={`container-raiseAdjuster`}>
            <Button styleClass="btn-raiseDecrement" label={"−"} onClick={handleDecrement}/>
              <input
                type="text"
                className="raiseValueDisplay"
                value={amount === '' ? '' : formatNumber(amount)}
                onChange={handleChange}
              />SC
            <Button styleClass="btn-raiseIncrement" label={"+"} onClick={handleIncrement}/>
      </div>
          </>)}
      <div className={`container-ActionButtons`}>
        {/* LEBOUTON BET */}
        <Button
          styleClass={`btn-mainAction ${!isFocus && "disabled"} ${(isFocus && amount !== 0 && showPopup) && "raise" }`}
          onClick={handleRaise}
          label={`${getTranslatedWord("gameActionPanel.raise")}`}
        />

        {/* Bouton "Check" ou "Call" en fonction de gameCurrentBet */}
        <Button
          styleClass={`btn-mainAction ${!isFocus && "disabled"} ${callActive && "call"}`}
          onClick={handleCheckOrCall}
          label={getCheckOrCallLabel()}
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
