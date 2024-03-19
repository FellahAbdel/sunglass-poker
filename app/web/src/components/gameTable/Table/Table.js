import React, { useState, useEffect } from "react";
import { useAuth, getUserInfo, AuthProvider } from "../../AuthProvider";
import { useWindowContext } from "../../WindowContext";

//CSS
import "./table.css";
import "./tableCards.css";
//Components
import ProfileMenu from "../../connectionWindow/WindowContent/ProfileWindow";
import SettingsMenu from "../../connectionWindow/WindowContent/SettingsWindow";
import Window from "../../connectionWindow/Window";
import PlayersPlacements from "./PlayersPlacements";
import CardsPlacements from "./CardsPlacements";
import TextGlitch from "./../TextGlitch/TextGlitch";
import LogoComponent from "../../logo/Logo";
import Button from "../../button/Button.tsx";
import HandCards from "../HandCards/HandCards";

const Table = ({
  dealingFlop, //a list of 3 booleans , to deal the first 3 cards , second 4th card , third 5th card
  showCards,
  profileMenuActive, // a boolean to open the profile menu
  settingsMenuActive, // a boolean to open the settings menu
  playersCardDistributedProp, // a list of 10 booleans to distribute to choosen players
  playersCardsShowProp, // a list of 10 booleans to show the cards of choosen players
  moneyPot, // money on the table
  logingInMenuActive, // to see if the page is logged in
  tutorialMenuActive,
  selectedLanguage,
  logoOnClick,
}) => {
  const {
    openWindow,
    closeWindow,
    isWindowOpen,
    windowType,
    isGameTableVisible,
    toggleGameTableVisibility,
    showGameTable,
  } = useWindowContext();
  const { logingIn, logingOut, getUserInfo, isLogged } = useAuth();

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
      ${windowType == "profil" && "container-profile"}
      ${windowType == "settings" && "container-settings"}
      ${!isLogged && "container-acceuil"}
      ${windowType == "tutorial" && !isLogged && "container-tutorial"}
      ${windowType == "success" && "container-success"}
      ${
        (windowType == "login" ||
          windowType == "register" ||
          windowType == "forgot" ||
          windowType == "reset") &&
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

          {/* dynamique logo , moves according to the menu that is open */}

          {isWindowOpen ? (
            <Window />
          ) : (
            <>
              
                <TextGlitch
                  children={"SunGlassPoker"}
                  style={"glitch-accueil"}
                  glitchStyle={"glitchStyle-accueil"}
                />
                <Button
                  style={"btn-gameStart"}
                  label={isLogged ? "Start Playing" : "Login to Play"}
                  onClick={onClickStartGame}
                />
                
            </>
          )}
        </>
      )}

      <LogoComponent
            onClick={logoOnClick}
            style={`
            logo-acceuil
              ${windowType == "" && "disappear"}
              ${windowType == "profil" && "logo-profile"}
              ${windowType == "tutorial" && "logo-tutorial"}
              ${windowType == "settings" && "logo-login"}
              ${windowType == "success" && "logo-success"}
              ${windowType == "acceuil" && "logo-acceuil"}
              ${
                (windowType == ( "login" || "register" || "forgot" || "reset")) 
                &&
                "logo-login"
              }
            `}
          />
    </div>
  );
};

export default Table;
