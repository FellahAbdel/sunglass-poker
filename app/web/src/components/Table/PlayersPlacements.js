import React, { useEffect, useState } from "react";
import PlayersProfile from "../gameTable/PlayersProfile/PlayersProfile";
import PlayersPots from "../Table/PlayersPots";
import { useSelector } from "react-redux";

/**
 * PlayersPlacements manages the display of player profiles and pots on the game table.
 * It listens for updates to the players in the game and renders each player's profile.
 * 
 * Props:
 *  - showMiddle: Boolean to control the visibility of the middle section (usually pots in the game).
 */
const PlayersPlacements = ({ showMiddle }) => {

  // Retrieves the list of players from the Redux store's game state
  const playersInTable = useSelector((state) => state.game.game?.players);
  const [updatedPlayers, setUpdatedPlayers] = useState([]);

  // Retrieves the game class, which includes the current focus index among other data
  const gameClass = useSelector((state) => state.game.game);
  const currentFocusIndex = gameClass ? gameClass.focus : null;

  // Updates the list of players whenever there's a change in the Redux state
  useEffect(() => {
    setUpdatedPlayers(playersInTable);
    console.log("playerInTAble: ", playersInTable);
  }, [playersInTable]);

  //const currentFocusIndex = gameClass?.focus;
  //console.log("currentFocusIndex",currentFocusIndex, gameClass.focus);

  // Fetches the current stack value with a fallback to 0 if not defined
  const currentStack = gameClass?.pokerTable?.stack || 0;

  return (
    <span className={`profiles`}>
      {/* Map through updatedPlayers to render each player's profile */}
      {updatedPlayers?.map((player, index) => (
        <div key={`profile${index}`} className={`profile profile${index}`}>
          <PlayersProfile
            status={player.status}
            chips={player.playerMoney}
            name={player.name}
            cards={player.playerCards}
            flippingPlayerCards={true}
            cardsVisible={player.cardsVisible}
            gotCards={player.playerCards.length !== 0}
            playerId={player.playerId}
            isFocus={currentFocusIndex === index}
            isYou={player.isYou}
            timer={20}
          />
        </div>
      ))}
      {/* Add PlayersPots component and pass updatedPlayers as props */}
      <PlayersPots players={updatedPlayers} isVisible={showMiddle} />
    </span>
  );
};

export default PlayersPlacements;
