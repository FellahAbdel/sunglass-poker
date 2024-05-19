import React, { useState } from "react";
import Button from "../../../button/Button.tsx";
import TextInputComponent from "../../../textInput/TextInput.jsx";
import { useAuth } from "../../../Utiles/AuthProvider.jsx";
import {
  validateUsername,
  validateEmail,
  validatePassword,
  validatePasswordMatch,
} from "../../../Utiles/ValidationUtils.jsx";
import { useWindowContext } from "../../../Utiles/WindowContext.jsx";
import { useTranslation } from "../../../Utiles/Translations.jsx";

/**
 * SignUpWindow provides a user interface for registering a new account.
 * It includes form fields for user information and performs client-side validation.
 */
const SignUpWindow = () => {
  const { getTranslatedWord } = useTranslation();
  const { openSuccessWindow, openWindow } = useWindowContext();
  const { registerUser } = useAuth();
  const [formData, setFormData] = useState({
    pseudo: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    pseudo: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  /**
   * Updates form data and clears associated validation errors when user edits an input.
   * @param {Object} e - Event object from the input change.
   */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Réinitialiser le message d'erreur associé au champ modifié
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: "",
    }));
  };

  /**
   * Validates all form fields using utility functions and updates the validationErrors state.
   * @returns {boolean} True if all form fields are valid, false otherwise.
   */
  const validateForm = () => {
    const errors = {
      pseudo: "",
      email: "",
      password: "",
      repeatPassword: "",
    };

    // Validation du pseudo
    const usernameValidation = validateUsername(formData.pseudo);
    if (!usernameValidation.isValid) {
      errors.pseudo = usernameValidation.errorMessage;
    }

    // Validation de l'e-mail
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      errors.email = emailValidation.errorMessage;
    }

    // Validation du mot de passe
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.errorMessage;
    }

    // Validation de la correspondance des mots de passe
    const passwordMatchValidation = validatePasswordMatch(
      formData.password,
      formData.repeatPassword
    );
    if (!passwordMatchValidation.isValid) {
      errors.repeatPassword = passwordMatchValidation.errorMessage;
    }

    setValidationErrors(errors);

    // Vérifie si tous les champs sont valides
    return Object.values(errors).every((error) => error === "");
  };

  /**
   * Handles form submission for registering a new user.
   * @param {Object} e - Event object to prevent default form submission.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const result = await registerUser(formData);

        if (result === true) {
          openSuccessWindow(getTranslatedWord("connection.successAccount"));
        } else if (result && result.error) {
          if (result.error === "user_exists") {
            // Affichez un message d'erreur indiquant que l'utilisateur existe déjà
            setValidationErrors((prevErrors) => ({
              ...prevErrors,
              [result.field]: `${
                result.field.charAt(0).toUpperCase() + result.field.slice(1)
              } already exists`,
            }));
          } else {
            // Autres erreurs
            console.error("Failed to create user.");
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      // Feedback à faire pour indiquer les erreurs de validation
      console.error("Form validation failed");
    }
  };

  return (
    <div className="box">
      <div className="login-page-title">
        {getTranslatedWord("connection.registerMessage")}
      </div>
      <form onSubmit={handleSubmit} className="myForm">
        <TextInputComponent
          name="pseudo"
          value={formData.pseudo}
          onChange={handleChange}
          placeholder={getTranslatedWord("connection.username")}
          errorMessage={validationErrors.pseudo}
          styleClass={"input-connectionDefault"}
          iconSrc="static/media/assets/images/icons/black/profile.png"
        />
        <TextInputComponent
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={getTranslatedWord("connection.email")}
          errorMessage={validationErrors.email}
          styleClass={"input-connectionDefault"}
          iconSrc="static/media/assets/images/icons/black/email.png"
        />
        <TextInputComponent
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder={getTranslatedWord("connection.password")}
          type={"password"}
          errorMessage={validationErrors.password}
          styleClass={"input-connectionDefault"}
          iconSrc="static/media/assets/images/icons/black/password.png"
        />
        <TextInputComponent
          name="repeatPassword"
          value={formData.repeatPassword}
          onChange={handleChange}
          placeholder={getTranslatedWord("connection.repeatPass")}
          type={"password"}
          errorMessage={validationErrors.repeatPassword}
          styleClass={"input-connectionDefault"}
          iconSrc="static/media/assets/images/icons/black/password-repeat.png"
        />
        <Button
          styleClass="btn-connectionDefault login-button back-color1"
          type="submit"
          label={getTranslatedWord("connection.signin")}
        />
      </form>

      <Button
        onClick={() => openWindow("login")}
        styleClass="btn-connectionDefault forgot-button back-color1"
        label={getTranslatedWord("connection.haveAccQuestion")}
      />
    </div>
  );
};

export default SignUpWindow;
