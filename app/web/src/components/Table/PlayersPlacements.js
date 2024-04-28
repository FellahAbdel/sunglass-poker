import React, { useEffect, useState } from "react";
import PlayersProfile from "../gameTable/PlayersProfile/PlayersProfile";
import PlayersPots from "../Table/PlayersPots";
import { useSelector } from "react-redux";

const PlayersPlacements = ({}) => {
  //playersCardDistributed for each player
  // *** also has been used in CardsPlacements component
  const [playersCardDistributed, setPlayersCardDistributed] = useState([
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [playersCardsShow, setPlayersCardsShow] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  const playersInTable = useSelector((state) => state.game.players);
  const [updatedPlayers, setUpdatedPlayers] = useState([]);

  useEffect(() => {
    setUpdatedPlayers(playersInTable);
  }, [playersInTable]);

  const gameClass = useSelector((state) => state.game.game);

  // Définir currentStack avec une valeur par défaut de 0
  const currentStack = gameClass?.pokerTable?.stack || 0;

  // Définir updatedStack à partir de currentStack
  const [updatedStack, setUpdatedStack] = useState(currentStack);

  useEffect(() => {
    // Mettre à jour updatedStack si currentStack change
    setUpdatedStack(currentStack);
  }, [currentStack]);

  {
    // console.log("updated players", updatedPlayers);
  }
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
            // gotCards={playersCardDistributed}
            gotCards={player.playerCards.length !== 0}
            playerId={player.playerId}
          />
        </div>
      ))}
      {/* Add PlayersPots component and pass updatedPlayers as props */}
      <PlayersPots players={updatedPlayers}/>
    </span>
  );
};

export default PlayersPlacements;
