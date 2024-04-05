import React, { useState } from "react";
import ShopItem from "./ShopItem";
import "./shopWindow.css";
import { useWindowContext } from "../../../Utiles/WindowContext";
import Button from "../../../button/Button.tsx";
import { useTranslation } from "../../../Utiles/Translations";
import { useAvatars } from "./AvatarItem";
import { useUserData } from "../../../Utiles/useUserData";
import { useCardSkins } from "./CardSkins";
import { useWallPapers } from "./wallpapers";


const ShopWindow = () => {
  const { getTranslatedWord } = useTranslation();
  const { user } = useUserData();
  const ownedItemIds = user?.itemsOwned?.map((item) => item._id) ?? [];
  const [activeTab, setActiveTab] = useState("avatars");
  const { openValidationWindow } = useWindowContext();

  const tabNames = {
    avatars: getTranslatedWord("shop.avatars"),
    cards: getTranslatedWord("shop.cards"),
    wallpapers: getTranslatedWord("shop.wallpapers"),
    // Autres catégories
  };

  const avatars = useAvatars();
  const cards = useCardSkins();
  const wallpapers = useWallPapers();

  const items = {
    avatars: avatars,
    cards: [],
    wallpapers: [],
  };

  return (
    <div className="shop-window">
      <div className="shop-tabs">
        {Object.keys(tabNames).map((tab) => (
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
        {items[activeTab]?.map((item) => (
          <ShopItem
            key={item.id}
            item={item}
            onClickItem={() => openValidationWindow(item)}
            styleClass={ownedItemIds.includes(item.id) ? "owned-item" : ""}
          />
        ))}
      </div>
    </div>
  );
};

export default ShopWindow;
