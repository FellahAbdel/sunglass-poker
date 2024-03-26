// forgotPassword.jsx
import React, { useState } from "react";
import Button from "../../button/Button.tsx";
import LogoComponent from "../../logo/Logo";
import TextInputComponent from "../../textInput/TextInput";
import { useAuth } from "../../AuthProvider";
import {
  validateUsername,
  validateEmail,
  validatePassword,
  validatePasswordMatch,
} from "../../ValidationUtils";
import { useWindowContext } from "../../WindowContext";

const SignUpWindow = ({}) => {
  const {
    closeWindow,
    isWindowOpen,
    windowType,
    openSuccessWindow,
    openWindow,
  } = useWindowContext();
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
          openSuccessWindow("Account created with success!");
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
      <div className="login-page-title">Create your account</div>
      <form onSubmit={handleSubmit} className="myForm">
        <TextInputComponent
          name="pseudo"
          value={formData.pseudo}
          onChange={handleChange}
          placeholder="Username"
          errorMessage={validationErrors.pseudo}
          style={"input-login"}
        />
        <TextInputComponent
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          errorMessage={validationErrors.email}
          style={"input-login"}
        />
        <TextInputComponent
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          type={"password"}
          errorMessage={validationErrors.password}
          style={"input-login"}
        />
        <TextInputComponent
          name="repeatPassword"
          value={formData.repeatPassword}
          onChange={handleChange}
          placeholder="Repeat your password"
          type={"password"}
          errorMessage={validationErrors.repeatPassword}
          style={"input-login"}
        />
        <Button
          style="buttonconnexion login-button"
          type="submit"
          label="Register"
        />
      </form>

      <Button
        style="buttonconnexion login-button google-button"
        label="Register with google"
        iconSrc={require("./../../assets/images/icons/google.png")}
        iconStyle={true}
      />

      <Button
        onClick={() => openWindow("login")}
        style="buttonconnexion forgot-button"
        label="Already have an account ?"
      />
    </div>
  );
};

export default SignUpWindow;
