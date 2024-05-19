import React, { useEffect, useState } from "react";
import "./dynamicBar.css";
import { useAuth } from "./../Utiles/AuthProvider.jsx";
import { useWindowContext } from "../Utiles/WindowContext";
import { formatNumber } from "./../Utiles/NumberFormat";
import Button from "./../button/Button.tsx";
import { useUserData } from "../Utiles/useUserData.jsx";
import { useTranslation } from "./../Utiles/Translations.jsx";
import { useGameTable } from "../Utiles/GameTableProvider.jsx";
import * as actions from "../../store/actions/clientInteractionsCreator.js";
import { useDispatch } from "react-redux";

/**
 * DynamicBar displays a dynamic UI based on the context of user interactions and game state.
 * It features user coins, game controls, and server status based on various conditions from context providers.
 */
const DynamicBar = () => {
  const { userId } = useAuth();
  const { openWindow, windowType, isGameTableVisible, isWindowOpen } = useWindowContext();
  const { isMaster, showWaitingMessage , isSpectator } = useGameTable();
  const { user } = useUserData();
  const { getTranslatedWord } = useTranslation();
  const { serverName } = useGameTable();
  const dispatch = useDispatch();
  const [notEnoughSC, setNotEnoughSC] = useState(user?.coins < 20);

  /**
   * Starts the game by dispatching the startGame action with the user's ID.
   */
  const startGame = () => {
    console.log("Starting game with roomId:");
    dispatch(actions.startGame(userId));
  };

  // Effect to log the waiting message state for debugging.
  useEffect(() => {
    console.log("showWaitingMessage:", showWaitingMessage);
  }, [showWaitingMessage]);

  useEffect(() => {
    setNotEnoughSC(user?.coins < 20);
  }, [user?.coins]);

  return (
    <>
      {/* User coins */}
      <div
        className={`container-userCoins 
                            ${
                              (windowType === "shop" ||
                                windowType === "coins") &&
                              "appear"
                            }
                            ${windowType === "coins" && "center"}`}
      >
        <div className="userCoinsTop">{(user.coins)} SC</div>
        {(windowType === "shop" || windowType === "coins") && (
          <Button
            label={
              windowType === "shop"
                ? getTranslatedWord("shop.buyMore")
                : getTranslatedWord("shop.backStore")
            }
            styleClass={`btn-coinsShop`}
            onClick={
              windowType === "shop"
                ? () => openWindow("coins")
                : () => openWindow("shop")
            }
          />
        )}
      </div>

      {/* Create a game button */}
      <div
        className={`container-userCoins 
                            ${windowType === "servers" && "appear"}`}
      >
        <Button
          label={getTranslatedWord("game.createAgame")}
          styleClass={`btn-coinsShop btn-pnl-createAgame`}
          onClick={() => openWindow("create_table")}
        />
      </div>

      {/* Server Name */}
      <div
        className={`container-serverInfo back-color1 ${
          isGameTableVisible && "appear"
        }`}
      >
        {serverName ? serverName : getTranslatedWord("game.noActiveServer")}
      </div>

      {/* Waiting panel and start button */}
      {isGameTableVisible && 
        <div className={`container-waiting ${showWaitingMessage && isGameTableVisible && !isWindowOpen && "appear"}`}>

          <div className="txt-waiting">
          {notEnoughSC ? 
            getTranslatedWord("game.notEnoughSC")
            :
            getTranslatedWord("table.waiting")
          }
          {" "}!
          </div>
          {!notEnoughSC && (<>
            {isMaster ? (
              <Button
                styleClass="btn-gameStart2 back-color1"
                label={getTranslatedWord("table.start")}
                onClick={() => startGame()}
              />
            ) : (
              <Button
                styleClass="btn-gameStart2 back-color1"
                label={
                  isSpectator
                    ? getTranslatedWord("table.join")
                    : getTranslatedWord("table.spectacle")
                }
                onClick={() => startGame()}
              />
            )}
          </>)}
        </div>
      }
    </>
  );
};

export default DynamicBar;
