import React from "react";
import Button from "../../button/Button.tsx";
import { useWindowContext } from "../../Utiles/WindowContext.jsx";
import { useTranslation } from "../../Utiles/Translations";


const AlertWindow = () => {
  const { alertParams, closeWindow } = useWindowContext();
  const { message, onConfirm, onCancel } = alertParams;
  const { getTranslatedWord } = useTranslation();


  return (
    <div className="main-SuccessWindow">
      <p>{getTranslatedWord(message)}</p>
      <Button
        styleClass="buttonconnexion btn-connectionDefault login-button back-color3"
        label={getTranslatedWord("alert.confirm")}
        onClick={() => {
          onConfirm();
        }}
      />
      <Button
        styleClass="buttonconnexion btn-connectionDefault login-button back-color1"
        label={getTranslatedWord("alert.cancel")}
        onClick={() => {
          onCancel();
        }}
      />
    </div>
  );
};

export default AlertWindow;
