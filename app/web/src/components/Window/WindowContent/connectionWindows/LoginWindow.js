//LoginWindow.js
import React, { useState } from "react";
import Button from "../../../button/Button.tsx";
import TextInputComponent from "../../../textInput/TextInput.jsx";
import { useAuth } from "../../../Utiles/AuthProvider.jsx";
import { useWindowContext } from "../../../Utiles/WindowContext.jsx";
import { useTranslation } from "../../../Utiles/Translations.jsx";

const LoginWindow = () => {
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginResult = await login(formData);

      if (loginResult === true) {
        openSuccessWindow("connection.loginSuccess");
      } else if (loginResult || loginResult.error === "invalid_credentials") {
        // Affichez un message d'erreur indiquant une mauvaise combinaison pseudo/mdp
        setValidationErrors({
          ...validationErrors,
          username: "",
          password: "No account found",
        });
      } else {
        // Autres erreurs
        console.error("Failed to log in.");
      }
    } catch (error) {
      console.error("Error:", error);
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
          styleClass={"input-connectionDefault input-icon-profile"}
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
      <Button
        styleClass="btn-connectionDefault google-button back-color3"
        label={getTranslatedWord("connection.signinG")}
        iconSrc={require("./../../../assets/images/icons/white/google.png")}
        iconStyle={true}
      />
    </div>
  );
};

export default LoginWindow;
