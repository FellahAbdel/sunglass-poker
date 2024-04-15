import React from "react";
import { useSelector } from "react-redux";
import "./table.css";

const PlayersPots = ({}) => {
  const playersInTable = useSelector((state) => state.game.players);

  return (
    <div className="container-playerPots">
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
