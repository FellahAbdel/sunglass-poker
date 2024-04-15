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
      openSuccessWindow("Achat réalisé avec succès !", "shop");
      loadUserStats();
    } else {
      console.error("Erreur lors de l'achat");
    }
  };

  const finalCoins = user.coins - selectedItem.price;


  return (
    <div className="modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-text">
          <p className="modal-message">
            {getTranslatedWord("shop.confirmationMessage")} {selectedItem.price}{" "}
            coins?
            <p>{user.coins} Coins - {selectedItem.price} = {finalCoins} Coins après achat</p>

          </p>
          <div>
            <Button
              label={getTranslatedWord("shop.confirm")}
              styleClass="btn_onglets_shop back-color1"
              onClick={handleConfirm}
            />
            <Button
              label={getTranslatedWord("shop.cancel")}
              styleClass="btn_onglets_shop back-color3"
              onClick={() => openWindow("shop")}
            />
          </div>
        </div>
        <div className="modal-image">
          {isColor ? (
            <div
              className="color-display "
              style={{ backgroundColor: selectedItem.imgSrc }}
            ></div>
          ) : (
            <img src={selectedItem.imgSrc} alt="Aperçu" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ValidationWindow;
