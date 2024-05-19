import React, { useState, useEffect } from "react";
import "./handCards.css";
import Card from "../Card/Card.js";
import { useTranslation } from "../../Utiles/Translations";
import Button from "./../../button/Button.tsx";
import * as actions from "../../../store/actions/clientInteractionsCreator.js";
import { useDispatch } from "react-redux";
import { getPokerHand } from "./../../Utiles/CombinationDetection.js";
import { useGameTable } from "../../Utiles/GameTableProvider.jsx";

/**
 * HandCards displays the player's hand in a poker game and allows the user to toggle visibility of each card.
 * It also evaluates the current hand based on community cards and updates the hand guide accordingly.
 *
 * Props:
 * - card1: Object representing the first card.
 * - card2: Object representing the second card.
 * - showHandCardProp: Boolean to control the card flipping animation.
 */
const HandCards = ({ card1, card2, showHandCardProp }) => {
  const { getTranslatedWord } = useTranslation();
  const [handGuide, setHandGuide] = useState();
  const dispatch = useDispatch();
  const { communityCards } = useGameTable();

  /**
   * Formats the card data into an array of number and color.
   * @param {Object} card - The card object to format.
   * @returns {Array} The formatted card data as [number, color].
   */
  const formatCardData = (card) => {
    return [card.number.toString(), card.color];
  };

  /**
   * Returns the label for a card number, using face card symbols if applicable.
   * @param {number} number - The card number to convert.
   * @returns {string|number} The label for the card number.
   */
  const getCardLabel = (number) => {
    const faceCards = { 11: "J", 12: "Q", 13: "K", 14: "A" };
    return faceCards[number] || number;
  };

  // Combine all cards into one array for hand evaluation
  useEffect(() => {
    if (communityCards && card1 && card2) {
      const cardCombo = [
        ...communityCards.map((card) => formatCardData(card)),
        formatCardData(card1),
        formatCardData(card2),
      ];
      const hand = getPokerHand(cardCombo);
      setHandGuide(hand);
      console.log("cardCombo:", cardCombo);
    }
  }, [communityCards, card1, card2]);

  /**
   * Toggles the visibility of a single card.
   * @param {number} cardIndex - Index of the card to toggle.
   * @param {Object} card - The card object.
   */
  const toggleShowCard = (cardIndex, card) => {
    if (card.isVisible) {
      dispatch(actions.hideCard(cardIndex));
    } else {
      dispatch(actions.showCard(cardIndex));
    }
  };

  /**
   * Toggles the visibility of both cards.
   * Determines visibility based on the current state of either card.
   */
  const toggleBothCards = () => {
    const anyVisible = card1.isVisible || card2.isVisible;
    if (anyVisible) {
      if (card1.isVisible) dispatch(actions.hideCard(0));
      if (card2.isVisible) dispatch(actions.hideCard(1));
    } else {
      if (!card1.isVisible) dispatch(actions.showCard(0));
      if (!card2.isVisible) dispatch(actions.showCard(1));
    }
  };

  // Map of card color icons.
  const cardIcons = {
    H: "static/media/assets/images/icons/white/heart.png",
    D: "static/media/assets/images/icons/white/diamond.png",
    C: "static/media/assets/images/icons/white/club.png",
    S: "static/media/assets/images/icons/white/spade.png",
  };

  return (
    <div className="container-handMain">
      <div className="container-showCardsButtons">
        <Button
          styleClass={
            card1.isVisible ? "btn-showCard disabled" : "btn-showCard"
          }
          label={
            card1.isVisible
              ? `${getTranslatedWord("handGuide.hide")} ${getCardLabel(
                  card1.number
                )} of `
              : `${getTranslatedWord("handGuide.show")} ${getCardLabel(
                  card1.number
                )} of `
          }
          iconSrc={cardIcons[card1.color]}
          onClick={() => toggleShowCard(0, card1)}
        />
        <Button
          styleClass={
            card2.isVisible ? "btn-showCard disabled" : "btn-showCard"
          }
          label={
            card1.isVisible
              ? `${getTranslatedWord("handGuide.hide")} ${getCardLabel(
                  card2.number
                )} of `
              : `${getTranslatedWord("handGuide.show")} ${getCardLabel(
                  card2.number
                )} of `
          }
          iconSrc={cardIcons[card2.color]}
          onClick={() => toggleShowCard(1, card2)}
        />
        <Button
          styleClass={
            card1.isVisible || card2.isVisible ? "btn-showCard" : "btn-showCard"
          }
          label={
            card1.isVisible || card2.isVisible
              ? getTranslatedWord("handGuide.hideB")
              : getTranslatedWord("handGuide.showB")
          }
          onClick={() => {
            toggleBothCards();
          }}
        />
      </div>
      <div className="container-hand">
        {handGuide && (
          <div className="hand-guide slideUp">
            {getTranslatedWord(`handGuide.${handGuide}`)}!
          </div>
        )}
        <div className="container-handCard">
          <Card
            styleClass="handCard"
            card={formatCardData(card1)}
            flippingCard={showHandCardProp}
          />
          <Card
            styleClass="handCard"
            card={formatCardData(card2)}
            flippingCard={showHandCardProp}
          />
        </div>
      </div>
    </div>
  );
};

export default HandCards;
