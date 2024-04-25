import React, { useEffect, useState } from "react";
import PlayersProfile from "../gameTable/PlayersProfile/PlayersProfile";
import { useSelector } from "react-redux";

const PlayersPlacements = ({
  playersCardsShowProp,
  playersCardDistributedProp,
  disappear,
}) => {
  const playersInTable = useSelector((state) => state.game.players);
  const [updatedPlayers, setUpdatedPlayers] = useState([]);

  useEffect(() => {
    setUpdatedPlayers(playersInTable);
  }, [playersInTable]);

//   console.log("players cards :", updatedPlayers[0].playerCards);
  return (
    <span className={`profiles ${disappear ? "disappear" : ""}`}>
      {updatedPlayers.map((player, index) => (
        <div key={`profile${index}`} className={`profile profile${index}`}>
          <PlayersProfile
            status={player.status}
            chips={player.playerMoney}
            name={player.name}
            cards={player.playerCards}
            // flippingPlayerCards={playersCardsShowProp[index]}
            flippingPlayerCards={true}

            // gotCards={playersCardDistributedProp[index]}
            gotCards={player.playerCards.length !== 0}
            playerId={player.playerId}
          />
        </div>
      ))}
    </span>
  );
};

export default PlayersPlacements;
