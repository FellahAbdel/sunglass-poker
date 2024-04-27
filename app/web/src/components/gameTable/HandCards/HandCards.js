import React, { useState } from "react";
import "./handCards.css";
import Card from "../Card/Card.js";
import { useTranslation } from "../../Utiles/Translations";
import Button from "./../../button/Button.tsx";

const HandCards = ({ card1, card2, handGuideProp, showHandCardProp }) => {
  const { getTranslatedWord } = useTranslation();
  const [showCard1, setShowCard1] = useState(true);
  const [showCard2, setShowCard2] = useState(true);

  const handleShowCard1 = () => {
    setShowCard1(true);
  };
  const handleShowCard2 = () => {
    setShowCard2(true);
  };
  console.log("HandCards1", card1);
  console.log("HandCards2", card2);

  const cardIcons = {
    H: require("./../../assets/images/icons/white/heart.png"),
    D: require("./../../assets/images/icons/white/diamon.png"),
    C: require("./../../assets/images/icons/white/club.png"),
    S: require("./../../assets/images/icons/white/spade.png"),
  };

  return (
    <div className="container-handMain">
      <div className="container-showCardsButtons">
        <Button
          styleClass={"btn-showCard"}
          label={`${getTranslatedWord("handGuide.show")} ${card1[0]} of `}
          iconSrc={cardIcons[card1[1]]}
          onClick={handleShowCard1}
        />
        <Button
          styleClass={"btn-showCard"}
          label={`${getTranslatedWord("handGuide.show")} ${card2[0]} of `}
          iconSrc={cardIcons[card2[1]]}
          onClick={handleShowCard2}
        />
        <Button
          styleClass={"btn-showCard"}
          label={`${getTranslatedWord("handGuide.showB")}`}
          onClick={() => {
            handleShowCard1();
            handleShowCard2();
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
          {card1 !== undefined && (
            <Card
              styleClass="handCard"
              card={card1}
              flippingCard={showHandCardProp}
            />
          )}
          {card2 !== undefined && (
            <Card
              styleClass="handCard"
              card={card2}
              flippingCard={showHandCardProp}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HandCards;
