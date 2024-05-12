import React  from "react";
import "./dynamicBar.css"
import { useWindowContext } from "../Utiles/WindowContext";
import { formatNumber } from "./../Utiles/NumberFormat";
import Button from "./../button/Button.tsx";
import { useUserData } from "../Utiles/useUserData.jsx";
import { useTranslation } from "./../Utiles/Translations.jsx";

const DynamicBar = () =>{
    const { openWindow ,windowType, isWindowOpen, closeWindow, isGameTableVisible } =
    useWindowContext();
    const { user } = useUserData();
    const { getTranslatedWord } = useTranslation();


    return (
        <>
            {/* User coins */}
            <div className={`container-userCoins 
                            ${(windowType === "shop" || windowType === "coins") && "appear"}
                            ${(windowType === "coins") && "center"}`}
                        >
            <div className="userCoinsTop">
            {formatNumber(user.coins)} SC
            </div>
            {(windowType === "shop" || windowType === "coins") &&
                <Button
                    label={windowType === "shop" ? getTranslatedWord("shop.buyMore") : getTranslatedWord("shop.backStore")}
                    styleClass={`btn-coinsShop`}
                    onClick={windowType === "shop" ? () => openWindow("coins") : () => openWindow("shop")}
                />}
            </div>

            {/* Create a game button */}
            {(windowType === "servers") &&
                <Button
                    label={getTranslatedWord("game.createAgame")}
                    styleClass={`btn-coinsShop btn-pnl-createAgame`}
                    onClick={() => openWindow("create_table")}
                />}       
        </>
    )
}

export default DynamicBar;
