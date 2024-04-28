import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "../Utiles/Translations";
import "./table.css";

const PlayersPots = ({ players = [], stack = 0 }) => {
  // le premier game est le nom du reducer dans le store
  // le deuxieme game est le nom de la class game dans shared.
    // console.log("playerls in players pots", players);
    // console.log("stack in players pots", stack);

    const localStack= 0;
//   const gameClass = useSelector((state) => state.game.game);

//   // Définir currentStack avec une valeur par défaut de 0
//   const currentStack = gameClass?.pokerTable?.stack || 0;

//   // Définir updatedStack à partir de currentStack
//   const [updatedStack, setUpdatedStack] = useState(currentStack);

//   useEffect(() => {
//     // Mettre à jour updatedStack si currentStack change
//     setUpdatedStack(currentStack);
//   }, [currentStack]);

  const { getTranslatedWord } = useTranslation();
  

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
