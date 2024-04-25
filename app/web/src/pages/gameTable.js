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
import { useSelector } from "react-redux";

import { useSettings } from "./../components/Utiles/SettingsContext.jsx";

const GameTable = () => {
  const { theme, animation } = useSettings();
  const { isLogged } = useAuth();
  const { windowType, isWindowOpen, closeWindow, isGameTableVisible } =
    useWindowContext();
  const classes = getStyles(
    windowType,
    isLogged,
    isGameTableVisible,
    isWindowOpen
  );
  const { userId } = useAuth();
  const [updatedPlayers, setUpdatedPlayers] = useState([]);

  const playersInTable = useSelector((state) => state.game.players);
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

  //-----------------------------------------inGame functions to test

  return (
    <div
      className={`container-main resetall ${animation ? "" : "no-animation"}`}
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
        <Table onClick={(e) => handleBoxClick} />
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
            {updatedPlayers.length > 0 &&
              updatedPlayers[0].playerCards.length >= 2 && (
                <HandCards
                  card1={updatedPlayers[0].playerCards[0]}
                  card2={updatedPlayers[0].playerCards[1]}
                  showHandCardProp={[true, true]}
                  handGuideProp={"straight"} // Assumez que vous avez cette prop pour une raison
                />
              )}
          </div>
        </>
      )}
    </div>
  );
};

export default GameTable;
