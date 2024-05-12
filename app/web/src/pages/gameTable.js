//react imports
import React, { useState, useEffect, useTransition } from "react";

import { useAuth } from "./../components/Utiles/AuthProvider";
import { useGameTable } from "../components/Utiles/GameTableProvider.jsx";

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
import Button from "./../components/button/Button.tsx"
import { useSelector } from "react-redux";

import { useSettings } from "./../components/Utiles/SettingsContext.jsx";
import { useUserData } from "../components/Utiles/useUserData.jsx";
import { useTranslation } from "../components/Utiles/Translations.jsx";
import { withTranslation } from "react-i18next";

const GameTable = () => {
  const { theme, animation } = useSettings();
  const { isLogged } = useAuth();
  const { user } = useUserData();
  const { getTranslatedWord } = useTranslation();
  const { openWindow ,windowType, isWindowOpen, closeWindow, isGameTableVisible } =
    useWindowContext();
  const classes = getStyles(
    windowType,
    isLogged,
    isGameTableVisible,
    isWindowOpen
  );
  const { playerCards } = useGameTable();

  useEffect(() => {
    //console.log("isLogged gameTable:", isLogged);
  }, [isLogged]);

  const handleCloseOnClickOutside = (event) => {
    if (isWindowOpen) {
      closeWindow();
    }
  };

  useEffect(() => {
    console.log("Player cards received:", playerCards);
  }, [playerCards]);

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
            <GameActionPanel />
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
        {/* User coins */}
        <div className={`container-userCoins 
                        ${(windowType === "shop" || windowType === "coins") && "appear"}
                        ${(windowType === "coins") && "center"}`}
                      >
          <div className="userCoinsTop">
          {user.coins.toLocaleString()} SC
          </div>
          {(windowType === "shop" || windowType === "coins") &&
            <Button
                label={windowType === "shop" ? getTranslatedWord("shop.buyMore") : getTranslatedWord("shop.backStore")}
                styleClass={`btn-coinsShop`}
                onClick={windowType === "shop" ? () => openWindow("coins") : () => openWindow("shop")}
              />}
        </div>
    </div>
  );
};

export default GameTable;
