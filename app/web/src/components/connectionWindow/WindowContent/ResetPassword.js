import React, { useState } from "react";
import Button from "../../button/Buttons";
import LogoComponent from "../../logo/Logo";
import TextInputComponent from "../../textInput/TextInput";
import Text from "../../text/Text";
import { useAuth } from "../../AuthProvider";

const ResetPasswordWindow = ({ openLoginWindow, onClose, showSuccess }) => {
  const { updateUserData } = useAuth();

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
      // Utilisez la fonction générique pour mettre à jour le mot de passe dans la base de données
      await updateUserData("password", password, "email", email);

      // Affichez un message de succès
      showSuccess("Password changed !");
    } catch (error) {
      console.error("Error changing password:", error);
      // Affichez un message d'erreur à l'utilisateur si nécessaire
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
