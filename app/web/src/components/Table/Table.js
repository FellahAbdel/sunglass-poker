import React, { useEffect, useState } from "react";
import { useAuth } from "./../Utiles/AuthProvider.jsx";
import { useWindowContext } from "../Utiles/WindowContext.jsx";
import { useTranslation } from "../Utiles/Translations";
import { useGameTable } from "../Utiles/GameTableProvider.jsx";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions/clientInteractionsCreator.js";

//CSS
import "./table.css";
import "./tableCards.css";
import { getStyles } from "../Utiles/useStyles.jsx";
//Components
import Window from "../Window/Window";
import PlayersPlacements from "./PlayersPlacements";
import CardsPlacements from "./CardsPlacements";
import LogoComponent from "../logo/Logo";
import PlayersPots from "./PlayersPots";
import TotalPot from "./TotalPot";
import Button from "../button/Button.tsx";
import TextGlitch from "../TextGlitch/TextGlitch.js";

//fonctions
import {
  delayedExecution,
  delayedExecutionWithCancel,
} from "./../Utiles/delay.js";

import { useSelector } from "react-redux";

const Table = ({}) => {
  const { userId } = useAuth();
  const { isWindowOpen, windowType, isGameTableVisible } = useWindowContext();
  const { isLogged } = useAuth();
  const { getTranslatedWord } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  const { isMaster, showWaitingMessage, isFocus, isSpectator } = useGameTable();

  const dispatch = useDispatch();

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

  // useEffect(() => {
  //   console.log("Game state:", gameInfo.game.state);
  // }, [gameInfo]);

  const classes = getStyles(
    windowType,
    isLogged,
    isGameTableVisible,
    isWindowOpen
  );

  const startGame = () => {
    // Logique pour commencer la partie
    console.log("Starting game with roomId:");
    dispatch(actions.startGame(userId));
  };


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
          {showWaitingMessage ? (
            <div className="container-waiting">
              <div className="txt-waiting">{getTranslatedWord("table.waiting")} ...</div>
              {isMaster ? (
                <Button
                  styleClass="btn-gameStart2 back-color1"
                  label={getTranslatedWord("table.start")}
                  onClick={() => startGame()}
                />
              ) : (
                <Button
                  styleClass="btn-gameStart2 back-color1"
                  label={isSpectator ? getTranslatedWord("table.join") : getTranslatedWord("table.spectacle")}
                  onClick={() => startGame()}
                />
              )}
            </div>
          ) : (
            <>
              {/*DISTRIBUTION ANIMATION :
                  in CardPlacements you have the distribution
                  animation which gets handled with a table called 
                  "playersCardDistributed" with 10 booleen members
                  representing each players that gets a card
                  
                  playersCardDistributed is also used in PlayersPlacements
                  that shows which players gets the cards
                  */}
              <CardsPlacements />
              {/*NEEDS playersCardsShow and playersCardDistribution in it*/}
              {/* <PlayersPots/>  */}
              <TotalPot />
            </>
          )}
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
            "ranking"
          ].some((type) => windowType.includes(type))
            ? getTranslatedWord(`messageLogo.${windowType}`)
            : ""
        }`}
      />
    </div>
  );
};

export default Table;
