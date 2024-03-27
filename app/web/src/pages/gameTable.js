//react imports
import React, { useState, useEffect } from "react";

import { useAuth } from "./../components/Utiles/AuthProvider";

import { useWindowContext } from "./../components/Utiles/WindowContext";

//css imports
import "./gameTable.css";
import "../components/Utiles/animations.css";
//components imports
import Navbar from "../components/Navbar/Navbar";
import BonusPanel from "../components/gameTable/Bonus/BonusPanel";
import Table from "../components/Table/Table";
import GameActionPanel from "../components/gameTable/GameActionPanel/GameActionPanel";
import HandCards from "../components/gameTable/HandCards/HandCards";

const GameTable = () => {
  const [dealingFlop, setDealingFlop] = useState([false, false, false]);
  const [handGuide, setHandGuide] = useState("");
  const [profileMenu] = useState(false);
  const [settingsMenu] = useState(false);
  const [showHandCard, setShowHandCard] = useState(false);
  const [playersCardsShow, setPlayersCardsShow] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [playersCardDistributed, setPlayersCardDistributed] = useState([
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  const { logingOut, isLogged } = useAuth();
  const {
    windowType,
    isWindowOpen,
    closeWindow,
    openWindow,
    isGameTableVisible,
  } = useWindowContext();

  const handleLanguageChange = (language) => {
    console.log("Selected Language:", language);
  };

  // const handleIsLogged = () => {
  //   setIsLogged(!isLogged);
  //   console.log("isLogged");
  // };

  const handleClickStartGame = () => {
    if (isLogged) {
      // Si l'utilisateur est connecté, montrez GameTable ou effectuez une action spécifique
      console.log("Démarrer le jeu");
    } else {
      // Si l'utilisateur n'est pas connecté, ouvrez la fenêtre de connexion
      openWindow("login");
    }
  };
  useEffect(() => {
    console.log("isLogged gameTable:", isLogged);
  }, [isLogged]);

  //Navbar buttons handles-----------------------------------------
  const handleLogOutButton = () => {
    logingOut();
    //setProfileMenu(false);
    //setSettingsMenu(false);
    closeWindow();
  };
  const handleLogInButton = () => {
    openWindow("login");
    // setTutorialMenu(false);
    // setLogInMenu(!logInMenu);
    console.log("handleLogInButton function called from parent component");
  };
  const handleTutorialButton = () => {
    openWindow("tutorial");
    // setLogInMenu(false);
    // setTutorialMenu(!tutorialMenu);
    console.log("handleTutorialButton function called from parent component");
  };
  const handleProfileButton = () => {
    openWindow("profile");
    console.log("handleProfileButton function called from parent component");
  };
  const handleSettingsButton = () => {
    openWindow("settings");
    console.log("handleSettingsButton function called from parent component");
  };
  //-----------------------------------------Navbar buttons handles

  //inGame Fonctions to test-----------------------------------------

  const handleFold = () => {
    console.log("handleFold function called from parent component");
    setDealingFlop([!dealingFlop[0], !dealingFlop[1], !dealingFlop[2]]);
    setHandGuide("Full House");
    setShowHandCard(!showHandCard);
  };
  const handleCheckOrCall = () => {
    setPlayersCardDistributed([
      !playersCardDistributed[0],
      !playersCardDistributed[1],
      !playersCardDistributed[2],
      !playersCardDistributed[3],
    ]);
    console.log("handleFold function called from parent component");
  };
  const handleRaise = () => {
    console.log("handleFold function called from parent component");
    setPlayersCardsShow([
      !playersCardsShow[0],
      !playersCardsShow[1],
      !playersCardsShow[2],
    ]);
  };
  const handleCloseOnClickOutside = (event) => {
    if (isWindowOpen) {
      closeWindow();
    }
  };

  const handleBoxClick = (event) => {
    event.stopPropagation();
  };
  //-----------------------------------------inGame functions to test

  return (
    <div className="container-main" onClick={handleCloseOnClickOutside}>
      {/* css Pattern background */}
      <div className="background"></div>
      <div className="backdrop"></div>

      {/* Navbar or header */}
      <div className="comp-navbar">
        <Navbar
          logOutOnClick={handleLogOutButton}
          settingsOnClick={handleSettingsButton}
          profileOnClick={handleProfileButton}
          //navbar changes for loggedIn
          isLoggedNavbar={isLogged}
          logInOnClick={handleLogInButton}
          tutorialOnClick={handleTutorialButton}
        />
      </div>

      {/* Menu/Table */}
      <div
        className={`
          comp-table 
          ${
            (windowType === "login" ||
              windowType === "register" ||
              windowType === "forgot" ||
              windowType === "reset") &&
            "comp-table-login"
          }
          ${windowType === "settings" && "comp-table-login"}
          ${windowType === "tutorial" && "comp-table-tutorial"}
          ${windowType === "" && isLogged && "comp-table-inGame"}
         
      `}
      >
        <Table
          onClickStartGame={handleClickStartGame}
          selectedLanguage={handleLanguageChange}
          dealingFlop={dealingFlop}
          showCards={[0, 1, 2, 3, 4]}
          playersCardDistributedProp={playersCardDistributed}
          playersCardsShowProp={playersCardsShow}
          moneyPot={9999999999}
          // to open the profile and setting menus
          profileMenuActive={profileMenu}
          settingsMenuActive={settingsMenu}
          // LogIn panel
          //isLoggedOnClick={handleIsLogged}
          //isLogged={isLogged}
          onClick={(e) => handleBoxClick}
        />
      </div>

      {/* playing elements opens when logged in */}
      {isGameTableVisible && (
        <>
          <div
            className={`comp-bonus  ${isWindowOpen ? "slideDown" : "slideUp"}`}
          >
            <BonusPanel />
          </div>
          <div
            className={`comp-gameAction ${
              isWindowOpen ? "slideDown" : "slideUp"
            }`}
          >
            <GameActionPanel
            // handleFoldProp={handleFold}
            // handleRaiseProp={handleRaise}
            // handleCheckOrCallProp={handleCheckOrCall}
            />
          </div>

          <div
            className={`comp-handCards ${
              isWindowOpen ? "slideDown" : "slideUp"
            }`}
          >
            <HandCards
              card1={["a", "hearts"]}
              card2={["a", "diamonds"]}
              showHandCardProp={showHandCard}
              handGuideProp={handGuide}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default GameTable;
