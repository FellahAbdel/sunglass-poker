import React from "react";
import "./card.css";
import { useSettings } from "../../Utiles/SettingsContext";

const Card = ({ card, styleClass, flippingCard, flippedStyle }) => {
  const { theme } = useSettings();

  return (
    <div
      className={`${styleClass} ${
        flippingCard && card != null ? `flippedCard ${flippedStyle}` : ""
      }`}
    >
      <img
        className="CardBack"
        id="back"
        src={theme === "light" ? "static/media/assets/images/card-design-light.png" : "static/media/assets/images/card-design-dark.png"}
        alt="card"
      />
      {card ? (
        <div className="CardFront cardContainer" id="front">
          <div className="cardNumber">
            <div
              style={
                card[1] === "H" || card[1] === "D" ? { color: "#df1e22" } : {}
              }
            >
              {(() => {
                switch (card[0]) {
                  case "1":
                  case "A":
                  case "14":
                    return "A";
                  case "11" || 11:
                    return "J";
                  case "12" || 12:
                    return "Q";
                  case "13" || 13:
                    return "K";
                  default:
                    return `${card[0]}`;
                }
              })()}
            </div>
            <img
              className="cardColor"
              src={`static/media/assets/images/card_type/${card[1]}.png`}
              alt="card"
            />
          </div>
          <img
            className="cardColorBig"
            src={`static/media/assets/images/card_type/${card[1]}.png`}
            alt="card"
          />
        </div>
      ) : null}
    </div>
  );
};

export default Card;
