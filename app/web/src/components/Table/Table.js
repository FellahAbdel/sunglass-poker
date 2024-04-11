import React, { useEffect } from "react";
import { useAuth } from "./../Utiles/AuthProvider.jsx";
import { useWindowContext } from "../Utiles/WindowContext.jsx";
import { useTranslation } from "../Utiles/Translations";

//CSS
import "./table.css";
import "./tableCards.css";
import { getStyles } from "../Utiles/useStyles.jsx";
//Components
import Window from "../Window/Window";
import PlayersPlacements from "./PlayersPlacements";
import CardsPlacements from "./CardsPlacements";
import LogoComponent from "../logo/Logo";

const Table = ({
  dealingFlop, 
  playersCardDistributedProp,
  playersCardsShowProp,
}) => {
  const {
    isWindowOpen,
    windowType,
    isGameTableVisible,
  } = useWindowContext();
  const { isLogged } = useAuth();
  const { getTranslatedWord } = useTranslation();

  useEffect(() => {
    console.log("isWindowOpen a changé :", isWindowOpen);
  }, [isWindowOpen]);

  useEffect(() => {
    console.log("isLogged Table:", isLogged);
  }, [isLogged]);

  const classes = getStyles(windowType, isLogged, isGameTableVisible, isWindowOpen);

  return (
    // Table that becomes a container for the menus when they are activated
    <div className={classes.containerTable}>
      {/* the white border line around the table in the middle */}
      <div
        className={`${
          !isWindowOpen ? "table-lineAround" : ""
        } ${
          (!isGameTableVisible || isWindowOpen ) ?
          "disappear" : ""
        }`}
      />

      {/* Game Components */}
      {isGameTableVisible && !isWindowOpen &&
        <>
          <CardsPlacements
            moneyPot={9999999}
            dealingFlop={dealingFlop}
            disappear={isWindowOpen}
            playersCardDistributedProp={playersCardDistributedProp}
          />
          <PlayersPlacements
            playersCardDistributedProp={playersCardDistributedProp}
            playersCardsShowProp={playersCardsShowProp}
            disappear={isWindowOpen}
          />
        </>
      }
      {/*All the panels other than game itself are included in window component*/}
      <Window />

      {/*the only use of logo component - dynamique*/}
      <LogoComponent
        styleClass={classes.logoComponent}
        label={`
        ${["tutorial", "profile", "servers", "create_table", "validation", "shop"].some(type => windowType.includes(type))
        ? getTranslatedWord(`messageLogo.${windowType}`) : "" }`}
      />
    </div>
  );
};

export default Table;
