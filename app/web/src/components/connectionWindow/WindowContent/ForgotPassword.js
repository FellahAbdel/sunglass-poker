import React, { useState } from "react";
import Button from "../../button/Buttons";
import LogoComponent from "../../logo/Logo";
import TextInputComponent from "../../textInput/TextInput";
import Text from "../../text/Text";

const ForgotPassword = ({ openResetPassword, openLoginWindow, showSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [emailExists, setEmailExists] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Effectuer la requête POST vers votre API pour vérifier l'existence de l'e-mail
      const response = await fetch("http://localhost:3001/api/check-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.exists) {
        // L'e-mail existe dans la base de données
        // Envoyer l'email à l'utilisateur (A faire !)

        console.log(data.message); // Affichez un message de succès
        setEmailExists(true);
        showSuccess("Email sent !");
        return;
      } else {
        // L'e-mail n'existe pas dans la base de données
        // Faire le feedback
        console.error(data.message); // Affichez un message d'erreur
        setEmailExists(false);
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de l'e-mail :", error);
    }
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
          label="Send"
        />
        <Button
          className="buttonconnexion button login-button"
          type="temporary"
          onClick={openResetPassword}
          label="TEMPORARY BUTTON"
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
