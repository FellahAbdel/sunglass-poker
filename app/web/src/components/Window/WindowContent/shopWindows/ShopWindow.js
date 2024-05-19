import { useState, useEffect } from "react";
import ShopItem from "./ShopItem";
import "./shopWindow.css";
import { useWindowContext } from "../../../Utiles/WindowContext";
import Button from "../../../button/Button.tsx";
import { useTranslation } from "../../../Utiles/Translations";
import { useItems } from "./AvatarItem";
import AvatarDisplay from "../../../AvatarDisplay/AvatarDisplay.jsx";
import { useAuth } from "../../../Utiles/AuthProvider.jsx";
import { useUserData } from "../../../Utiles/useUserData";

/**
 * ShopWindow component provides a user interface for browsing and activating various avatars and accessories.
 */
const ShopWindow = () => {
  const { user } = useUserData();
  const { getTranslatedWord } = useTranslation();
  const { openValidationWindow } = useWindowContext();
  const [activeTab, setActiveTab] = useState(
    sessionStorage.getItem("activeTab") || "baseAvatar" // Maintains state of the currently active tab in the shop.
  );
  const items = useItems(); // Custom hook to fetch and organize shop items by categories.
  const { activateAvatar } = useAuth(); // Auth service method to activate a selected avatar.

  /**
   * Handles activation of an avatar or accessory.
   * @param {string} itemId - The ID of the item to be activated.
   */
  const handleActivateAvatar = async (itemId) => {
    const success = await activateAvatar(itemId);
    if (!success) {
      console.error("Could not activate avatar");
    }
  };

  // Update sessionStorage when the active tab changes to persist state across reloads.
  useEffect(() => {
    sessionStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  /**
   * Determines if a shop item is active based on user's current selection.
   * @param {Object} item - The shop item to check.
   * @returns {boolean} Indicates if the item is the currently active avatar or accessory.
   */
  const isActive = (item) => {
    if (item.category === "colorAvatar") {
      return user?.colorAvatar?.imgSrc === item.imgSrc;
    } else if (item.category === "sunglasses") {
      return user?.sunglasses?._id === item._id;
    } else if (item.category === "baseAvatar") {
      return user?.baseAvatar?._id === item._id;
    }
    return false;
  };

  return (
    <div className="shop-window">
      <div className="shop-tabs">
        {Object.keys(items).map((tab) => (
          <Button
            key={tab}
            label={getTranslatedWord(`shop.${tab}`)}
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
        {items[activeTab] &&
          items[activeTab]?.owned
            ?.concat(items[activeTab].unowned)
            .map((item) => (
              <ShopItem
                key={item._id}
                item={item}
                isOwned={item.owned}
                isActive={isActive(item)}
                onClickItem={() =>
                  item.owned
                    ? handleActivateAvatar(item._id)
                    : openValidationWindow(item)
                }
                styleClass={
                  item.owned ? "owned-item back-color1" : "back-color3"
                }
              />
            ))}
      </div>
    </div>
  );
};

export default ShopWindow;
