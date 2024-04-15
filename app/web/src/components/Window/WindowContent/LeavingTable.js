import React from "react";
import Button from "../../button/Button.tsx";
import { useWindowContext } from "../../Utiles/WindowContext.jsx";
import { useTranslation } from '../../Utiles/Translations';

const LeavingTableWindow = () => {
  const { closeWindow,showHome, openSuccessWindow } = useWindowContext();
  const { getTranslatedWord } = useTranslation();

  const handleConfirmLeave = () => {
    // Ajoutez ici la logique pour gérer la sortie de la table
    openSuccessWindow(getTranslatedWord("game.leftTableSuccess"));
    showHome(); // Fermez la fenêtre après la confirmation
  };

  return (
    <div className="main-SuccessWindow">
      <p>{getTranslatedWord("game.confirmExitMessage")}</p>
      <Button
        styleClass="buttonconnexion login-button back-color3"
        label={getTranslatedWord("game.confirm")}
        onClick={handleConfirmLeave}
      />
      <Button
        styleClass="buttonconnexion login-button back-color1"
        label={getTranslatedWord("game.cancel")}
        onClick={closeWindow}
      />
    </div>
  );
};

export default LeavingTableWindow;
