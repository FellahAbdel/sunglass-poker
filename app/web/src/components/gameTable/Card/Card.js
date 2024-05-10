import React, { useState } from "react";
import "./card.css";
import cardBackLight from "./../../assets/images/card-design-light.png";
import cardBackDark from "./../../assets/images/card-design-dark.png";

import { useSettings } from "../../Utiles/SettingsContext";

const Card = ({ card, styleClass, flippingCard, flippedStyle}) => {
  const { theme } = useSettings();

  return (
    <div
      className={`${styleClass} ${
        (flippingCard && card != null) ? `flippedCard ${flippedStyle}` : ""
      }`}
    >
      <img
        className="CardBack"
        id="back"
        src={theme === "light" ? cardBackLight : cardBackDark}
        alt="card"
      />
      {card ? (
      //     <img
      //     className="CardFront"
      //     src={require(`./../../assets/images/card_front/${card[0]}_of_${card[1]}.png`)}
      //     alt="card"
      // />
      <div className="CardFront cardContainer" id="front">
          {/* <img
          className="CardFront"
          id="front"
          src={require(`./../../assets/images/card_front/_of_.png`)}
          alt="card"
        /> */}
        <div className="cardNumber">
          <div>
          {(() => {
            switch (card[0]) {
              case "1":
              case "A":
              case "14":
                return "A";
              case "11" || 11 :
                return "J";
              case "12" || 12 :
                return "Q";
              case "13" || 13 :
                return "K";
              default:
                return `${card[0]}`;
            }
          })()}
          </div>
          <img 
          className="cardColor"
          src={require(`./../../assets/images/card_type/${card[1]}.png`)}
          alt="card"/>
        </div>
        <img 
          className="cardColorBig"
          src={require(`./../../assets/images/card_type/${card[1]}.png`)}
          alt="card"/>
      </div>
      ) : null}
    </div>
  );
};

export default Card;
