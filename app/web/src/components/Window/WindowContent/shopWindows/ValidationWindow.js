import React from "react";
import { useWindowContext } from "../../../Utiles/WindowContext"; // Assure-toi que le chemin d'accès est correct
import "./validationWindow.css";
import Button from "../../../button/Button.tsx";
import { useTranslation } from "../../../Utiles/Translations";
import { useAuth } from "../../../Utiles/AuthProvider.jsx";
import { useUserData } from "../../../Utiles/useUserData";

const ValidationWindow = () => {
  const { getTranslatedWord } = useTranslation();
  const { buyItem, fetchUserInfo } = useAuth();

  const { loadUserStats, user } = useUserData();

  const { selectedItem, openSuccessWindow, openWindow } = useWindowContext();

  if (!selectedItem) return null;

  const isColor =
    typeof selectedItem.imgSrc === "string" &&
    selectedItem.imgSrc.startsWith("#");

  const handleConfirm = async () => {
    const success = await buyItem(selectedItem._id);
    if (success) {
      openSuccessWindow("shop.success", "shop");
      loadUserStats();
    } else {
      console.error("Erreur lors de l'achat");
    }
  };

  const finalCoins = user.coins - selectedItem.price;

  return (
    <div
      className="container-validationWindow"
      onClick={(e) => e.stopPropagation()}
    >
      {isColor ? (
        <div
          className="color-display "
          style={{ backgroundColor: selectedItem.imgSrc }}
        ></div>
      ) : (
        <img src={selectedItem.imgSrc} alt="avatar" />
      )}

      <div className="container-validationMessage">
        <p>
          {getTranslatedWord("shop.confirmationMessage")} {selectedItem.price}{" "}
          coins?
          <br/>
          {finalCoins} Coins après
          achat

        </p>
        <div className="container-ValidationButtons">
          <Button
            label={getTranslatedWord("shop.confirm")}
            styleClass="btn_onglets_shop2 back-color1"
            onClick={handleConfirm}
          />
          <Button
            label={getTranslatedWord("shop.cancel")}
            styleClass="btn_onglets_shop2 back-color3"
            onClick={() => openWindow("shop")}
          />
        </div>
      </div>
    </div>
  );
};

export default ValidationWindow;
