// SuccessWindow.jsx
import React from "react";
import Button from "../../button/Buttons";
import Text from "../../text/Text";

const SuccessWindow = ({ message, onClose }) => {
  return (
    <div className="box">
      <Text className="title" content="Success!" />
      <Text className="title" content={message} />
      <Button
        className="buttonconnexion login-button google-button"
        label="OK"
        onClick={onClose}
      />
    </div>
  );
};

export default SuccessWindow;
