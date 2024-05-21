import React, { useState } from "react";
import Button from "../../../button/Button.tsx";
import TextInputComponent from "../../../textInput/TextInput.jsx";
import { useAuth } from "../../../Utiles/AuthProvider.jsx";
import { useWindowContext } from "../../../Utiles/WindowContext.jsx";
import { useTranslation } from "../../../Utiles/Translations.jsx";
import { useDispatch } from "react-redux";
import { loggedIn } from "../../../../store/actions/clientInteractionsCreator.js";
import {
  validateUsername,
  validatePassword,
} from "../../../Utiles/ValidationUtils.jsx";

/**
 * LoginWindow provides a user interface for logging into the application.
 * It handles user input for username and password, validates them, and processes the login.
 */
const LoginWindow = () => {
  const dispatch = useDispatch();
  const { getTranslatedWord } = useTranslation();
  const { openSuccessWindow, openWindow } = useWindowContext();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState({
    username: "",
    password: "",
  });
  const { login } = useAuth();

  /**
   * Updates form data state when input fields change.
   * @param {Object} e - Event object from form inputs.
   */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Validates all form fields using utility functions and updates the validationErrors state.
   * @returns {boolean} True if all form fields are valid, false otherwise.
   */
  const validateForm = () => {
    const errors = {
      username: "",
      password: "",
    };

    // Validation du pseudo
    const usernameValidation = validateUsername(formData.username);
    if (!usernameValidation.isValid) {
      errors.username = usernameValidation.errorMessage;
    }

    // Validation du mot de passe
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.errorMessage;
    }

    setValidationErrors(errors);

    // Vérifie si tous les champs sont valides
    return Object.values(errors).every((error) => error === "");
  };

  /**
   * Handles the form submission event, performs the login, and processes the result.
   * @param {Object} e - Event object to prevent default form submission behavior.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const loginResult = await login(formData);

        if (loginResult === true) {
          openSuccessWindow("connection.loginSuccess");
          dispatch(loggedIn());
        } else if (loginResult || loginResult.error === "invalid_credentials") {
          // Affichez un message d'erreur indiquant une mauvaise combinaison pseudo/mdp
          setValidationErrors({
            ...validationErrors,
            username: "",
            password: "error.noAccountFound",
          });
        } else {
          // Autres erreurs
          console.error("Failed to log in.");
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
        {getTranslatedWord("connection.loginMessage")}
      </div>
      <form onSubmit={handleSubmit} className="myForm">
        <TextInputComponent
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder={getTranslatedWord("connection.username")}
          errorMessage={validationErrors.username}
          styleClass={"input-connectionDefault"}
          iconSrc="static/media/assets/images/icons/black/profile.png"
        />
        <TextInputComponent
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          placeholder={getTranslatedWord("connection.password")}
          errorMessage={validationErrors.password}
          styleClass={"input-connectionDefault"}
          iconSrc="static/media/assets/images/icons/black/password.png"
        />
        <Button
          styleClass="btn-connectionDefault login-button back-color1"
          type="submit"
          label={getTranslatedWord("connection.login")}
        />
        <Button
          onClick={() => openWindow("forgot")}
          styleClass="btn-connectionDefault forgot-button back-color3"
          label={getTranslatedWord("connection.forgotPass")}
        />
      </form>

      <Button
        onClick={() => openWindow("register")}
        styleClass="btn-connectionDefault register-button back-color1"
        label={getTranslatedWord("connection.registerNewAcc")}
      />
      {/* <Button
        styleClass="btn-connectionDefault google-button back-color3"
        label={getTranslatedWord("connection.signinG")}
        iconSrc="static/media/assets/images/icons/white/google.png"
        iconStyle={true}
      /> */}
    </div>
  );
};

export default LoginWindow;
