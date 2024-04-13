// SuccessWindow.jsx
import React from "react";
import Button from "../../button/Button.tsx";
import { useWindowContext } from "../../Utiles/WindowContext.jsx";

const SuccessWindow = () => {
  const { closeWindow, successMessage } = useWindowContext();

  return (
    <div className="main-SuccessWindow">
      <p>{successMessage}</p>

      <Button
        styleClass="buttonconnexion login-button back-color1"
        label="OK"
        onClick={closeWindow}
      />
    </div>
  );
};

export default SuccessWindow;
