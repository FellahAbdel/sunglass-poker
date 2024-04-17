import React, { useEffect, useState } from "react";
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
import PlayersPots from "./PlayersPots" ;

const Table = ({

}) => {
  const { isWindowOpen, windowType, isGameTableVisible } = useWindowContext();
  const { isLogged } = useAuth();
  const { getTranslatedWord } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  //demo test-----------------------------------------
    const [dealingFlop, setDealingFlop] = useState([false, false, false]);
    const [playersCardsShow, setPlayersCardsShow] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [playersCardDistributed, setPlayersCardDistributed] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  
    const testDealingFlop = () => {
      setDealingFlop([!dealingFlop[0], !dealingFlop[1], !dealingFlop[2]]);
    };
    const testDistribution = () => {
      setPlayersCardDistributed([!playersCardDistributed[0], !playersCardDistributed[1], !playersCardDistributed[2], !playersCardDistributed[3], !playersCardDistributed[4], !playersCardDistributed[5], !playersCardDistributed[6], 0, !playersCardDistributed[8], !playersCardDistributed[9]]);
    };
    const testCardsShow = () => {
      setPlayersCardsShow([!playersCardsShow[0], !playersCardsShow[1], !playersCardsShow[2], !playersCardsShow[3], !playersCardsShow[4], !playersCardsShow[5], !playersCardsShow[6], 0, !playersCardsShow[8], !playersCardsShow[9]]);
    };
    //-----------------------------------------demo test


  useEffect(() => {
    console.log("isWindowOpen a changé :", isWindowOpen);
  }, [isWindowOpen]);

  useEffect(() => {
    console.log("isLogged Table:", isLogged);
  }, [isLogged]);

  useEffect(() => {
    if (isWindowOpen && isGameTableVisible) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isWindowOpen, isGameTableVisible]);

  const classes = getStyles(
    windowType,
    isLogged,
    isGameTableVisible,
    isWindowOpen
  );

  return (
    // Table that becomes a container for the menus when they are activated
    <div className={classes.containerTable}>
      {/* the white border line around the table in the middle */}
      <div
        className={`${!isWindowOpen ? "table-lineAround" : ""} ${
          !isGameTableVisible || isWindowOpen ? "disappear" : ""
        }`}
      />

      {/* Game Components */}
      {isGameTableVisible && !isWindowOpen && (
        <>
          <CardsPlacements
            dealingFlop={dealingFlop}
            disappear={isWindowOpen}
            playersCardDistributedProp={playersCardDistributed}
          />
          <PlayersPlacements
            playersCardDistributedProp={playersCardDistributed}
            playersCardsShowProp={playersCardsShow}
            disappear={isWindowOpen}
          />
          <PlayersPots
            testOnClick1={testDealingFlop}
            testOnClick2={testDistribution}
            testOnClick3={testCardsShow}
          />
        </>
      )}
      {/*All the panels other than game itself are included in window component*/}
      <Window />

      <div className={`box-onGameNotif ${isVisible ? "visible" : ""}`}>
        You are still on the game table!
      </div>

      {/*the only use of logo component - dynamique*/}
      <LogoComponent
        styleClass={classes.logoComponent}
        label={`
        ${
          [
            "tutorial",
            "profile",
            "servers",
            "create_table",
            "validation",
            "shop",
          ].some((type) => windowType.includes(type))
            ? getTranslatedWord(`messageLogo.${windowType}`)
            : ""
        }`}
      />
    </div>
  );
};

export default Table;
