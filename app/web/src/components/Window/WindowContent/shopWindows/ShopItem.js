import React from 'react';
import './shopItem.css';

const ShopItem = ({ item, onClickItem, styleClass }) => {
  return (
    <div className={`shop-item ${styleClass}`} onClick={onClickItem}>
      <img src={item.imgSrc} alt="Item" />
      <p>{item.name}</p>
      <p>Prix: {item.price}</p>
    </div>
  );
};

export default ShopItem;