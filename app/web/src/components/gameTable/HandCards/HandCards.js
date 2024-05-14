import React, { useState, useEffect } from "react";
import "./handCards.css";
import Card from "../Card/Card.js";
import { useTranslation } from "../../Utiles/Translations";
import Button from "./../../button/Button.tsx";
import * as actions from "../../../store/actions/clientInteractionsCreator.js";
import { useDispatch } from "react-redux";
import { getPokerHand } from "./../../Utiles/CombinationDetection.js";
import { useGameTable } from "../../Utiles/GameTableProvider.jsx";

const HandCards = ({ card1, card2, showHandCardProp }) => {
  const { getTranslatedWord } = useTranslation();
  const [handGuide, setHandGuide] = useState();
  const dispatch = useDispatch();
  const { communityCards } = useGameTable();

  // Fonction pour transformer les données de la carte en tableau [number, color]
  const formatCardData = (card) => {
    return [card.number.toString(), card.color];
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

  //console.log("card1", card1);

  const toggleShowCard = (cardIndex, card) => {
    if (card.isVisible) {
      dispatch(actions.hideCard(cardIndex));
    } else {
      dispatch(actions.showCard(cardIndex));
    }
  };

  const toggleBothCards = () => {
    // Vérifie si au moins une carte est visible
    const anyVisible = card1.isVisible || card2.isVisible;
    // Masquer les deux cartes si au moins une est visible, sinon montrer les deux
    if (anyVisible) {
      if (card1.isVisible) dispatch(actions.hideCard(0));
      if (card2.isVisible) dispatch(actions.hideCard(1));
    } else {
      if (!card1.isVisible) dispatch(actions.showCard(0));
      if (!card2.isVisible) dispatch(actions.showCard(1));
    }
  };

  // Icônes des symboles de cartes
  const cardIcons = {
    H: "static/media/assets/images/icons/card_type/H.png",
    D: "static/media/assets/images/icons/card_type/D.png", 
    C: "static/media/assets/images/icons/card_type/C.png",
    S: "static/media/assets/images/icons/card_type/S.png",
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
              ? `${getTranslatedWord("handGuide.hide")} ${card1.number} of `
              : `${getTranslatedWord("handGuide.show")} ${card1.number} of `
          }
          iconSrc={cardIcons[card1.color]}
          onClick={() => toggleShowCard(0, card1)}
        />
        <Button
          styleClass={
            card2.isVisible ? "btn-showCard disabled" : "btn-showCard"
          }
          label={
            card2.isVisible
              ? `${getTranslatedWord("handGuide.hide")} ${card2.number} of `
              : `${getTranslatedWord("handGuide.show")} ${card2.number} of `
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
