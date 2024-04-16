import React from "react";
import { useTranslation } from "../../../Utiles/Translations";
import { useSettings } from "../../../Utiles/SettingsContext";

const ShopItem = ({ item, onClickItem, isOwned, isActive, styleClass }) => {
  const { language } = useSettings();
  const { getTranslatedWord } = useTranslation();

  const isColor = item.imgSrc && item.imgSrc.startsWith("#");

  const itemName = item.names[language] || item.names["en"];

  return (
    <div className={`shop-item ${styleClass} ${isOwned ? "item-owned" : "item-unowned"} ${isActive ? "active-item" : "non-active-item"}`} onClick={onClickItem}>
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
