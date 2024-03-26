//LoginWindow.js
import React, { useState } from "react";
import Button from "../../button/Button.tsx";
import TextInputComponent from "../../textInput/TextInput";
import { useAuth } from "../../Utiles/AuthProvider";
import { useWindowContext } from "../../Utiles/WindowContext.jsx";

const LoginWindow = () => {
  const {
    openSuccessWindow,
    openWindow,
  } = useWindowContext();

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
        openSuccessWindow("Logged with success!");
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
      <div className="login-page-title">Login to your account</div>
      <form onSubmit={handleSubmit} className="myForm">
        <TextInputComponent
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          errorMessage={validationErrors.username}
          styleClass={"input-login"}
        />
        <TextInputComponent
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          placeholder="Password"
          errorMessage={validationErrors.password}
          styleClass={"input-login"}
        />
        <Button
          styleClass="buttonconnexion login-button"
          type="submit"
          label="Login"
        />
          <Button
          onClick={() => openWindow("forgot")}
          styleClass="buttonconnexion forgot-button"
          label="I forgot my password"
        />
      </form>

      <Button
        onClick={() => openWindow("register")}
        styleClass="buttonconnexion register-button"
        label="Register New Account"
      />
      <Button
        styleClass="buttonconnexion google-button"
        label="Sign in with google"
        iconSrc={require("./../../assets/images/icons/google.png")}
        iconStyle={true}
      />
    </div>
  );
};

export default LoginWindow;
