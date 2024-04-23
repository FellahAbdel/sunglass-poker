import React from "react";
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
  // const playersInTable = initialState.players;

  return (
    <span className={`profiles ${disappear ? "disappear" : ""}`}>
      {playersInTable.map((player, index) => (
        <div key={`profile${index}`} className={`profile profile${index}`}>
          <PlayersProfile
            status={player.status}
            chips={player.getPlayerMoney()}
            name={player.name}
            flippingPlayerCards={playersCardsShowProp[index]}
            gotCards={playersCardDistributedProp[index]}
          />
        </div>
      ))}
    </span>
  );
};

export default PlayersPlacements;
