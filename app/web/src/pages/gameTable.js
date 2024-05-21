//react imports
import React, { useEffect, useState } from "react";
import { useAuth } from "./../components/Utiles/AuthProvider";
import { useGameTable } from "../components/Utiles/GameTableProvider.jsx";
import { useWindowContext } from "./../components/Utiles/WindowContext";
import useAudio from "../hooks/useAudio.js";

//css imports
import "./gameTable.css";
import "../components/Utiles/animations.css";
import { getStyles } from "../components/Utiles/useStyles.jsx";

//components imports
import NavbarV2 from "../components/Navbar/NavbarV2";
import BonusPanel from "../components/gameTable/Bonus/BonusPanel";
import Table from "../components/Table/Table";
import GameActionPanelV2 from "../components/gameTable/GameActionPanel/GameActionPanelV2";
import HandCards from "../components/gameTable/HandCards/HandCards";
import DynamicBar from "../components/Navbar/DynamicBar.js";
import { useSettings } from "./../components/Utiles/SettingsContext.jsx";

const GameTable = () => {
  const { theme, animation , sound , volume } = useSettings();
  const { isLogged } = useAuth();
  const { windowType, isWindowOpen, closeWindow, isGameTableVisible } =
    useWindowContext();
  const { playerBonus, playerCards, showWaitingMessage , isSpectator} = useGameTable();
  const classes = getStyles(
    windowType,
    isLogged,
    isGameTableVisible,
    isWindowOpen,
    showWaitingMessage,
    isSpectator
  );
  const [gameElementsAppear, setGameElementsAppear] = useState(isGameTableVisible && !isWindowOpen && !showWaitingMessage && !isSpectator);

  useEffect(() => {
    setGameElementsAppear(isGameTableVisible && !isWindowOpen && !showWaitingMessage && !isSpectator);
  }, [isGameTableVisible,isWindowOpen,showWaitingMessage,isSpectator]);

  const ambientSoundURLLight = "static/media/assets/sounds/waveSound2.mp3";
  const ambientSoundURLDark = "static/media/assets/sounds/casinoJazz.mp3";

  const audioRef = useAudio(ambientSoundURLLight, ambientSoundURLDark, theme, sound, volume);

  useEffect(() => {
    if (sound && audioRef.current) {
      audioRef.current.play().catch(error => console.error("Playback was prevented:", error));
    }
  }, [sound, audioRef, theme, windowType]);

  // Handle closing the window when clicking outside
  const handleCloseOnClickOutside = (event) => {
    if (isWindowOpen && (windowType !== "loading" && windowType !=="validationCode")) {
      closeWindow();
    }
  };

  // Prevent event propagation when clicking inside the box
  const handleBoxClick = (event) => {
    event.stopPropagation();
  };

  // undraggable img
  useEffect(() => {
    const disableDrag = (event) => {
      if (event.target.tagName === "IMG") {
        event.preventDefault();
      }
    };
    document.addEventListener('dragstart', disableDrag);
    return () => {
      document.removeEventListener('dragstart', disableDrag);
    };
  }, []);

  return (
    <div
      className={`container-main unselectable ${animation ? "" : "no-animation"}`}
      id={theme}
      onClick={handleCloseOnClickOutside}
    >
      {/* css Pattern background */}
      {theme === "light" && (
        <img
          className="backdrop"
          src="static/media/assets/images/backdrop/backdrop2.jpg"
          alt="backdrop"
        />
      )}
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
          <div
            className={`comp-bonus  ${gameElementsAppear && "appear"}`}
          >
            {playerBonus !== undefined && gameElementsAppear && (
              <BonusPanel
                nbHearts={playerBonus.H}
                nbDiamonds={playerBonus.D}
                nbSpades={playerBonus.S}
                nbClubs={playerBonus.C}
              />
            )}
          </div>
          <div
            className={`comp-gameAction ${gameElementsAppear && "appear"}`}
          >
            {gameElementsAppear && <GameActionPanelV2 />}
          </div>

          <div
            className={`comp-handCards ${!isWindowOpen && "appear"}`}
          >
            {playerCards[0] !== undefined &&
              playerCards[1] !== undefined &&
              playerCards.length === 2 &&
              isGameTableVisible && !isWindowOpen && !isSpectator && (
                <HandCards
                  card1={playerCards[0]}
                  card2={playerCards[1]}
                  showHandCardProp={[true, true]}
                  handGuideProp={"straight"}
                />
              )}
          </div>

      <DynamicBar />
    </div>
  );
};

export default GameTable;
