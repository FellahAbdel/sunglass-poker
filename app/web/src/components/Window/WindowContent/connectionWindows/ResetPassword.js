import React, { useState } from "react";
import Button from "../../../button/Button.tsx";
import TextInputComponent from "../../../textInput/TextInput.jsx";
import { useAuth } from "../../../Utiles/AuthProvider.jsx";
import {
  validateEmail,
  validatePassword,
  validatePasswordMatch,
} from "../../../Utiles/ValidationUtils.jsx";
import { useWindowContext } from "../../../Utiles/WindowContext.jsx";
import { useTranslation } from "../../../Utiles/Translations.jsx";

const ResetPasswordWindow = ({}) => {
  const { getTranslatedWord } = useTranslation();
  const { openWindow, openSuccessWindow } = useWindowContext();
  const { changePassword } = useAuth();

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

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: "",
    }));
  };

  const validateForm = () => {
    const errors = {
      email: "",
      password: "",
      repeatPassword: "",
    };

    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      errors.email = emailValidation.errorMessage;
    }

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.errorMessage;
    }

    const passwordMatchValidation = validatePasswordMatch(
      formData.password,
      formData.repeatPassword
    );
    if (!passwordMatchValidation.isValid) {
      errors.repeatPassword = passwordMatchValidation.errorMessage;
    }

    setValidationErrors(errors);
    return Object.values(errors).every((error) => error === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (validateForm()) {
      try {
        const result = await changePassword(email, password);

        if (result === true) {
          openSuccessWindow(getTranslatedWord("connection.successReset"));
        } else {
          console.error("Error changing password:", result.error);
          setValidationErrors("error.emailNotFound");
        }
      } catch (error) {
        console.error("Error changing password:", error);
        setValidationErrors("error.emailNotFound");
      }
    } else {
      console.error("Form validation failed");
    }
  };

  return (
    <div className="box">
      <div className="login-page-title">
        {getTranslatedWord("connection.resetPassword")}
      </div>
      <div className="login-page-text">
        {getTranslatedWord("connection.enterNewPassword")}
      </div>
      <form onSubmit={handleSubmit} className="myForm">
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
          styleClass="btn-connectionDefault back-color1"
          type="submit"
          label={getTranslatedWord("connection.send")}
        />
      </form>
      <Button
        styleClass="btn-connectionDefault back-color3"
        onClick={() => openWindow("login")}
        label={getTranslatedWord("connection.returnConnection")}
      />
    </div>
  );
};

export default ResetPasswordWindow;
