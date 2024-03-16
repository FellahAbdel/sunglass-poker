//react imports
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  useAuth,
  getUserInfo,
  AuthProvider,
} from "./../components/AuthProvider";
import { useWindowContext } from "./../components/WindowContext";

//css imports
import "./gameTable.css";
import "../components/gameTable/Utiles/animations.css";
//components imports
import Navbar from "../components/gameTable/Navbar/Navbar";
import BonusPanel from "../components/gameTable/Bonus/BonusPanel";
import Table from "../components/gameTable/Table/Table";
import GameActionPanel from "../components/gameTable/GameActionPanel/GameActionPanel";
import HandCards from "../components/gameTable/HandCards/HandCards";

const GameTable = () => {
  const [dealingFlop, setDealingFlop] = useState([false, false, false]);
  const [handGuide, setHandGuide] = useState("");
  const [profileMenu, setProfileMenu] = useState(false);
  const [settingsMenu, setSettingsMenu] = useState(false);
  const [showHandCard, setShowHandCard] = useState(false);
  const [playersCardsShow, setPlayersCardsShow] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [playersCardDistributed, setPlayersCardDistributed] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [logInMenu, setLogInMenu] = useState();
  const [tutorialMenu, setTutorialMenu] = useState();

  const { logingIn, logingOut, getUserInfo } = useAuth();
  const { windowType, isWindowOpen, closeWindow, openWindow } = useWindowContext();

  const handleLanguageChange = (language) => {
    console.log("Selected Language:", language);
  };

  const [isLogged, setIsLogged] = useState(false);
  const handleIsLogged = () => {
    setIsLogged(!isLogged);
    console.log("isLogged");
  };

  const handleLogOut = () => {
    logingOut();
    setIsLogged(false);
    setProfileMenu(false);
    setSettingsMenu(false);
  };

  const handleLogInButton = () => {
    setTutorialMenu(false);
    setLogInMenu(!logInMenu);
    console.log("handleLogInButton function called from parent component");
  };

  const handleTutorialButton = () => {
    setLogInMenu(false);
    setTutorialMenu(!tutorialMenu);
  };

  const handleShowHandCard = () => {
    setShowHandCard(!showHandCard);
  };

  const handleProfileMenu = () => {
    setProfileMenu(!profileMenu);
    setSettingsMenu(false);
  };
  const handleSettingsMenu = () => {
    setSettingsMenu(!settingsMenu);
    setProfileMenu(false);
  };

  const handleClickStartGame = () => {
    // Regarder si on est connecté ou pas
    !isLogged && openWindow("login") ;
  };

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

  return (
    <div className="container-main" /*onClick={handleCloseOnClickOutside}*/>
      {/* css Pattern background */}
      <div className="background"></div>
      <div className="backdrop"></div>

      {/* Navbar or header */}
      <div className="comp-navbar">
        <Navbar
          exitOnClick={handleLogOut}
          settingsOnClick={handleSettingsMenu}
          profileOnClick={handleProfileMenu}
          //navbar changes for loggedIn
          isLoggedNavbar={isLogged}
          logInOnClick={handleLogInButton}
          tutorialOnClick={handleTutorialButton}
        />
      </div>

      {/* Menu/Table */}
      <AuthProvider>
        <div
          className={`
          comp-table 
          ${
            (windowType == "login" ||
              windowType == "register" ||
              windowType == "forgot" ||
              windowType == "reset") &&
            "comp-table-login"
          }
          ${windowType == "tutorial" && "comp-table-tutorial"}
          ${isLogged && "comp-table-inGame"}
         
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
            isLoggedOnClick={handleIsLogged}
            isLogged={isLogged}
            onClick={(e) => handleBoxClick}
          />
        </div>
      </AuthProvider>

      {/* playing elements opens when logged in */}
      {isLogged && (
        <>
          <div
            className={`comp-bonus  ${
              profileMenu || settingsMenu ? "slideDown" : "slideUp"
            }`}
          >
            <BonusPanel />
          </div>
          <div
            className={`comp-gameAction ${
              profileMenu || settingsMenu ? "slideDown" : "slideUp"
            }`}
          >
            <GameActionPanel
              handleFoldProp={handleFold}
              handleRaiseProp={handleRaise}
              handleCheckOrCallProp={handleCheckOrCall}
            />
          </div>

          <div
            className={`comp-handCards ${
              profileMenu || settingsMenu ? "slideDown" : "slideUp"
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
