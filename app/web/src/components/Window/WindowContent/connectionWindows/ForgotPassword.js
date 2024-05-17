import React, { useState } from "react";
import Button from "../../../button/Button.tsx";
import TextInputComponent from "../../../textInput/TextInput.jsx";
import { useAuth } from "../../../Utiles/AuthProvider.jsx";
import { useWindowContext } from "../../../Utiles/WindowContext.jsx";
import { useTranslation } from "../../../Utiles/Translations.jsx";

const ForgotPassword = ({}) => {
  const { openWindow, openSuccessWindow } = useWindowContext();
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
      const result = await checkEmail(formData.email);

      console.log("Resultats :", result);

      if (result === true) {
        openSuccessWindow(getTranslatedWord("connection.successMail"));
      } else if (result === "not-found") {
        setValidationError("error.emailNotFound");
      } else {
        console.error("Failed to found the mail.");
        setValidationError("error.emailNotFound");
      }
    } catch (error) {
      console.error("Error:", error);
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
          label={getTranslatedWord("connection.temporary")}
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
