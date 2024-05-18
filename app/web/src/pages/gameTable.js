//react imports
import React, { useEffect } from "react";
import { useAuth } from "./../components/Utiles/AuthProvider";
import { useGameTable } from "../components/Utiles/GameTableProvider.jsx";
import { useWindowContext } from "./../components/Utiles/WindowContext";

//css imports
import "./gameTable.css";
import "../components/Utiles/animations.css";
import { getStyles } from "../components/Utiles/useStyles.jsx";

//components imports
import NavbarV2 from "../components/Navbar/NavbarV2";
import BonusPanel from "../components/gameTable/Bonus/BonusPanel";
import Table from "../components/Table/Table";
import GameActionPanel from "../components/gameTable/GameActionPanel/GameActionPanel";
import GameActionPanelV2 from "../components/gameTable/GameActionPanel/GameActionPanelV2";
import HandCards from "../components/gameTable/HandCards/HandCards";
import DynamicBar from "../components/Navbar/DynamicBar.js";
import { useSettings } from "./../components/Utiles/SettingsContext.jsx";

const GameTable = () => {
  const { theme, animation } = useSettings();
  const { isLogged } = useAuth();
  const { windowType, isWindowOpen, closeWindow, isGameTableVisible } =
    useWindowContext();
  const { playerBonus, playerCards ,showWaitingMessage } = useGameTable();
  const classes = getStyles(
    windowType,
    isLogged,
    isGameTableVisible,
    isWindowOpen,
    showWaitingMessage
  );

  const handleCloseOnClickOutside = (event) => {
    if (isWindowOpen && windowType !== "loading") {
      closeWindow();
    }
  };

  useEffect(() => {
    console.log("Player cards and bonus received:", playerCards, playerBonus);
  }, [playerBonus, playerCards]);

  const handleBoxClick = (event) => {
    event.stopPropagation();
  };

  //-----------------------------------------inGame functions to test

  return (
    <div
      className={`container-main ${animation ? "" : "no-animation"}`}
      id={theme}
      onClick={handleCloseOnClickOutside}
    >
      {/* css Pattern background */}

      {theme === "light" &&<img className="backdrop"  src="static/media/assets/images/backdrop/backdrop2.jpg" alt="backdrop"/>}
      <div className="backdrop"/>
      <div className="backdrop2"/>

      {/* Navbar or header */}
      <div className="comp-navbar">
        <NavbarV2 />
      </div>

      {/* Menu/Table */}
      <div className={classes.compTable}>
        <Table onClick={(e) => handleBoxClick} />
      </div>

      {/* playing elements opens when logged in */}
      {isGameTableVisible && !isWindowOpen && (
        <>
          <div
            className={`comp-bonus  ${(isWindowOpen || showWaitingMessage) ? "slideDown" : "slideUp"}`}
          >
            {playerBonus !== undefined && ( 
              <BonusPanel 
                nbHearts = {playerBonus.H}
                nbDiamonds = {playerBonus.D}
                nbSpades = {playerBonus.S}
                nbClubs = {playerBonus.C}
              />
            )}
          </div>
          <div
            className={`comp-gameAction ${
              (isWindowOpen || showWaitingMessage)? "slideDown" : "slideUp"
            }`}
          >
            {<GameActionPanelV2/>}
          </div>

          <div
            className={`comp-handCards ${
              isWindowOpen ? "slideDown" : "slideUp"
            }`}
          >
            {playerCards[0] !== undefined &&
              playerCards[1] !== undefined &&
              playerCards.length === 2 && (
                <HandCards
                  card1={playerCards[0]}
                  card2={playerCards[1]}
                  showHandCardProp={[true, true]}
                  handGuideProp={"straight"}
                />
              )}
          </div>
        </>
      )}
      <DynamicBar />
    </div>
  );
};

export default GameTable;
