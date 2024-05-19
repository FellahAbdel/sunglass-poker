import React, { useEffect, useState } from "react";
import { useAuth } from "./../Utiles/AuthProvider.jsx";
import { useWindowContext } from "../Utiles/WindowContext.jsx";
import { useTranslation } from "../Utiles/Translations";
import { useGameTable } from "../Utiles/GameTableProvider.jsx";
//CSS
import "./table.css";
import "./tableCards.css";
import { getStyles } from "../Utiles/useStyles.jsx";
//Components
import Window from "../Window/Window";
import PlayersPlacements from "./PlayersPlacements";
import CardsPlacements from "./CardsPlacements";
import LogoComponent from "../logo/Logo";
import TotalPot from "./TotalPot";
import { useSettings } from "../Utiles/SettingsContext.jsx";
/**
 * The Table component serves as the primary UI container for the game, 
 * including players' placements, cards, and other game-related information 
 * based on the visibility state controlled through window context.
 */
const Table = ({}) => {
  const { theme } = useSettings();
  const { isWindowOpen, windowType, isGameTableVisible } = useWindowContext();
  const { isLogged } = useAuth();
  const { getTranslatedWord } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const { showWaitingMessage, isFocus } = useGameTable();

  // Effect to log window open status
  useEffect(() => {
    console.log("isWindowOpen a changé :", isWindowOpen);
  }, [isWindowOpen]);

  // Effect to log login status
  useEffect(() => {
    console.log("isLogged Table:", isLogged);
  }, [isLogged]);

  // Update visibility based on window and game table visibility states
  useEffect(() => {
    if (isWindowOpen && isGameTableVisible) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isWindowOpen, isGameTableVisible]);

  // Log focus state changes
  useEffect(() => {
    console.log("isFocus TABLE:", isFocus);
  }, [isFocus]);

  // Dynamic class assignment based on current UI context
  const classes = getStyles(
    windowType,
    isLogged,
    isGameTableVisible,
    isWindowOpen,
    showWaitingMessage
  );

  return (
    // Table that becomes a container for the menus when they are activated
    <div className={classes.containerTable}>
      {/* table carpet in game */}
      {isGameTableVisible && !isWindowOpen &&
        (theme === "dark" ? 
          <img className="table-carpet" src="static/media/assets/images/texture/carpetlow-bnw.jpg" alt="table carpet"/>
        :
          <img className="table-carpet" src="static/media/assets/images/texture/carpetlow.jpg" alt="table carpet"/>
        )
      }
      {/* the white border line around the table in the middle */}
      <div
        className={`${!isWindowOpen ? "table-lineAround" : ""} 
        ${!isGameTableVisible || isWindowOpen ? "disappear" : ""}
        ${showWaitingMessage ? "table-lineAround-waiting" : ""}`}
      />

      {/* Game Components */}
      {isGameTableVisible && !isWindowOpen && (
        <>
          <PlayersPlacements showMiddle={!showWaitingMessage} />
          <CardsPlacements />
          <TotalPot />
        </>
      )}

      {/* Window component for rendering non-game related UI elements */}
      <Window />

      {/* notifying the player that they are still in game in case they open an other window while playing */}
      <div className={`box-onGameNotif ${isVisible ? "visible" : ""}`}>
        {getTranslatedWord("table.inGame")}!
      </div>

      {/* Dynamic usage of the LogoComponent, content changes based on the current window type */}
      <LogoComponent
        styleClass={classes.logoComponent}
        label={`
        ${
          [
            "tutorial",
            "profile",
            "servers",
            "create_table",
            "validation",
            "shop",
            "ranking",
          ].some((type) => windowType.includes(type))
            ? getTranslatedWord(`messageLogo.${windowType}`)
            : ""
        }`}
        loading = {windowType==="loading"}
      />
    </div>
  );
};

export default Table;
