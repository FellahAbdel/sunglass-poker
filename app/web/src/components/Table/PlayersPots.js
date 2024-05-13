import React from "react";
import "./table.css";

const PlayersPots = ({ players = [], isVisible }) => {
  return (
    <div className="container-playerPots">
      {isVisible &&
        players?.map((player, index) => (
          <div key={index} className={`playerPot${index}`}>
            {player.currentBetTurn || 0} SC
          </div>
        ))}
    </div>
  );
};

export default PlayersPots;
