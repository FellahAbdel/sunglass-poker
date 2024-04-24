import React, { useEffect, useState } from "react";
import PlayersProfile from "../gameTable/PlayersProfile/PlayersProfile";
import { useSelector } from "react-redux";

// const initialState = {
//   players: [
//     { name: "YOU", status: "checked", getPlayerMoney: () => 1000 },
//     { name: "Bob", status: "called", getPlayerMoney: () => 300 },
//     { name: "Charlie", status: "fold", getPlayerMoney: () => 200 },
//     { name: "Dana", status: "raised", getPlayerMoney: () => 450 },
//     { name: "Evan", status: "called", getPlayerMoney: () => 350 },
//     { name: "Fiona", status: "waiting", getPlayerMoney: () => 620 },
//     { name: "George", status: "fold", getPlayerMoney: () => 285 },
//     { name: "", status: "empty", getPlayerMoney: () => 0 },
//     { name: "Ivy", status: "raised", getPlayerMoney: () => 500 },
//     { name: "Jake", status: "checked", getPlayerMoney: () => 310 }
//     ]
// };

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

  return (
    <span className={`profiles ${disappear ? "disappear" : ""}`}>
      {updatedPlayers.map((player, index) => (
        <div key={`profile${index}`} className={`profile profile${index}`}>
          <PlayersProfile
            status={player.status}
            chips={player.playerMoney}
            name={player.name}
            // flippingPlayerCards={playersCardsShowProp[index]}
            flippingPlayerCards={true}

            // gotCards={playersCardDistributedProp[index]}
            gotCards={true}
          />
        </div>
      ))}
    </span>
  );
};

export default PlayersPlacements;
