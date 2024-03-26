import React, {useEffect } from "react";
import { useAuth} from "./../AuthProvider.jsx";
import { useWindowContext } from "../WindowContext.jsx";

//CSS
import "./table.css";
import "./tableCards.css";
//Components
import ProfileMenu from "../Window/WindowContent/ProfileWindow";
import Window from "../Window/Window";
import PlayersPlacements from "./PlayersPlacements";
import CardsPlacements from "./CardsPlacements";
import TextGlitch from "./../TextGlitch/TextGlitch";
import LogoComponent from "../logo/Logo";
import Button from "../button/Button.tsx";
//import HandCards from "./../gameTable/HandCards/HandCards";

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
  const {isLogged} = useAuth();

  useEffect(() => {
    console.log("isWindowOpen a changé :", isWindowOpen);
  }, [isWindowOpen]);

  useEffect(() => {
    console.log("isLogged Table:", isLogged)
  }, [isLogged]);

  //name , user ID , level , games played , winning ratio , joined Date
  const userInfo = ["Mostafa", "otsuno", "100", "5", "30%", "10/march/2024"];

  const onClickStartGame = () => {
    console.log(
      "isLogged Table onClickStartGame : ",
      isLogged ? "true" : "false"
    );
    if (isLogged) {
      // Si l'utilisateur est connecté, montrez GameTable ou effectuez une action spécifique
      console.log("Utilisateur connecté, on montre la table")
      showGameTable();
    } else {
      // Si l'utilisateur n'est pas connecté, ouvrez la fenêtre de connexion
      console.log("Utilisateur déconnecté, login page")
      openWindow("login");
    }
  };

  return (
    // Table that becomes a container for the menus when they are activated
    // container-table : main css for game table
    // container-menu : table css for settings and profile menu
    // container-logIn : css for when user click on logIn button for table menu to open
    // container-acceuil : for the table to show up in acceuil when game opens
    // container-tutorial : for tuto
    <div
      className={`
      container-table
      ${isLogged ? "table-isLogged" : "table-notLogged"}
      container-${windowType}
      ${windowType === "" && !isGameTableVisible && "container-acceuil"}
      ${
        (windowType === "login" ||
          windowType === "register" ||
          windowType === "forgot" ||
          windowType === "reset") &&
        !isLogged &&
        "container-logIn"
      }  
      `}
    >
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

          {/* Profile menu panel */}
          {profileMenuActive ? <ProfileMenu userInfoProp={userInfo} /> : null}

          {/* Settings menu panel */}
          {isWindowOpen ? (
            <Window />
          ) : null}
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
                  {isLogged ? (<>
                    <Button
                    styleClass={"btn-gameStart btn-gameJoin"}
                    label={"Start a game"}
                    onClick={onClickStartGame}
                    />
                    <Button
                    styleClass={"btn-gameStart btn-gameJoin"}
                    label={"Join a game"}
                    onClick={null}
                    />
                  </>) : (<>
                  {/* */}
                    <Button 
                    styleClass={"btn-gameStart"}
                    label={"Login to Play"}
                    onClick={onClickStartGame}
                    />
                  </>)}


                </div>
                
            </>
          )}
        </>
      )}

      {/* dynamique logo , moves according to the menu that is open */}
      <LogoComponent
            styleClass={`
            logo-acceuil
            logo-${windowType}
              ${(windowType === "" && isGameTableVisible) && "disappear"}

              ${(windowType === "login" ||
                  windowType === "register" ||
                  windowType === "forgot" ||
                  windowType === "reset") 
                &&
                "logo-login"
              }
            `}
            label={`${windowType === "tutorial" ? "Tutorial" : ""}`}
          />
    </div>
  );
};

export default Table;
