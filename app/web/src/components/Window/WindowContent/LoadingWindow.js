import React, { useEffect } from "react";
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
    useEffect(() => {
        if (isPlayerSited) {
            console.log("Game room displayed!");
            showGameTable();
            closeWindow();
            setWindowType("");
            console.log("playerSited", isPlayerSited);
        }
    }, [isPlayerSited]);

  return (
    <div className="main-loadingWindow">
    </div>
  );
};

export default LoadingWindow;
