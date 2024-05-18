import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useWindowContext } from "../../Utiles/WindowContext.jsx";

const LoadingWindow = () => {
  const { closeWindow, showGameTable, setWindowType } = useWindowContext();
  const isPlayerSited = useSelector((state) => state.game.playerSited);

  //for server joining from ServerPanel
  useEffect(() => {
    if (isPlayerSited) {
      setTimeout(function () {
        console.log("Game room displayed!");
        showGameTable();
        closeWindow();
        setWindowType("");
        console.log("playerSited", isPlayerSited);
      }, 100);
    }
  }, [isPlayerSited]);

  return <div className="main-loadingWindow"></div>;
};

export default LoadingWindow;
