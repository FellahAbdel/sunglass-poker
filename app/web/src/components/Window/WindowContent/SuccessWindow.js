import React from "react";
import Button from "../../button/Button.tsx";
import { useWindowContext } from "../../Utiles/WindowContext.jsx";
import { useTranslation } from "../../Utiles/Translations";

/**
 * SuccessWindow component displays a success message to the user.
 * The message is translated based on the current language settings.
 */
const SuccessWindow = () => {
  const { closeWindow, successMessage } = useWindowContext();
  const { getTranslatedWord } = useTranslation();

  return (
    <div className="main-SuccessWindow">
      <p>{getTranslatedWord(successMessage)}</p>

      <Button styleClass="btn-successWindow" label="OK" onClick={closeWindow} />
    </div>
  );
};

export default SuccessWindow;
