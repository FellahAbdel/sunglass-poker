import React from 'react';
import './shopItem.css';

const ShopItem = ({ item, onClickItem }) => {
  return (
    <div className="shop-item" onClick={onClickItem}>
      <img src={item.imgSrc} alt="Item" />
      <div className="price">{item.price} coins</div>
    </div>
  );
};

export default ShopItem;