import React, { useState } from "react";
import ShopItem from "./ShopItem";
import AvatarComponent from "./AvatarItem";
import CardSkinsComponent from "./CardSkins";
import WallpapersComponent from "./wallpapers";
import "./shopWindow.css";
import { useWindowContext } from "../../../Utiles/WindowContext";
import Button from "../../../button/Button.tsx";
import { useTranslation } from "../../../Utiles/Translations";
import { useAvatars } from "./AvatarItem";
import { useAuth } from "../../../Utiles/AuthProvider.jsx";
import { useUserData } from "../../../Utiles/useUserData";

const ShopWindow = () => {
  const { getTranslatedWord } = useTranslation();

  const { user, stats } = useUserData();
  console.log("Items possédés par l'utilisateur:", user?.itemsOwned);
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
  const cardSkins = CardSkinsComponent();
  const wallpapers = WallpapersComponent();

  const items = {
    avatars: avatars,
    cards: cardSkins,
    wallpapers: wallpapers,
    // Autres catégories
  };

  function resolveImagePath(relativePath) {
    return `${process.env.PUBLIC_URL}${relativePath}`;
  }

  const itemsWithResolvedImagesAndOwnership = {
    avatars: avatars.map((avatar) => ({
      ...avatar,
      imgSrc: resolveImagePath(avatar.imgSrc),
      isOwned: ownedItemIds.includes(String(avatar.id)),
    })),
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
        {itemsWithResolvedImagesAndOwnership[activeTab] &&
          itemsWithResolvedImagesAndOwnership[activeTab]
            .sort((a, b) => b.isOwned - a.isOwned)
            .map((item) => (
              <ShopItem
                key={item.id}
                item={item}
                onClickItem={() => openValidationWindow(item)}
                styleClass={item.isOwned ? "owned-item" : ""}
              />
            ))}
      </div>
    </div>
  );
};

export default ShopWindow;
