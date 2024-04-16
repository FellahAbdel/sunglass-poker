import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "../Utiles/Translations";
import "./table.css";

const PlayersPots = ({}) => {
  const playersInTable = useSelector((state) => state.game.players);
  const [moneyPot,setMoneyPot] = useState(9999999);
  const { getTranslatedWord } = useTranslation();

  return (
    <div className="container-playerPots">
        <div className={`container-totalPot`}>{getTranslatedWord("table.total")}: {moneyPot.toLocaleString()} SC</div>

        <div className="playerPot0">1000 SC</div>
        <div className="playerPot1">1000 SC</div>
        <div className="playerPot2">1000 SC</div>
        <div className="playerPot3">1000 SC</div>
        <div className="playerPot4">1000 SC</div>
        <div className="playerPot5">1000 SC</div>
        <div className="playerPot6">1000 SC</div>
        <div className="playerPot7">1000 SC</div>
        <div className="playerPot8">1000 SC</div>
        <div className="playerPot9">1000 SC</div>
    </div>
  );
};

export default PlayersPots;
