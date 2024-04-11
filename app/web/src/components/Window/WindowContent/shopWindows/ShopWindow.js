import { useState, useEffect } from "react";
import ShopItem from "./ShopItem";
import "./shopWindow.css";
import { useWindowContext } from "../../../Utiles/WindowContext";
import Button from "../../../button/Button.tsx";
import { useTranslation } from "../../../Utiles/Translations";
import { useItems } from "./AvatarItem";
import { useUserData } from "../../../Utiles/useUserData";
import { useAuth } from "../../../Utiles/AuthProvider.jsx";
import AvatarDisplay from "../../../AvatarDisplay/AvatarDisplay.jsx";

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
    sunglasses: getTranslatedWord("shop.cards"),
    color: getTranslatedWord("shop.wallpapers"),
  };

  const handleActivateAvatar = async (itemId) => {
    const success = await activateAvatar(itemId);
    if (!success) {
      console.error("Could not activate avatar");
    }
  };

  const items = useItems();

  // console.log("Items recu par shopItem:", items);
  // console.log("Owned Items IDs:", ownedItemIds);

  // console.log("Items for activeTab:", items[activeTab]);

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
        <div className="avatar-display-container">
          <AvatarDisplay />
        </div>
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
            styleClass={
              isOwned(item._id) ? "owned-item back-color1" : "back-color3"
            }
          />
        ))}
      </div>
    </div>
  );
};

export default ShopWindow;
