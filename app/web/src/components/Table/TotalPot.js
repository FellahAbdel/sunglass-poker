import React from "react";
import { useTranslation } from "../Utiles/Translations";
import "./table.css";
import { useGameTable } from "../Utiles/GameTableProvider";

/**
 * TotalPot displays the total amount of chips currently in the game's pot.
 * It fetches the total pot value from the game context and displays it in a formatted manner.
 */
const TotalPot = () => {
  const { total } = useGameTable();
  const { getTranslatedWord } = useTranslation();

  return (
    <div className={`container-playerPots`}>
      <div className={`container-totalPot`}>
        {getTranslatedWord("table.total")}: {total.toLocaleString()} SC
      </div>
    </div>
  );
};

export default TotalPot;
