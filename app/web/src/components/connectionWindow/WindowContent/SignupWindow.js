// forgotPassword.jsx
import React, { useState } from "react";
import Button from "../../button/Buttons";
import LogoComponent from "../../logo/Logo";
import TextInputComponent from "../../textInput/TextInput";
import Text from "../../text/Text";

const SignUpWindow = ({ openLoginWindow, onClose, showSuccess }) => {
  const [formData, setFormData] = useState({
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { pseudo, email, password, repeatPassword } = formData;

    try {
      // Vérifier que les champs requis sont présents
      if (!pseudo || !email || password === "") {
        console.error("Veuillez remplir tous les champs obligatoires");
        return;
      }

      if (password !== repeatPassword) {
        console.error("Passwords do not match");
        //Faire le feedback
        return;
      }

      // Ajouter la propriété 'coins' avec la valeur 0
      const formDataWithCoins = { ...formData, coins: 0 };

      // Effectuer la requête POST vers votre API
      const response = await fetch("http://localhost:3001/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataWithCoins),
      });

      if (response.ok) {
        console.log("Utilisateur créé avec succès!");
        // Ajouter ici la logique pour rediriger ou afficher un message de succès
        showSuccess("Account created with success!");
        return;
      } else {
        console.error("Erreur lors de la création de l'utilisateur");
      }
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur :", error);
    }
  };

  return (
    <div className="box">
      <Text className="title" content="Create your account" />
      <LogoComponent className="logoconnexion" />
      <form onSubmit={handleSubmit} className="myForm">
        <TextInputComponent
          name="pseudo"
          value={formData.pseudo}
          onChange={handleChange}
          placeholder="Username"
        />
        <TextInputComponent
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          placeholder="Email"
        />
        <TextInputComponent
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          placeholder="Password"
        />
        <TextInputComponent
          name="repeatPassword"
          value={formData.repeatPassword}
          onChange={handleChange}
          type="password"
          placeholder="Repeat your password"
        />
        <Button
          className="buttonconnexion login-button"
          type="submit"
          label="Register"
        />
      </form>
      <p></p>
      <Button
        className="buttonconnexion login-button google-button"
        label="Register with google"
      />
      <Button
        onClick={openLoginWindow}
        className="buttonconnexion forgot-button"
        label="Already have an account ?"
      />
    </div>
  );
};

export default SignUpWindow;
