import { useState } from "react";
import ShopItem from "./ShopItem";
import "./shopWindow.css";
import { useWindowContext } from "../../../Utiles/WindowContext";
import Button from "../../../button/Button.tsx";
import { useTranslation } from "../../../Utiles/Translations";
import { useItems } from "./AvatarItem";
import AvatarDisplay from "../../../AvatarDisplay/AvatarDisplay.jsx";
import { useAuth } from "../../../Utiles/AuthProvider.jsx";
import { useUserData } from "../../../Utiles/useUserData";

const ShopWindow = () => {
  const { user } = useUserData();
  const { getTranslatedWord } = useTranslation();
  const { openValidationWindow } = useWindowContext();
  const [activeTab, setActiveTab] = useState("baseAvatar");
  const items = useItems();
  const { activateAvatar } = useAuth();

  const handleActivateAvatar = async (itemId) => {
    const success = await activateAvatar(itemId);
    if (!success) {
      console.error("Could not activate avatar");
    }
  };

  //console.log("user : ", user);
  //console.log("Items recu par shopItem:", items);
  //console.log("Owned Items IDs:", ownedItemIds);

  //console.log("Items for activeTab:", items[activeTab]);

  //console.log("user.colorAvatar : ", user.colorAvatar);

  const isActive = (item) => {
    if (item.category === "colorAvatar") {
      return user.colorAvatar.imgSrc === item.imgSrc;
    } else if (item.category === "sunglasses") {
      return user.sunglasses?._id === item._id;
    } else if (item.category === "baseAvatar") {
      return user.baseAvatar?._id === item._id;
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
        {items[activeTab].owned.concat(items[activeTab].unowned).map((item) => (
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
            styleClass={item.owned ? "owned-item back-color1" : "back-color3"}
          />
        ))}
      </div>
      {/* <div className="user-coins-back back-color3">
        <p>{user.coins} SC</p>
      </div>
      <div className="user-coins-text ">
        <p>{user.coins} SC</p>
      </div> */}
      <div className="user-coins-back back-color3">
        <Button
          label={`${user.coins} SC`}
          styleClass="btn-coins back-color3 user-coins-text"
          onClick={() => console.log('Add coins clicked')}
        />
        </div>
    </div>
  );
};

export default ShopWindow;
