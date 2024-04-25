import React, { useEffect, useState } from "react";
import PlayersProfile from "../gameTable/PlayersProfile/PlayersProfile";
import { useSelector } from "react-redux";

const PlayersPlacements = ({}) => {

  //playersCardDistributed for each player 
  // *** also has been used in CardsPlacements component
  const [playersCardDistributed, setPlayersCardDistributed] = useState([1, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [playersCardsShow, setPlayersCardsShow] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);


  const playersInTable = useSelector((state) => state.game.players);
  const [updatedPlayers, setUpdatedPlayers] = useState([]);

  useEffect(() => {
    setUpdatedPlayers(playersInTable);
  }, [playersInTable]);

//   console.log("players cards :", updatedPlayers[0].playerCards);
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
            gotCards={playersCardDistributed}
            // gotCards={player.playerCards.length !== 0}
            playerId={player.playerId}
          />
        </div>
      ))}
    </span>
  );
};

export default PlayersPlacements;
