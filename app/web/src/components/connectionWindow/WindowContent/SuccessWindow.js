// SuccessWindow.jsx
import React from "react";
import Button from "../../button/Button.tsx";
import { useWindowContext } from "../../WindowContext";



const SuccessWindow = ({ }) => {
  const {
    closeWindow,
    isWindowOpen,
    windowType,
    openSuccessWindow,
    openWindow,
    successMessage,
  } = useWindowContext();
  
  return (
    <div className="box">
      Success!
      {successMessage}
      <Button
        style="buttonconnexion login-button google-button"
        label="OK"
        onClick={closeWindow}
      />
    </div>
  );
};

export default SuccessWindow;
