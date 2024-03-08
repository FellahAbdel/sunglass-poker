import React, { useState } from "react";
import Button from "../../button/Buttons";
import LogoComponent from "../../logo/Logo";
import TextInputComponent from "../../textInput/TextInput";
import Text from "../../text/Text";

const LoginWindow = ({
  openSignUpWindow,
  openForgotPassword,
  showSuccess,
  logingIn,
}) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // Actions après succès
        console.log(data.message);
        showSuccess("Logged with success ! ");
        logingIn();
        return;
      } else {
        console.error(data.message);
        // Actions après mauvaise combinaison (ajouter message à l'utilisateur)
        return;
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
    }
  };

  return (
    <div className="box">
      <Text className="title" content="Sign in to your account" />
      <LogoComponent className="logoconnexion" />
      <form onSubmit={handleSubmit} className="myForm">
        <TextInputComponent
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <TextInputComponent
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          placeholder="Password"
        />
        <Button
          className="buttonconnexion login-button"
          type="submit"
          label="Login"
        />
      </form>
      <Button
        onClick={openForgotPassword}
        className="buttonconnexion forgot-button"
        label="I forgot my password. Click here to reset"
      />
      <p></p>
      <Button
        onClick={openSignUpWindow}
        className="buttonconnexion register-button"
        label="Register New Account"
      />
      <Text className="littletext" content="or" />
      <Button
        className="buttonconnexion login-button google-button"
        label="Sign in with google"
      />
    </div>
  );
};

export default LoginWindow;
