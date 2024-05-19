import React, { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useWindowContext } from "../../Utiles/WindowContext.jsx";

/**
 * LoadingWindow component handles the loading state while a player is waiting to join a game.
 * It listens for changes in the `playerSited` state from the Redux store to transition the UI.
 */
const LoadingWindow = () => {
  const { closeWindow, showGameTable, setWindowType } = useWindowContext();
  const isPlayerSited = useSelector((state) => state.game.playerSited);

  //for server joining from ServerPanel
  const handlePlayerSited = useCallback(() => {
    if (isPlayerSited) {
      showGameTable();
      closeWindow();
      setWindowType("");
    }
  }, [isPlayerSited, showGameTable, closeWindow, setWindowType]);

  useEffect(() => {
    handlePlayerSited();
  }, [isPlayerSited, handlePlayerSited]);

  return <div className="main-loadingWindow"></div>;
};

export default LoadingWindow;
