// SuccessWindow.jsx
import React from "react";
import Button from "../../button/Button.tsx";

const SuccessWindow = ({ message, onClose }) => {
  return (
    <div className="box">
      Success!
      {message}
      <Button
        style="buttonconnexion login-button google-button"
        label="OK"
        onClick={onClose}
      />
    </div>
  );
};

export default SuccessWindow;
