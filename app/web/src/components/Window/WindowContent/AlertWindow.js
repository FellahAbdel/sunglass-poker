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
      <div className="container-leaveButtons">
      <Button
        styleClass="btn-leaveConfirmation"
        label={getTranslatedWord("alert.confirm")}
        onClick={() => {
          onConfirm();
        }}
      />
      <Button
        styleClass="btn-leaveCancel"
        label={getTranslatedWord("alert.cancel")}
        onClick={() => {
          onCancel();
        }}
      />
      </div>
    </div>
  );
};

export default AlertWindow;
