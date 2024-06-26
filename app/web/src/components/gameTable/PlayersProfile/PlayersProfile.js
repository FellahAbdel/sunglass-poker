import React from "react";
import "./playersProfile.css";
import ProgressBar from "../../Utiles/ProgressBar";
import Card from "../Card/Card";
import { useTranslation } from "../../Utiles/Translations";
import AvatarDisplay from "../../AvatarDisplay/AvatarDisplay.jsx";

/**
 * PlayersProfile displays individual player information including status, chips count,
 * name, cards, and also a progress bar when it's the player's turn to act.
 *
 * Props:
 *  - status: String indicating the player's game status (e.g., 'active', 'folded').
 *  - chips: Number indicating the amount of chips the player has.
 *  - name: String representing the player's name.
 *  - cards: Array of card objects the player holds.
 *  - flippingPlayerCards: Boolean to control card flip animations.
 *  - gotCards: Boolean indicating if the player has cards.
 *  - playerId: Unique identifier for the player.
 *  - cardsVisible: Array of booleans indicating visibility of each card.
 *  - isFocus: Boolean indicating if it is the player's turn.
 *  - isYou: Boolean to specify if the profile is of the user themselves.
 *  - timer: Number representing the countdown time for player's action.
 */
const PlayersProfile = ({
  status,
  chips,
  name,
  cards,
  flippingPlayerCards,
  gotCards,
  playerId,
  cardsVisible,
  isFocus,
  isYou,
  timer,
  playerHandName,
}) => {
  const { getTranslatedWord } = useTranslation();
  const formattedChips = chips?.toLocaleString();
  const dollarSign = " SC";

  /**
   * Converts the first character of a string to lowercase and retains the rest as is.
   * Useful for converting PascalCase or other formats to camelCase.
   *
   * @param {string} str - The string to convert to camelCase.
   * @return {string} The camelCased string.
   */
  function toCamelCase(str) {
    if (!str) return str;
    return str.charAt(0).toLowerCase() + str.slice(1);
  }

  // Function to format and validate cards for display
  const renderCard = (card, index) => {
    if (cardsVisible[index] === true) {
      if (card && card.number !== undefined && card.color !== undefined) {
        const formattedCard = [card.number.toString(), card.color];
        return formattedCard;
      }
    }
    return null;
  };

  return (
    <div className={`container-onGameProfile`}>
      <div
        className={`container-profileMessage 
                    ${
                      isFocus || (status === "winner" && "profileMessageShow")
                    }`}
      >
        {status === "winner" && playerHandName
          ? getTranslatedWord(`handGuide.${toCamelCase(playerHandName)}`)
          : isFocus &&
            (isYou
              ? getTranslatedWord("game.yourTurn") + "!"
              : getTranslatedWord("game.theirTurn") + "!")}
      </div>
      <div
        className={`box-status ${status.toLowerCase()} ${isFocus && "waiting"}`}
      >
        {isFocus ? (
          <ProgressBar
            className="progressBar progressPercentage"
            eventTimestamp={timer}
          />
        ) : (
          <div className={`box-statusText ${status.toLowerCase()}`}>
            {getTranslatedWord(`playersStatus.${status.toLowerCase()}`)}
          </div>
        )}
      </div>

      <div className={`box-playerInfo ${status.toLowerCase()}`}>
        <p>
          {name}
          <br />
          {status !== "empty" && `${formattedChips}${dollarSign}`}
        </p>
      </div>

      {/* Display cards conditionally based on their visibility */}
      <Card
        styleClass={`cardPlayers1 ${gotCards ? "playerCardAppear" : ""}`}
        card={renderCard(cards[0], 0)}
        flippedStyle={"flippedPlayerCards"}
        flippingCard={flippingPlayerCards}
      />
      <Card
        styleClass={`cardPlayers2 ${gotCards ? "playerCardAppear" : ""}`}
        card={renderCard(cards[1], 1)}
        flippedStyle={"flippedPlayerCards"}
        flippingCard={flippingPlayerCards}
      />

      <div className={`profilePic ${status.toLowerCase()} ${isYou && "you"}`}>
        <AvatarDisplay userId={playerId} />
        {status === "winner" && (
          <img
            id="crown"
            src="static/media//assets/images/icons/white/crown.png"
            alt="crown"
          />
        )}
      </div>
    </div>
  );
};

export default PlayersProfile;
