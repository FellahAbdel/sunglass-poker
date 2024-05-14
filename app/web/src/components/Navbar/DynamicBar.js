import React from "react";
import "./dynamicBar.css";
import { useWindowContext } from "../Utiles/WindowContext";
import { formatNumber } from "./../Utiles/NumberFormat";
import Button from "./../button/Button.tsx";
import { useUserData } from "../Utiles/useUserData.jsx";
import { useTranslation } from "./../Utiles/Translations.jsx";
import { useGameTable } from "../Utiles/GameTableProvider.jsx";

const DynamicBar = () => {
  const { openWindow, windowType, isGameTableVisible } = useWindowContext();
  const { user } = useUserData();
  const { getTranslatedWord } = useTranslation();
  const { serverName } = useGameTable();

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
    </>
  );
};

export default DynamicBar;
