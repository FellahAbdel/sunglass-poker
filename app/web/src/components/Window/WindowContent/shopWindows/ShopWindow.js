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
import { useAuth } from "../../../Utiles/AuthProvider.jsx";

const ShopWindow = () => {
  const { getTranslatedWord } = useTranslation();
  const { user } = useUserData();
  const { activateAvatar } = useAuth();
  const ownedItemIds = user?.itemsOwned?.map((id) => id.toString()) ?? [];

  const isOwned = (itemId) => ownedItemIds.includes(itemId.toString());

  const [activeTab, setActiveTab] = useState("avatars");
  const { openValidationWindow } = useWindowContext();

  const tabNames = {
    avatars: getTranslatedWord("shop.avatars"),
    cards: getTranslatedWord("shop.cards"),
    wallpapers: getTranslatedWord("shop.wallpapers"),
    // Autres catégories
  };

  const handleActivateAvatar = async (itemId) => {
    const success = await activateAvatar(itemId);
    if (!success) {
      console.error("Could not activate avatar");
    }
  };

  const avatars = useAvatars();
  const cards = useCardSkins();
  const wallpapers = useWallPapers();

  console.log("Avatars:", avatars);
  console.log("Owned Items IDs:", ownedItemIds);

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
            styleClass={`btn_onglets_shop ${
              activeTab === tab ? "back-color1" : "back-color3"
            }`}
            onClick={() => setActiveTab(tab)}
          />
        ))}
      </div>
      <div className="items-display">
        {items[activeTab]?.map((item) => (
          <ShopItem
            key={item._id}
            item={item}
            onClickItem={() =>
              isOwned(item._id)
                ? handleActivateAvatar(item._id)
                : openValidationWindow(item)
            }
            styleClass={isOwned(item._id) ? "owned-item back-color1" : "back-color3"}
          />
        ))}
      </div>
    </div>
  );
};

export default ShopWindow;
