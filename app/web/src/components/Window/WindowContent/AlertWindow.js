import React from "react";
import Button from "../../button/Button.tsx";
import { useWindowContext } from "../../Utiles/WindowContext.jsx";
import { useTranslation } from "../../Utiles/Translations";

/**
 * AlertWindow provides a modal window to handle user confirmations or cancellations.
 * It uses alert parameters from the window context to display messages and execute actions.
 */
const AlertWindow = () => {
  // Retrieve alert parameters from the window context which include message and action handlers.
  const { alertParams } = useWindowContext();
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
