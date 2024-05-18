import React from "react";
import "./table.css";
/**
 * PlayersPots displays the current betting amount (pot) for each player in a game.
 * It conditionally renders these amounts based on the visibility prop.
 *
 * Props:
 *  - players: Array of player objects, each containing betting information.
 *  - isVisible: Boolean that controls the visibility of the component.
 */
const PlayersPots = ({ players = [], isVisible }) => {
  return (
    <div className="container-playerPots">
      {/* Conditionally renders player pots if the component is set to be visible */}
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
