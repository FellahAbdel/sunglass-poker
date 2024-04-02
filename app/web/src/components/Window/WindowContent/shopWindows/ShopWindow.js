import React, { useState } from "react";
import ShopItem from "./ShopItem";
import AvatarComponent from "./AvatarItem";
import CardSkinsComponent from "./CardSkins";
import WallpapersComponent from "./wallpapers";
import "./shopWindow.css";
import { useWindowContext } from "../../../Utiles/WindowContext";
import Button from "../../../button/Button.tsx";
import { useTranslation } from "../../../Utiles/Translations";

const ShopWindow = () => {
  const { getTranslatedWord } = useTranslation();

  const [activeTab, setActiveTab] = useState("avatars");
  const { openValidationWindow } = useWindowContext();

  const avatars = AvatarComponent();
  const cardSkins = CardSkinsComponent();
  const wallpapers = WallpapersComponent();

  const tabNames = {
    avatars: getTranslatedWord("shop.avatars"),
    cards: getTranslatedWord("shop.cards"),
    wallpapers: getTranslatedWord("shop.wallpapers"),
    // Autres catégories
  };

  const items = {
    avatars: avatars,
    cards: cardSkins,
    wallpapers: wallpapers,
    // Autres catégories
  };

  return (
    <div className="shop-window">
      <div className="shop-tabs">
        {Object.keys(items).map((tab) => (
          <Button
            key={tab}
            label={tabNames[tab]}
            styleClass={
              activeTab === tab
                ? "btn_onglets_shop btn_onglets_shop_active"
                : "btn_onglets_shop"
            }
            onClick={() => setActiveTab(tab)}
          />
        ))}
      </div>
      <div className="items-display">
        {items[activeTab] &&
          items[activeTab].map((item) => (
            <ShopItem
              key={item.id}
              item={item}
              onClickItem={() => openValidationWindow(item)}
            />
          ))}
      </div>
    </div>
  );
};

export default ShopWindow;
