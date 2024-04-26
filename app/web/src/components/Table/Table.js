import React, { useEffect, useState } from "react";
import { useAuth } from "./../Utiles/AuthProvider.jsx";
import { useWindowContext } from "../Utiles/WindowContext.jsx";
import { useTranslation } from "../Utiles/Translations";
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

  const [updatedPlayers, setUpdatedPlayers] = useState([]);
  const [startButtonVisible, setStartButtonVisible] = useState(false);
  const playersInTable = useSelector((state) => state.game.players);

  const gameInfo = useSelector((state) => state.game);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("isWindowOpen a changé :", isWindowOpen);
  }, [isWindowOpen]);

  useEffect(() => {
    console.log("isLogged Table:", isLogged);
  }, [isLogged]);

  //   const onClickStartGame = () => {
  //     dispatch(startGame());
  //   };

  useEffect(() => {
    if (isWindowOpen && isGameTableVisible) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isWindowOpen, isGameTableVisible]);

  useEffect(() => {
    const currentUserData = playersInTable.find(
      (player) => player.id === userId
    );
    if (
      currentUserData &&
      currentUserData.playerCards &&
      currentUserData.playerCards.length >= 2
    ) {
      const card1 = [
        currentUserData.playerCards[0].number,
        currentUserData.playerCards[0].color,
      ];
      const card2 = [
        currentUserData.playerCards[1].number,
        currentUserData.playerCards[1].color,
      ];
      setUpdatedPlayers([{ ...currentUserData, playerCards: [card1, card2] }]);
    } else {
      setUpdatedPlayers([]);
    }
  }, [playersInTable, userId]);

  useEffect(() => {
    // Si le jeu n'a pas encore commencé et que l'utilisateur est le maître du jeu,
    // Afficher le bouton de démarrage
    if (!gameInfo.gameStarted && gameInfo.master === userId) {
      setStartButtonVisible(true);
    } else {
      setStartButtonVisible(false);
    }
  }, [gameInfo, userId]);

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
    dispatch(actions.startGame());
  };

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
          {/*DISTRIBUTION ANIMATION :
           in CardPlacements you have the distribution
           animation which gets handled with a table called 
           "playersCardDistributed" with 10 booleen members
           representing each players that gets a card
           
           playersCardDistributed is also used in PlayersPlacements
           that shows which players gets the cards
           */}
          <CardsPlacements />{" "}
          {/*NEEDS DealingFlop and playersCardDistribution in it*/}
          <PlayersPlacements />{" "}
          {/*NEEDS playersCardsShow and playersCardDistribution in it*/}
          {/* <PlayersPots/>  */}
          <TotalPot />
          {/* Afficher le bouton "Commencer la partie" si le bouton est visible */}
          {gameInfo && gameInfo.game && gameInfo.game.state === "waiting" && (
            <>
              <TextGlitch
                children={"En attente de joueurs"}
                styleClass={"glitch-accueil"}
                glitchStyle={"glitchStyle-accueil"}
              />
              <Button
                styleClass="btn-connectionDefault login-button back-color1"
                label={"Commencer la partie"}
                onClick={startGame}
              />
            </>
          )}
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
