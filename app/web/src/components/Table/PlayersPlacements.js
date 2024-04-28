import React, { useEffect, useState } from "react";
import PlayersProfile from "../gameTable/PlayersProfile/PlayersProfile";
import PlayersPots from "../Table/PlayersPots";
import { useSelector } from "react-redux";

const PlayersPlacements = ({}) => {
  //playersCardDistributed for each player
  // *** also has been used in CardsPlacements component

  const playersInTable = useSelector((state) => state.game.players);
  const [updatedPlayers, setUpdatedPlayers] = useState([]);

  const gameClass = useSelector((state) => state.game.game);

  const currentFocusIndex = gameClass ? gameClass.focus : null;

  useEffect(() => {
    setUpdatedPlayers(playersInTable);
  }, [playersInTable]);

  //const currentFocusIndex = gameClass?.focus;

  //console.log("currentFocusIndex",currentFocusIndex, gameClass.focus);

  // Définir currentStack avec une valeur par défaut de 0
  const currentStack = gameClass?.pokerTable?.stack || 0;

  return (
    <span className={`profiles`}>
      {updatedPlayers.map((player, index) => (
        <div key={`profile${index}`} className={`profile profile${index}`}>
          <PlayersProfile
            status={player.status}
            chips={player.playerMoney}
            name={player.name}
            cards={player.playerCards}
            // flippingPlayerCards={playersCardsShow[index]}
            flippingPlayerCards={true}
            // gotCards={playersCardDistributed}
            cardsVisible={player.cardsVisible}
            gotCards={player.playerCards.length !== 0}
            playerId={player.playerId}
            isFocus={currentFocusIndex === index}
          />
        </div>
      ))}
      {/* Add PlayersPots component and pass updatedPlayers as props */}
      <PlayersPots players={updatedPlayers} />
    </span>
  );
};

export default PlayersPlacements;
