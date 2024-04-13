import React, { useState } from "react";
import Button from "../../../button/Button.tsx";
import TextInputComponent from "../../../textInput/TextInput.jsx";
import { useAuth } from "../../../Utiles/AuthProvider.jsx";
import { useWindowContext } from "../../../Utiles/WindowContext.jsx";
import { useTranslation } from "../../../Utiles/Translations.jsx";

const ForgotPassword = ({ showSuccess }) => {
  const { openWindow } = useWindowContext();
  const { checkEmail } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
  });
  const { getTranslatedWord } = useTranslation();

  const [validationError, setValidationError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Réinitialiser le message d'erreur lorsqu'un utilisateur modifie l'e-mail
    setValidationError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Effectuer la vérification de l'e-mail en utilisant la fonction de AuthProvider
      const result = await checkEmail(formData.email);

      if (result === true) {
        showSuccess("Reset password email sent successfully.");
      } else if (result === "not-found") {
        // Affichez un message d'erreur indiquant une mauvaise combinaison pseudo/mdp
        setValidationError("Email not found");
      } else {
        // Autres erreurs
        console.error("Failed to found the mail.");
      }
    } catch (error) {
      console.error("Error:", error);
      // Afficher le message d'erreur à l'utilisateur
      setValidationError(
        "Failed to send reset password email. Please check your email address."
      );
    }
  };

  return (
    <div className="box">
      <div className="login-page-title">
        {getTranslatedWord("connection.forgotPassQuestion")}
      </div>
      <div className="login-page-text">
        {getTranslatedWord("connection.forgotPassEnter")}
      </div>
      <form onSubmit={handleSubmit} className="myForm">
        <TextInputComponent
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={getTranslatedWord("connection.email")}
          errorMessage={validationError}
          styleClass={"input-connectionDefault input-icon-email"}
        />
        <Button
          styleClass="btn-connectionDefault button login-button back-color1"
          type="submit"
          label={getTranslatedWord("connection.send")}
        />
        <Button
          styleClass="btn-connectionDefault button login-button back-color3"
          type="temporary"
          onClick={() => openWindow("reset")}
          label="TEMPORARY BUTTON"
        />
      </form>
      <Button
        styleClass="btn-connectionDefault forgot-button back-color1"
        onClick={() => openWindow("login")}
        label={getTranslatedWord("connection.returnConnection")}
      />
      <p></p>
    </div>
  );
};

export default ForgotPassword;
