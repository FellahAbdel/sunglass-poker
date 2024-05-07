import React from "react";
import { useTranslation } from "../Utiles/Translations";
import "./table.css";
import { useGameTable } from "../Utiles/GameTableProvider";

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
