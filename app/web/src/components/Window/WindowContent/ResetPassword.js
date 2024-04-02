import React, { useState } from "react";
import Button from "../../button/Button.tsx";
import TextInputComponent from "../../textInput/TextInput";
import { useAuth } from "../../Utiles/AuthProvider";
import {
  validateEmail,
  validatePassword,
  validatePasswordMatch,
} from "../../Utiles/ValidationUtils.jsx";
import { useWindowContext } from "../../Utiles/WindowContext.jsx";
import { useTranslation } from '../../Utiles/Translations';

const ResetPasswordWindow = ({ showSuccess }) => {
  const { getTranslatedWord } = useTranslation();
  const {
    openWindow,
  } = useWindowContext();
  const { updateUserData } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [validationErrors, setValidationErrors] = useState({
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

    const { email, password } = formData;

    if (validateForm()) {
      try {
        // Utilisez la fonction générique pour mettre à jour le mot de passe dans la base de données
        const result = await updateUserData(
          "password",
          password,
          "email",
          email
        );

        if (result === true) {
          showSuccess("Password changed!");
        } else {
          console.error("Error changing password:", result.error);
          validationErrors.email = "Email not found";
        }
      } catch (error) {
        console.error("Error changing password:", error);
        validationErrors.email = "Email not found";
      }
    } else {
      console.error("Form validation failed");
    }
  };

  return (
    <div className="box">
      <div className="login-page-title">Reset your password</div>
      <div className="login-page-text">Enter your new password here :</div>
      <form onSubmit={handleSubmit} className="myForm">
        <TextInputComponent //Temporaire, il faudrait que l'e-mail soit passé en parametre et récupéré dans le mail du user
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
          type="password"
          placeholder={getTranslatedWord("connection.password")}
          errorMessage={validationErrors.password}
          styleClass={"input-connectionDefault input-icon-password"}
        />
        <TextInputComponent
          name="repeatPassword"
          value={formData.repeatPassword}
          onChange={handleChange}
          type="password"
          placeholder={getTranslatedWord("connection.repeatPass")}
          errorMessage={validationErrors.repeatPassword}
          styleClass={"input-connectionDefault input-icon-passwordRepeat"}
        />
        <Button
          styleClass="btn-connectionDefault button login-button"
          type="submit"
          label="Send"
        />
      </form>
      <Button
        styleClass="btn-connectionDefault forgot-button"
        onClick={() => openWindow("login")}
        label="Return to connection menu"
      />
      <p></p>
    </div>
  );
};

export default ResetPasswordWindow;
