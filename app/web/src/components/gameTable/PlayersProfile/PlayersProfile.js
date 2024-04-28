import React, { useEffect } from "react";
import "./playersProfile.css";
import ProgressBar from "../../Utiles/ProgressBar";
import Card from "../Card/Card";
import { useTranslation } from "../../Utiles/Translations";
import AvatarDisplay from "../../AvatarDisplay/AvatarDisplay.jsx";

const PlayersProfile = ({
  status,
  chips,
  name,
  cards,
  flippingPlayerCards,
  gotCards,
  playerId,
  cardsVisible,
}) => {
  const { getTranslatedWord } = useTranslation();
  const formattedChips = chips.toLocaleString();
  const dollarSign = " SC";

  console.log("Player status (fellah):", status);
  // Fonction pour transformer et valider les cartes
  const renderCard = (card, index) => {
    console.log("cardsVisible[index]", cardsVisible[index]);
    if (cardsVisible[index] === true) {
      if (card && card.number !== undefined && card.color !== undefined) {
        const formattedCard = [card.number.toString(), card.color];
        console.log("Formatted card:", formattedCard);
        return formattedCard;
      }
    }
    return null;
  };

  return (
    <div className={`container-onGameProfile`}>
      <div className={`box-status ${status}`}>
        {status === "waiting" ? (
          <ProgressBar
            className="progressBar progressPercentage"
            durationInSeconds={5}
          />
        ) : (
          <div className={`box-statusText ${status}`}>
            {getTranslatedWord(`${status.toLowerCase()}`)}
          </div>
        )}
      </div>

      <div className={`box-playerInfo ${status} ${name === "YOU" && "you"}`}>
        {name}
        <br />
        {status !== "empty" && `${formattedChips}${dollarSign}`}
      </div>

      {/* Appliquer renderCard pour chaque carte avant de l'envoyer au composant Card */}
      <Card
        styleClass={`showCardPlayers1 ${gotCards ? "playerCardAppear" : ""}`}
        card={renderCard(cards[0],0)}
        flippedStyle={"flippedPlayerCards"}
        flippingCard={flippingPlayerCards}
      />
      <Card
        styleClass={`showCardPlayers2 ${gotCards ? "playerCardAppear" : ""}`}
        card={renderCard(cards[1],1)}
        flippedStyle={"flippedPlayerCards"}
        flippingCard={flippingPlayerCards}
      />

      <div className={`profilePic ${status}`}>
        <AvatarDisplay userId={playerId} />
      </div>
    </div>
  );
};

export default PlayersProfile;
