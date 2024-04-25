import React from "react";
import "./playersProfile.css";
import ProgressBar from "../../Utiles/ProgressBar";
import Card from "../Card/Card";
import { useTranslation } from "../../Utiles/Translations";

const PlayersProfile = ({
  status,
  chips,
  name,
  cards,
  flippingPlayerCards,
  gotCards,
}) => {
  const { getTranslatedWord } = useTranslation();
  const formattedChips = chips.toLocaleString();
  const dollarSign = " SC";

  //   const [card1, card2] = cards ? cards : ["14", "C"];

  console.log("cards", cards);

  return (
    <div className={`container-onGameProfile`}>
      <div className={`box-status  ${status}`}>
        {status === "waiting" ? (
          <ProgressBar
            className="progressBar progressPercentage"
            durationInSeconds={5}
          />
        ) : (
          <div className={`box-statusText  ${status}`}>
            {getTranslatedWord(`playersStatus.${status.toLowerCase()}`)}
          </div>
        )}
      </div>

      <div className={`box-playerInfo ${status} ${name === "YOU" && "you"}`}>
        {name}
        <br />
        {status === "empty" ? null : `${formattedChips}${dollarSign}`}
      </div>

      <Card
        styleClass={`showCardPlayers1 ${gotCards ? "playerCardAppear" : ""}`}
        card={
          cards.length === 2
            ? [cards[0].number.toString(), cards[0].color]
            : ["14", "C"]
        }
        flippedStyle={"flippedPlayerCards"}
        flippingCard={flippingPlayerCards}
      />
      <Card
        styleClass={`showCardPlayers2 ${gotCards ? "playerCardAppear" : ""}`}
        card={
          cards.length === 2
            ? [cards[1].number.toString(), cards[1].color]
            : ["14", "C"]
        }
        flippedStyle={"flippedPlayerCards"}
        flippingCard={flippingPlayerCards}
      />

      <img
        className={`profilePic ${status}`}
        src={
          status === "empty"
            ? require("./../../assets/images/pp_empty.png")
            : require("./../../assets/images/pp_empty.png")
        }
        alt="profilePic"
      />
    </div>
  );
};

export default PlayersProfile;
