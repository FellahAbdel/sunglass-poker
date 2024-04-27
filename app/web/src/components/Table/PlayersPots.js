import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "../Utiles/Translations";
import "./table.css";

const PlayersPots = ({ players = []}) => {
  return (
    <div className="container-playerPots">
      {players.map((player, index) => (
        <div key={index} className={`playerPot${index}`}>
          {player.playerMoney} SC
        </div>
      ))}
    </div>
  );
};

export default PlayersPots;
