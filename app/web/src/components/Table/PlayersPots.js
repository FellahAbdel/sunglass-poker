import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "../Utiles/Translations";
import "./table.css";

const PlayersPots = ({ testOnClick1, testOnClick2, testOnClick3 }) => {
  // le premier game est le nom du reducer dans le store
  // le deuxieme game est le nom de la class game dans shared.

  const gameClass = useSelector((state) => state.game.game);
  
  // Définir currentStack avec une valeur par défaut de 0
  const currentStack = gameClass?.pokerTable?.stack || 0;

  // Définir updatedStack à partir de currentStack
  const [updatedStack, setUpdatedStack] = useState(currentStack);

  useEffect(() => {
    // Mettre à jour updatedStack si currentStack change
    setUpdatedStack(currentStack);
  }, [currentStack]);

  const { getTranslatedWord } = useTranslation();

  return (
    <div className="container-playerPots">
      <div className={`container-totalPot`}>
        {getTranslatedWord("table.total")}: {updatedStack.toLocaleString()} SC
      </div>

      <div className="playerPot0" onClick={testOnClick1}>
        1000 SC
      </div>
      <div className="playerPot1" onClick={testOnClick2}>
        1000 SC
      </div>
      <div className="playerPot2" onClick={testOnClick3}>
        1000 SC
      </div>
      <div className="playerPot3">1100 SC</div>
      <div className="playerPot4">1100 SC</div>
      <div className="playerPot5">1000 SC</div>
      <div className="playerPot6">900 SC</div>
      {/* <div className="playerPot7">1000 SC</div> */}
      <div className="playerPot8">1000 SC</div>
      <div className="playerPot9">1000 SC</div>
    </div>
  );
};

export default PlayersPots;
