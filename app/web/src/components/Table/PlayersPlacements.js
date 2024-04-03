import React from "react";
import PlayersProfile from "../gameTable/PlayersProfile/PlayersProfile";
import { useSelector } from "react-redux";

const PlayersPlacements = ({
  playersCardsShowProp,
  playersCardDistributedProp,
  disappear,
}) => {
  const playersInTable = useSelector((state) => state.game.players);

  return (
    <span className={`profiles ${disappear ? "disappear" : ""}`}>
      {playersInTable.map((player, index) => (
        <div key={`profile${index}`} className={`profile profile${index}`}>
          <PlayersProfile
            status={player.status}
            chips={player.playerMoney}
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
