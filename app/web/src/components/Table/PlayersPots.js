import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "../Utiles/Translations";
import "./table.css";

const PlayersPots = ({ players = [] , isVisible}) => {
  return (
    <div className="container-playerPots">
      {isVisible && players?.map((player, index) => (
        <div key={index} className={`playerPot${index}`}>
          {player.currentBet || 0} SC
        </div>
      ))}
    </div>
  );
};

export default PlayersPots;
