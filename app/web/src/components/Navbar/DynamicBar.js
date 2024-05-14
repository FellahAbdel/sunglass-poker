import React, { useEffect } from "react";
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


const DynamicBar = () => {
  const { userId } = useAuth();
  const { openWindow, windowType, isGameTableVisible, isWindowOpen } = useWindowContext();
  const { isMaster, showWaitingMessage , isSpectator } = useGameTable();
  const { user } = useUserData();
  const { getTranslatedWord } = useTranslation();
  const { serverName } = useGameTable();
  const dispatch = useDispatch();

  const startGame = () => {
    // Logique pour commencer la partie
    console.log("Starting game with roomId:");
    dispatch(actions.startGame(userId));
  };

  useEffect(() => {
    console.log("showWaitingMessage:", showWaitingMessage);
  }, [showWaitingMessage]);

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
        <div className="userCoinsTop">{formatNumber(user.coins)} SC</div>
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
            {getTranslatedWord("table.waiting")}
          </div>
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
        </div>
      }
    </>
  );
};

export default DynamicBar;
