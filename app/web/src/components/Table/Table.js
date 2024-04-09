import React, { useEffect } from "react";
import { useAuth } from "./../Utiles/AuthProvider.jsx";
import { useWindowContext } from "../Utiles/WindowContext.jsx";

//CSS
import "./table.css";
import "./tableCards.css";
import { getStyles } from "../Utiles/useStyles.jsx";
//Components
import ProfileMenu from "../Window/WindowContent/ProfileWindow";
import Window from "../Window/Window";
import PlayersPlacements from "./PlayersPlacements";
import CardsPlacements from "./CardsPlacements";
import TextGlitch from "./../TextGlitch/TextGlitch";
import LogoComponent from "../logo/Logo";
import Button from "../button/Button.tsx";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { startGame } from "../../store/actions/clientInteractionsCreator.js";

const Table = ({
  dealingFlop, //a list of 3 booleans , to deal the first 3 cards , second 4th card , third 5th card
  showCards,
  profileMenuActive, // a boolean to open the profile menu
  settingsMenuActive, // a boolean to open the settings menu
  playersCardDistributedProp, // a list of 10 booleans to distribute to choosen players
  playersCardsShowProp, // a list of 10 booleans to show the cards of choosen players
  moneyPot, // money on the table
}) => {
  const {
    openWindow,
    isWindowOpen,
    windowType,
    isGameTableVisible,
    showGameTable,
  } = useWindowContext();
  const { isLogged } = useAuth();

  useEffect(() => {
    console.log("isWindowOpen a changé :", isWindowOpen);
  }, [isWindowOpen]);

  useEffect(() => {
    console.log("isLogged Table:", isLogged);
  }, [isLogged]);



  const dispatch = useDispatch();

  //name , user ID , level , games played , winning ratio , joined Date
  const player = useSelector((state) => state.game.player);
  const isGameStarted = useSelector(state => state.game.gameStarted); // Get the gameStarted state from redux store
  useEffect(() => {
    console.log("IsGameStarted: ",isGameStarted)
    // Check if the game has started whenever isGameStarted changes
    if (isGameStarted) {
      showGameTable();
    }
  }, [isGameStarted]);


  const onClickStartGame = () => {
    console.log(
      "isLogged Table onClickStartGame : ",
      isLogged ? "true" : "false"
    );
    if (isLogged) {
      dispatch(startGame());
      // Si l'utilisateur est connecté, montrez GameTable ou effectuez une action spécifique
      console.log("Utilisateur connecté, on montre la table");
      // showGameTable();
    } else {
      // Si l'utilisateur n'est pas connecté, ouvrez la fenêtre de connexion
      console.log("Utilisateur déconnecté, login page");
      openWindow("login");
    }
  };

  const showGameList = () => {
    if (isLogged) {
      openWindow("list_table");
    } else {
      openWindow("login");
    }
  };
  const classes = getStyles(windowType, isLogged, isGameTableVisible);

  return (
    // Table that becomes a container for the menus when they are activated
    // container-table : main css for game table
    // container-menu : table css for settings and profile menu
    // container-logIn : css for when user click on logIn button for table menu to open
    // container-acceuil : for the table to show up in acceuil when game opens
    // container-tutorial : for tuto
    <div className={classes.containerTable}>
      {/* Acceuil table if not logged in and game table if logged in */}
      {isGameTableVisible ? (
        <>
          {/* cards and the pot in the center of the table */}
          <CardsPlacements
            moneyPot={moneyPot}
            dealingFlop={dealingFlop}
            disappear={isWindowOpen}
            playersCardDistributedProp={playersCardDistributedProp}
          />

          {/* players around the table */}
          <PlayersPlacements
            playersCardDistributedProp={playersCardDistributedProp}
            playersCardsShowProp={playersCardsShowProp}
            disappear={isWindowOpen}
          />

          {/* Settings menu panel */}
          {isWindowOpen && <Window />}
        </>
      ) : (
        <>
          {/* Acceuil */}
          {isWindowOpen ? (
            <Window />
          ) : (
            <>
              <TextGlitch
                children={"SunGlassPoker"}
                styleClass={"glitch-accueil"}
                glitchStyle={"glitchStyle-accueil"}
              />
              <div className="container-startButtons">
                {isLogged ? (
                  <>
                    <Button
                      styleClass={"btn-gameStart btn-gameJoin back-color1"}
                      label={"Start a game"}
                      onClick={onClickStartGame}
                    />
                    <Button
                      styleClass={"btn-gameStart btn-gameJoin back-color1"}
                      label={"Join a game"}
                      onClick={showGameList}
                    />
                  </>
                ) : (
                  <>
                    {/* Bouton affiché si l'utilisateur n'est pas connecté */}
                    <Button
                      styleClass={"btn-gameStart back-color2"}
                      label={"Login to Play"}
                      onClick={onClickStartGame}
                    />
                  </>
                )}
              </div>
            </>
          )}
        </>
      )}

      {/* dynamique logo , moves according to the menu that is open */}
      <LogoComponent
        styleClass={classes.logoComponent}
        label={`
          ${windowType === "tutorial" ? "Tutorial" : ""}
          ${windowType === "profile" ? "Profile" : ""}
          ${windowType === "list_table" ? "JOIN A GAME" : ""}
          ${windowType === "create_table" ? "CREATE A NEW GAME" : ""}
        `}
      />
    </div>
  );
};

export default Table;
