import React from "react";
import "./shopItem.css";

const ShopItem = ({ item, onClickItem, styleClass }) => {
  const isColor = item.imgSrc && item.imgSrc.startsWith("#");

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
        <img src={item.imgSrc} alt="Item" className="item-image" />
      )}
      <p>{item.name}</p>
      <p>Prix: {item.price}</p>
    </div>
  );
};

export default ShopItem;
