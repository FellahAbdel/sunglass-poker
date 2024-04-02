import React from "react";
import PlayersProfile from "../gameTable/PlayersProfile/PlayersProfile";
import { useSelector } from "react-redux";

const PlayersPlacements = ({
  playersCardsShowProp,
  playersCardDistributedProp,
  disappear,
}) => {
  const playersInTable = useSelector((state) => state.table.players);

  /*
  EN GROS le pb c est que chuis censé ajouter des joeur vide en attente
  mais je ne sais pas comment remplir els variables en vide sans avoir d'erreur
  
  */
  return (
    <span className={`profiles ${disappear ? "disappear" : ""}`}>
      {playersInTable.map((player, index) => (
        <div key={`profile${index}`} className={`profile profile${index}`}>
          <PlayersProfile
             //status={player.status}
             chips= "1000"//{player?.getPlayerMoney() || null}
             name={player.name}
             cards= {null} //{player.getPlayerCards() || null} 
            // flippingPlayerCards={playersCardsShowProp[index]}
            // gotCards={playersCardDistributedProp[index]}
          />
        </div>
      ))}
    </span>
  );
};

export default PlayersPlacements;
