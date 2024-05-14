import React, { useEffect, useState } from "react";
import { useAuth } from "./../Utiles/AuthProvider.jsx";
import { useWindowContext } from "../Utiles/WindowContext.jsx";
import { useTranslation } from "../Utiles/Translations";
import { useGameTable } from "../Utiles/GameTableProvider.jsx";

//CSS
import "./table.css";
import "./tableCards.css";
import { getStyles } from "../Utiles/useStyles.jsx";
//Components
import Window from "../Window/Window";
import PlayersPlacements from "./PlayersPlacements";
import CardsPlacements from "./CardsPlacements";
import LogoComponent from "../logo/Logo";
import TotalPot from "./TotalPot";

const Table = ({}) => {
  const { isWindowOpen, windowType, isGameTableVisible } = useWindowContext();
  const { isLogged } = useAuth();
  const { getTranslatedWord } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const { isMaster, showWaitingMessage, isFocus, isSpectator } = useGameTable();


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

  useEffect(() => {
    console.log("isFocus TABLE:", isFocus);
  }, [isFocus]);

  const classes = getStyles(
    windowType,
    isLogged,
    isGameTableVisible,
    isWindowOpen,
    showWaitingMessage
  );

  return (
    // Table that becomes a container for the menus when they are activated
    <div className={classes.containerTable}>
      {/* the white border line around the table in the middle */}
      <div
        className={`${!isWindowOpen ? "table-lineAround" : ""} 
        ${!isGameTableVisible || isWindowOpen ? "disappear" : ""}
        ${showWaitingMessage ? "table-lineAround-waiting" : ""}`}
      />

      {/* Game Components */}
      {isGameTableVisible && !isWindowOpen && (
        <>
          {/*NEEDS DealingFlop and playersCardDistribution in it*/}
          <PlayersPlacements showMiddle={!showWaitingMessage} />
          {/* Afficher le bouton "Commencer la partie" si le bouton est visible */}

          {/*DISTRIBUTION ANIMATION :
          in CardPlacements you have the distribution
          animation which gets handled with a table called 
          "playersCardDistributed" with 10 booleen members
          representing each players that gets a card
          
          playersCardDistributed is also used in PlayersPlacements
          that shows which players gets the cards
          */}
          {/* <CardsPlacements />
          {/*NEEDS playersCardsShow and playersCardDistribution in it*/}
          {/* <PlayersPots/>  
          <TotalPot /> */}
          <CardsPlacements />
          <TotalPot />
        </>
      )}
      {/*All the panels other than game itself are included in window component*/}
      <Window />

      <div className={`box-onGameNotif ${isVisible ? "visible" : ""}`}>
        {getTranslatedWord("table.inGame")}!
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
            "ranking",
          ].some((type) => windowType.includes(type))
            ? getTranslatedWord(`messageLogo.${windowType}`)
            : ""
        }`}
      />
    </div>
  );
};

export default Table;
