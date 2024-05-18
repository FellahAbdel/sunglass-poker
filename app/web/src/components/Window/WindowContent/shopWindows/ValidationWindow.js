import React from "react";
import { useWindowContext } from "../../../Utiles/WindowContext";
import "./validationWindow.css";
import Button from "../../../button/Button.tsx";
import { useTranslation } from "../../../Utiles/Translations";
import { useAuth } from "../../../Utiles/AuthProvider.jsx";
import { useUserData } from "../../../Utiles/useUserData";

/**
 * ValidationWindow provides a UI for confirming item purchases.
 * It displays the item to be purchased and handles the confirmation process.
 */
const ValidationWindow = () => {
  const { getTranslatedWord } = useTranslation();
  const { buyItem } = useAuth(); // Function to trigger item purchase
  const { loadUserStats, user } = useUserData(); // Loads user stats and contains user data
  const { selectedItem, openSuccessWindow, openWindow } = useWindowContext();
  
  // Guard clause to ensure there is a selected item to process
  if (!selectedItem) return null;

  // Determines if the selected item is a color (and not an image)
  const isColor =
    typeof selectedItem.imgSrc === "string" &&
    selectedItem.imgSrc.startsWith("#");

  /**
   * Handles the purchase confirmation action.
   * Initiates the buying process and updates user stats upon success.
   */
  const handleConfirm = async () => {
    const success = await buyItem(selectedItem._id);
    if (success) {
      openSuccessWindow("shop.success", "shop");
      loadUserStats();
    } else {
      console.error("Erreur lors de l'achat");
    }
  };
  
  // Calculate remaining coins after the transaction
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
          <br />
          <b>
            {getTranslatedWord("shop.afterTransaction")}: {finalCoins} SC
          </b>
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
