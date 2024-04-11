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
import TextGlitch from "./../TextGlitch/TextGlitch";
import LogoComponent from "../logo/Logo";
import Button from "../button/Button.tsx";

//Redux
import { useDispatch } from "react-redux";
import { startGame } from "../../store/actions/actionsCreator";

const Table = ({
  dealingFlop, //a list of 3 booleans , to deal the first 3 cards , second 4th card , third 5th card
  //showCards,
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
  const { getTranslatedWord } = useTranslation();

  useEffect(() => {
    console.log("isWindowOpen a changé :", isWindowOpen);
  }, [isWindowOpen]);

  useEffect(() => {
    console.log("isLogged Table:", isLogged);
  }, [isLogged]);

  const dispatch = useDispatch();

  //name , user ID , level , games played , winning ratio , joined Date
  //const player = useSelector((state) => state.game.player);

  const onClickStartGame = () => {
    console.log(
      "isLogged Table onClickStartGame : ",
      isLogged ? "true" : "false"
    );
    dispatch(startGame());
    // Si l'utilisateur est connecté, montrez GameTable ou effectuez une action spécifique
    console.log("Utilisateur connecté, on montre la table");
    showGameTable();
  };

  const showGameList = () => {
    if (isLogged) {
      openWindow("servers");
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
      {/*the white border line around the table in the middle*/}
      <div
        className={`${classes.containerTable} ${
          !isWindowOpen && "table-lineAround"
        } ${
          ((windowType === "" && !isGameTableVisible) || isWindowOpen) &&
          "disappear"
        }`}
      />

      {/* Acceuil table if not logged in and game table if logged in */}
      {isGameTableVisible && !isWindowOpen ? (
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
              {/* <div className="container-startButtons">
                {isLogged ? (
                  <>
                    <Button
                      styleClass={"btn-gameStart btn-gameJoin back-color1"}
                      label={getTranslatedWord("game.startGame")}
                      onClick={onClickStartGame}
                    />
                    <Button
                      styleClass={"btn-gameStart btn-gameJoin back-color1"}
                      label={getTranslatedWord("game.joinGame")}
                      onClick={showGameList}
                    />
                  </>
                ) : (
                  <>
                    <Button
                      styleClass={"btn-gameStart btn-gameJoin back-color2"}
                      label={getTranslatedWord("game.loginPlay")}
                      onClick={() => openWindow("login")}
                    />
                    <Button
                      styleClass={"btn-gameStart btn-gameJoin back-color2"}
                      label={getTranslatedWord("game.signupPlay")}
                      onClick={() => openWindow("register")}
                    />
                  </>
                )}
              </div> */}
            </>
          )}
        </>
      )}

      {/* dynamique logo , moves according to the menu that is open */}
      <LogoComponent
        styleClass={classes.logoComponent}
        label={
          `${
            windowType === "tutorial"
              ? getTranslatedWord("messageLogo.tutorial")
              : ""
          }` +
          `${
            windowType === "profile"
              ? getTranslatedWord("messageLogo.profile")
              : ""
          }` +
          `${
            windowType === "servers"
              ? getTranslatedWord("messageLogo.listeTable")
              : ""
          }` +
          `${
            windowType === "create_table"
              ? getTranslatedWord("messageLogo.createTable")
              : ""
          }` +
          `${
            windowType === "validation"
              ? getTranslatedWord("messageLogo.validation")
              : ""
          }` +
          `${
            windowType === "shop" ? getTranslatedWord("messageLogo.shop") : ""
          }`
        }
      />
    </div>
  );
};

export default Table;
