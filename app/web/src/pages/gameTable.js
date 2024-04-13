//react imports
import React, { useState, useEffect } from "react";

import { useAuth } from "./../components/Utiles/AuthProvider";

import { useWindowContext } from "./../components/Utiles/WindowContext";

//css imports
import "./reset.css";
import "./gameTable.css";
import "../components/Utiles/animations.css";
import { getStyles } from "../components/Utiles/useStyles.jsx";

//components imports
import NavbarV2 from "../components/Navbar/NavbarV2";
import BonusPanel from "../components/gameTable/Bonus/BonusPanel";
import Table from "../components/Table/Table";
import GameActionPanel from "../components/gameTable/GameActionPanel/GameActionPanel";
import HandCards from "../components/gameTable/HandCards/HandCards";

import { useSettings } from "./../components/Utiles/SettingsContext.jsx";

const GameTable = () => {
  const { theme } = useSettings();
  const { isLogged } = useAuth();
  const { windowType, isWindowOpen, closeWindow, isGameTableVisible } =
    useWindowContext();
  const classes = getStyles(
    windowType,
    isLogged,
    isGameTableVisible,
    isWindowOpen
  );

  useEffect(() => {
    console.log("isLogged gameTable:", isLogged);
  }, [isLogged]);

  const handleCloseOnClickOutside = (event) => {
    if (isWindowOpen) {
      closeWindow();
    }
  };

  const handleBoxClick = (event) => {
    event.stopPropagation();
  };

  //inGame Fonctions to test-----------------------------------------
  const [dealingFlop, setDealingFlop] = useState([true, true, true]);
  const [handGuide, setHandGuide] = useState("fullHouse");
  const [showHandCard, setShowHandCard] = useState(true);
  const [playersCardsShow, setPlayersCardsShow] = useState([
    1, 0, 0, 1, 1, 0, 0, 0, 0, 1,
  ]);
  const [playersCardDistributed, setPlayersCardDistributed] = useState([
    1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  ]);

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

  //-----------------------------------------inGame functions to test

  return (
    <div
      className="container-main resetall"
      id={theme}
      onClick={handleCloseOnClickOutside}
    >
      {/* css Pattern background */}

      <div className="backdrop" />
      <div className="backdrop2" />

      {/* Navbar or header */}
      <div className="comp-navbar">
        <NavbarV2 />
      </div>

      {/* Menu/Table */}
      <div className={classes.compTable}>
        <Table
          dealingFlop={dealingFlop}
          showCards={[0, 1, 2, 3, 4]}
          playersCardDistributedProp={playersCardDistributed}
          playersCardsShowProp={playersCardsShow}
          onClick={(e) => handleBoxClick}
        />
      </div>

      {/* playing elements opens when logged in */}
      {isGameTableVisible && !isWindowOpen && (
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
