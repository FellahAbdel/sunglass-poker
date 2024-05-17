// forgotPassword.jsx
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
          styleClass={"input-connectionDefault input-icon-profile"}
        />
        <TextInputComponent
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={getTranslatedWord("connection.email")}
          errorMessage={validationErrors.email}
          styleClass={"input-connectionDefault input-icon-email"}
        />
        <TextInputComponent
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder={getTranslatedWord("connection.password")}
          type={"password"}
          errorMessage={validationErrors.password}
          styleClass={"input-connectionDefault input-icon-password"}
        />
        <TextInputComponent
          name="repeatPassword"
          value={formData.repeatPassword}
          onChange={handleChange}
          placeholder={getTranslatedWord("connection.repeatPass")}
          type={"password"}
          errorMessage={validationErrors.repeatPassword}
          styleClass={"input-connectionDefault input-icon-passwordRepeat"}
        />
        <Button
          styleClass="btn-connectionDefault login-button back-color1"
          type="submit"
          label={getTranslatedWord("connection.signin")}
        />
      </form>

      {/* <Button
        styleClass="btn-connectionDefault google-button back-color3"
        label={getTranslatedWord("connection.signinG")}
        iconSrc="static/media/assets/images/icons/white/google.png"
        iconStyle={true}
      /> */}

      <Button
        onClick={() => openWindow("login")}
        styleClass="btn-connectionDefault forgot-button back-color1"
        label={getTranslatedWord("connection.haveAccQuestion")}
      />
    </div>
  );
};

export default SignUpWindow;
