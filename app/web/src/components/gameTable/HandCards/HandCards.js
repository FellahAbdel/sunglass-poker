import React from "react";
import "./handCards.css";
import Card from "../Card/Card.js";
import { useTranslation } from "../../Utiles/Translations";
import Button from "./../../button/Button.tsx";
import * as actions from "../../../store/actions/clientInteractionsCreator.js";
import { useDispatch } from "react-redux";

const HandCards = ({ card1, card2, handGuideProp, showHandCardProp }) => {
  const { getTranslatedWord } = useTranslation();
  const dispatch = useDispatch();

  // Fonction pour transformer les données de la carte en tableau [number, color]
  const formatCardData = (card) => {
    return [card.number.toString(), card.color];
  };

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
    H: require("./../../assets/images/icons/white/heart.png"),
    D: require("./../../assets/images/icons/white/diamon.png"), // Correction du nom du fichier
    C: require("./../../assets/images/icons/white/club.png"),
    S: require("./../../assets/images/icons/white/spade.png"),
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
          styleClass={card1.isVisible || card2.isVisible ? "btn-showCard" : "btn-showCard"}
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
        {handGuideProp && (
          <div className="hand-guide slideUp">
            {getTranslatedWord(`handGuide.${handGuideProp}`)}!
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
