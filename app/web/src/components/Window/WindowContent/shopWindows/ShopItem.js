import React from "react";
import { useTranslation } from "../../../Utiles/Translations";
import { useSettings } from "../../../Utiles/SettingsContext";

/**
 * ShopItem displays a single item in the shop, handling different item types and states.
 *
 * @param {Object} item - The item data.
 * @param {Function} onClickItem - Handler for when the item is clicked.
 * @param {boolean} isOwned - Indicates if the item is already owned by the user.
 * @param {boolean} isActive - Indicates if the item is currently active.
 * @param {string} styleClass - Additional CSS class for styling.
 */
const ShopItem = ({ item, onClickItem, isOwned, isActive, styleClass }) => {
  const { language } = useSettings();
  const { getTranslatedWord } = useTranslation();

  // Determines if the item should be rendered as a color block.
  const isColor = item.imgSrc && item.imgSrc.startsWith("#");
  
  // Get the item name in the current language or fall back to English.
  const itemName = item.names[language] || item.names["en"];

  return (
    <div
      className={`shop-item ${styleClass} ${
        isOwned ? "item-owned" : "item-unowned"
      } ${isActive ? "active-item" : "non-active-item"}`}
      onClick={onClickItem}
    >
      {isColor ? (
        // background color
        <div style={{ backgroundColor: item.imgSrc }} />
      ) : (
        // avatar
        <img src={item.imgSrc} alt={itemName} />
      )}
      <div>
        <p>
          {itemName}
          <br />
          {/* name of the item */}
          {!isOwned && (
            <>
              {getTranslatedWord(`shop.price`)}: {item.price} SC
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default ShopItem;
