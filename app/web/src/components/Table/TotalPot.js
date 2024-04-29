import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "../Utiles/Translations";
import "./table.css";

const TotalPot = () => {
  const { getTranslatedWord } = useTranslation();

  const gameClass = useSelector((state) => state.game.game);

  // Définir currentStack avec une valeur par défaut de 0
  const currentStack = gameClass?.game?.total || 0;

  // Définir updatedStack à partir de currentStack
  const [updatedStack, setUpdatedStack] = useState(currentStack);

  useEffect(() => {
    // Mettre à jour updatedStack si currentStack change
    setUpdatedStack(currentStack);
  }, [currentStack]);

  return (
    <div className={`container-playerPots`}>
      <div className={`container-totalPot`}>
        {getTranslatedWord("table.total")}: {updatedStack.toLocaleString()} SC
      </div>
    </div>
  );
};

export default TotalPot;
