import React, { useState, useEffect } from "react";
import "./gameActionPanelV2.css";
import Button from "../../button/Button.tsx";
import * as actions from "../../../store/actions/clientInteractionsCreator.js";
import { useDispatch } from "react-redux";
import { useTranslation } from "../../Utiles/Translations";
import { useGameTable } from "../../Utiles/GameTableProvider.jsx";

/**
 * GameActionButtons provides an interface for user actions in a game context,
 * such as betting, raising, checking, calling, and folding.
 */
const GameActionButtons = () => {
  const { isFocus, playerMoney, gameCurrentBet, gamePlayerCurrentBet } =
    useGameTable();
  console.log("gameCurrentBet :", gameCurrentBet);
  const { getTranslatedWord } = useTranslation();
  const [coins, setCoins] = useState(playerMoney);
  const [min, setMin] = useState(20); // minimum amount to raise
  const [max, setMax] = useState(playerMoney); // maximum amount to raise set to coins
  const [step, setStep] = useState(Math.floor(coins / 5)); // toggle coin steps : setted to 5% of the coins
  const [amount, setAmount] = useState(min); //amount to raise
  const [showPopup, setShowPopup] = useState(false); // popUp to show raise panel
  const [coinsAfterRaise, setCoinsAfterRaise] = useState(0); // calculating the amount that player will be left after the raise to show before
  const dispatch = useDispatch();

  /**
   * Formats a number to a readable string with commas.
   * @param {number} number - The number to format.
   * @returns {string} The formatted number.
   */
  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  // Increments the bet amount within the allowable range
  const handleIncrement = () => {
    setAmount((prevAmount) => {
      const newAmount = Math.min(prevAmount + step, max);
      setCoinsAfterRaise(coins - newAmount);
      return newAmount;
    });
  };

  // Decrements the bet amount within the allowable range
  const handleDecrement = () => {
    setAmount((prevAmount) => {
      const newAmount = Math.max(prevAmount - step, min);
      setCoinsAfterRaise(coins - newAmount);
      return newAmount;
    });
  };

  // Handles direct input changes to the bet amount
  const handleChange = (event) => {
    const input = event.target.value;
    // Remove commas for parsing
    const newAmount = parseInt(input.replace(/,/g, ""), 10);
    if (!isNaN(newAmount)) {
      // Only update if the parsed value is a valid number
      setAmount(newAmount); // Update the actual number
    }
    console.log("handleChange amount:", amount);
    console.log("handleChange newAmount:", newAmount);
  };

  // Commits the bet with the Redux action
  const handleBet = (amount) => {
    console.log("handleBet amount :", amount);
    amount = Math.round(amount);
    dispatch(actions.bet(amount));
    setAmount(amount);
  };

  // Toggles the raise panel or submits the raise
  const handleRaise = () => {
    if (!showPopup) {
      setShowPopup(true);
    } else {
      if (amount < min || amount > max) {
        const validatedAmount = Math.max(min, Math.min(max, amount));
        setAmount(validatedAmount);
      } else {
        handleBet(amount);
        setAmount(min);
        setShowPopup(false);
      }
    }
  };

  // Updates the label for the check/call button based on current game state
  const getCheckOrCallLabel = () => {
    if (gameCurrentBet > 0 && gameCurrentBet !== gamePlayerCurrentBet) {
      if (playerMoney <= gameCurrentBet - gamePlayerCurrentBet) {
        return `${getTranslatedWord("gameActionPanel.call")} ${playerMoney} SC`;
      } else {
        return `${getTranslatedWord("gameActionPanel.call")} ${
          gameCurrentBet - gamePlayerCurrentBet
        } SC`;
      }
    } else {
      return getTranslatedWord("gameActionPanel.check");
    }
  };

  // Handles the check or call action
  const handleCheckOrCall = () => {
    if (isFocus) {
      if (gameCurrentBet > 0) {
        if (playerMoney < gameCurrentBet - gamePlayerCurrentBet) {
          dispatch(actions.bet(playerMoney));
        } else {
          dispatch(actions.bet(gameCurrentBet - gamePlayerCurrentBet));
        }
      } else {
        dispatch(actions.check());
      }
      setAmount(min);
      setShowPopup(false);
    }
  };

  // Handles the fold action
  const handleFold = () => {
    if (isFocus) {
      setAmount(min);
      setShowPopup(false);
      dispatch(actions.fold());
    }
  };

  // Effect to update minimum bet when the game's current bet changes
  useEffect(() => {
    if (gameCurrentBet) {
      setMin(gameCurrentBet - gamePlayerCurrentBet);
    } else {
      setMin(20);
    }
  }, [gameCurrentBet, gamePlayerCurrentBet]);

  // Effect to adjust the player's remaining coins after setting a bet amount
  useEffect(() => {
    setCoinsAfterRaise(coins - amount);
  }, [amount, coins]);

  // Hide the raise panel when the player is not focused
  useEffect(() => {
    if (!isFocus) {
      setShowPopup(false);
    }
  }, [isFocus]);

  // Update local state with the latest player money amount
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

        {showPopup && (coinsAfterRaise || amount) && (
          <>
            <div className="userCoinCashs">
              {getTranslatedWord("gameActionPanel.afterSC")}:{" "}
              {formatNumber(coinsAfterRaise)}
            </div>
            {gamePlayerCurrentBet ? (
              <div className="userCoinCashs">
                {getTranslatedWord("gameActionPanel.totalRaise")}:{" "}
                {formatNumber(gamePlayerCurrentBet)}+{formatNumber(amount)}
              </div>
            ) : null}
          </>
        )}
      </div>
      {/* UI for bet sizing quick select buttons and the bet size input */}
      {showPopup && (
        <>
          <div className="container-raiseButtons">
            <Button
              styleClass={"btn-mainAction"}
              onClick={() => setAmount(min)}
              label={"Min"}
            />
            <Button
              styleClass={"btn-mainAction"}
              onClick={() => setAmount(Math.floor(coins / 4))}
              label={"1/4"}
            />
            <Button
              styleClass={"btn-mainAction"}
              onClick={() => setAmount(Math.floor(coins / 2))}
              label={"1/2"}
            />
            <Button
              styleClass={"btn-mainAction"}
              onClick={() => setAmount(Math.floor((coins * 3) / 4))}
              label={"3/4"}
            />
            <Button
              styleClass={"btn-mainAction"}
              onClick={() => setAmount(coins)}
              label={"All in"}
            />
          </div>
          <div className={`container-raiseAdjuster`}>
            <Button
              styleClass="btn-raiseDecrement"
              label={"−"}
              onClick={handleDecrement}
            />
            <input
              type="text"
              className="raiseValueDisplay"
              value={amount === "" ? "" : formatNumber(amount)}
              onChange={handleChange}
            />
            SC
            <Button
              styleClass="btn-raiseIncrement"
              label={"+"}
              onClick={handleIncrement}
            />
          </div>
        </>
      )}
      {/* Main action buttons for raising, checking/calling, and folding */}
      <div className={`container-ActionButtons`}>
        <Button
          styleClass={`btn-mainAction ${!isFocus && "disabled"} ${
            isFocus && amount !== 0 && showPopup && "raise"
          }`}
          onClick={handleRaise}
          label={`${getTranslatedWord("gameActionPanel.raise")}`}
        />
        <Button
          styleClass={`btn-mainAction ${!isFocus && "disabled"}`}
          onClick={handleCheckOrCall}
          label={getCheckOrCallLabel()}
        />
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
