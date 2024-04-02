import React from "react";
import { useWindowContext } from "../../../Utiles/WindowContext"; // Assure-toi que le chemin d'accès est correct
import "./validationWindow.css";
import Button from "../../../button/Button.tsx";
import { useTranslation } from "../../../Utiles/Translations";

const ValidationWindow = () => {
  const { getTranslatedWord } = useTranslation();

  const { selectedItem, openSuccessWindow, openWindow } = useWindowContext();

  if (!selectedItem) return null;

  const handleConfirm = () => {
    // Logique de confirmation
    openSuccessWindow("Achat réalisé avec succès !");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-text">
          <p className="modal-message">
            {getTranslatedWord("shop.confirmationMessage")} {selectedItem.price}{" "}
            coins?
          </p>
          <div>
            <Button
              label={getTranslatedWord("shop.confirm")}
              styleClass="btn_onglets_shop"
              onClick={handleConfirm}
            />
            <Button
              label={getTranslatedWord("shop.cancel")}
              styleClass="btn_onglets_shop"
              onClick={() => openWindow("shop")}
            />
          </div>
        </div>
        <div className="modal-image">
          <img src={selectedItem.imgSrc} alt="Aperçu" />
        </div>
      </div>
    </div>
  );
};

export default ValidationWindow;
