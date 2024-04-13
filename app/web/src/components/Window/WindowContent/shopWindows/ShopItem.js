import React from "react";
import "./shopItem.css";
import { useTranslation } from "../../../Utiles/Translations";
import { useSettings } from "../../../Utiles/SettingsContext";

const ShopItem = ({ item, onClickItem, styleClass, isOwned }) => {
  const { language } = useSettings();
  const { getTranslatedWord } = useTranslation();

  const isColor = item.imgSrc && item.imgSrc.startsWith("#");

  const itemName = item.names[language] || item.names["en"];

  return (
    <div className={`shop-item ${styleClass}`} onClick={onClickItem}>
      {isColor ? (
        // Affichage d'une couleur
        <div
          className="color-display"
          style={{ backgroundColor: item.imgSrc }}
        />
      ) : (
        // Affichage d'une image
        <img src={item.imgSrc} alt={itemName} className="item-image" />
      )}
      <p>{itemName}</p> {/* Affiche le nom traduit de l'item */}
      {!isOwned && (
        <p>
          {getTranslatedWord(`shop.price`)}: {item.price}
        </p>
      )}
    </div>
  );
};

export default ShopItem;
