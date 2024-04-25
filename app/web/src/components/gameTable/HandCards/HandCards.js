import React, { useState } from "react";
import "./handCards.css";
import Card from "../Card/Card.js";
import { useTranslation } from "../../Utiles/Translations";
import Button from "./../../button/Button.tsx";

const HandCards = ({ card1, card2, handGuideProp, showHandCardProp }) => {
  const { getTranslatedWord } = useTranslation();
  const [showCard1, setShowCard1] = useState(false);
  const [showCard2, setShowCard2] = useState(false);

  const handleShowCard1 = () => {
    setShowCard1(true);
  };
  const handleShowCard2 = () => {
    setShowCard2(true);
  };
  console.log("HandCards1", card1);
  console.log("HandCards2", card2);

  return (
    <div className="container-handMain">
      <div className="container-showCardsButtons">
        <Button
          styleClass={"btn-showCard"}
          label={`${getTranslatedWord("handGuide.show")} A of`}
          iconSrc={require("./../../assets/images/icons/white/heart.png")}
          onClick={handleShowCard1}
        />
        <Button
          styleClass={"btn-showCard"}
          label={`${getTranslatedWord("handGuide.show")} A of`}
          iconSrc={require("./../../assets/images/icons/white/diamon.png")}
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
          <Card
            styleClass="handCard"
            card={card1}
            flippingCard={showHandCardProp}
          />
          <Card
            styleClass="handCard"
            card={card2}
            flippingCard={showHandCardProp}
          />
        </div>
      </div>
    </div>
  );
};

export default HandCards;
