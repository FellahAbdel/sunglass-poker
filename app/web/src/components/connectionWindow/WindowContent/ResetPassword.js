import React, { useState } from "react";
import Button from "../../button/Buttons";
import LogoComponent from "../../logo/Logo";
import TextInputComponent from "../../textInput/TextInput";
import Text from "../../text/Text";

const ResetPasswordWindow = ({ openLoginWindow, onClose }) => {
  const [formData, setFormData] = useState({
    password: "",
    repeatPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ajoutez ici la logique pour traiter la soumission du formulaire

    // Fermez la fenêtre après avoir traité la soumission
    onClose();
  };

  return (
    <div className="box">
      <Text className="title" content="Reset your password" />
      <LogoComponent className="logoconnexion" />
      <Text className="littletext" content="Enter your new password here" />
      <form onSubmit={handleSubmit} className="myForm">
        <TextInputComponent
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          placeholder="Password"
        />
        <TextInputComponent
          name="repeatPassword"
          value={formData.repeatPassword}
          onChange={handleChange}
          type="password"
          placeholder="Repeat your password"
        />
        <Button
          className="buttonconnexion button login-button"
          type="submit"
          label="Send"
        />
      </form>
      <Button
        className="buttonconnexion forgot-button"
        onClick={openLoginWindow}
        label="Return to connection menu"
      />
    </div>
  );
};

export default ResetPasswordWindow;
