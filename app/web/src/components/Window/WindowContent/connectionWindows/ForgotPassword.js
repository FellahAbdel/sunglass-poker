import React, { useState } from "react";
import Button from "../../../button/Button.tsx";
import TextInputComponent from "../../../textInput/TextInput.jsx";
import { useAuth } from "../../../Utiles/AuthProvider.jsx";
import { useWindowContext } from "../../../Utiles/WindowContext.jsx";
import { useTranslation } from "../../../Utiles/Translations.jsx";

/**
 * ForgotPassword provides a form for users to request a password reset link via email.
 * It validates user input and displays appropriate feedback messages.
 */
const ForgotPassword = () => {
  const { openWindow, openSuccessWindow } = useWindowContext();
  const { checkEmail } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
  });
  const { getTranslatedWord } = useTranslation();
  const [validationError, setValidationError] = useState("");

  /**
   * Handles changes to form inputs, updating local state and resetting validation errors.
   * @param {Object} e - Event object from the form element.
   */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Réinitialiser le message d'erreur lorsqu'un utilisateur modifie l'e-mail
    setValidationError("");
  };

  /**
   * Handles the form submission to send a password reset request.
   * @param {Object} e - Event object to prevent default form submission behavior.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await checkEmail(formData.email);
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
          styleClass={"input-connectionDefault"}
          iconSrc="static/media/assets/images/icons/black/email.png"
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
