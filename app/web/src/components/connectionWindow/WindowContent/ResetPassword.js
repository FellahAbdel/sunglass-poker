import React, { useState } from "react";
import Button from "../../button/Buttons";
import LogoComponent from "../../logo/Logo";
import TextInputComponent from "../../textInput/TextInput";
import Text from "../../text/Text";
import { useAuth } from "../../AuthProvider";
import {
  validateEmail,
  validatePassword,
  validatePasswordMatch,
} from "../../ValidationUtils";

const ResetPasswordWindow = ({ openLoginWindow, onClose, showSuccess }) => {
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

    const { email, password, repeatPassword } = formData;

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
      <Text className="title" content="Reset your password" />
      <LogoComponent className="logoconnexion" />
      <Text className="littletext" content="Enter your new password here" />
      <form onSubmit={handleSubmit} className="myForm">
        <TextInputComponent //Temporaire, il faudrait que l'e-mail soit passé en parametre et récupéré dans le mail du user
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Mail (temporary)"
          errorMessage={validationErrors.email}
          style={"input-login"}
        />
        <TextInputComponent
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          placeholder="Password"
          errorMessage={validationErrors.password}
          style={"input-login"}
        />
        <TextInputComponent
          name="repeatPassword"
          value={formData.repeatPassword}
          onChange={handleChange}
          type="password"
          placeholder="Repeat your password"
          errorMessage={validationErrors.repeatPassword}
          style={"input-login"}
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
      <p></p>
    </div>
  );
};

export default ResetPasswordWindow;
