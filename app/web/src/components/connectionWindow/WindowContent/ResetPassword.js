import React, { useState } from "react";
import Button from "../../button/Buttons";
import LogoComponent from "../../logo/Logo";
import TextInputComponent from "../../textInput/TextInput";
import Text from "../../text/Text";

const ResetPasswordWindow = ({ openLoginWindow, onClose, showSuccess }) => {
  const [formData, setFormData] = useState({
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
  
    const { email, password, repeatPassword } = formData;
  
    // Vérifier si les mots de passe sont identiques
    if (password !== repeatPassword) {
      console.error("Passwords do not match");
      //Faire le feedback
      return;
    }
  
    try {
      // Effectuer une requête pour modifier le mot de passe dans la base de données
      const response = await fetch("http://localhost:3001/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        console.log(data.message); // Affichez un message de succès
        showSuccess("Password changed !");
        return;
      } else {
        console.error(data.message); // Affichez un message d'erreur
        // feedback a faire
      }
    } catch (error) {
      console.error("Error:", error);
      // Vous pouvez afficher un message d'erreur à l'utilisateur si nécessaire
    }
  
    onClose();
  };

  return (
    <div className="box">
      <Text className="title" content="Reset your password" />
      <LogoComponent className="logoconnexion" />
      <Text className="littletext" content="Enter your new password here" />
      <form onSubmit={handleSubmit} className="myForm">
        <TextInputComponent //Temporaire, il faudrait que l'e-mail soit passé en parametre et récupérer dans le mail du user
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          placeholder="Mail (temporary)"
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
    </div>
  );
};

export default ResetPasswordWindow;
