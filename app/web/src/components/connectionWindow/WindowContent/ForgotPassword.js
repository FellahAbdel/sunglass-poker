import React, { useState } from "react";
import Button from "../../button/Buttons";
import LogoComponent from "../../logo/Logo";
import TextInputComponent from "../../textInput/TextInput";
import Text from "../../text/Text";

const ForgotPassword = ({ openResetPassword, openLoginWindow }) => {
  const [formData, setFormData] = useState({
    email: "",
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
  };

  return (
    <div className="box">
      <Text className="title" content="You forgot your password?" />
      <LogoComponent className="logoconnexion" />
      <Text className="littletext" content="Enter your account email here" />
      <form onSubmit={handleSubmit} className="myForm">
        <TextInputComponent
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          placeholder="Email"
        />
        <Button
          className="buttonconnexion button login-button"
          type="submit"
          onClick={openResetPassword}
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

export default ForgotPassword;
