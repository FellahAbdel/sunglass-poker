import React, { useState } from "react";
import Button from "../../button/Button.tsx";
import TextInputComponent from "../../textInput/TextInput";
import { useAuth } from "../../Utiles/AuthProvider";
import { useWindowContext } from "../../Utiles/WindowContext.jsx";

const ForgotPassword = ({
  showSuccess,
}) => {
  const {
    openWindow,
  } = useWindowContext();
  const { checkEmail } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
  });

  const [validationError, setValidationError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Réinitialiser le message d'erreur lorsqu'un utilisateur modifie l'e-mail
    setValidationError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Effectuer la vérification de l'e-mail en utilisant la fonction de AuthProvider
      const result = await checkEmail(formData.email);

      if (result === true) {
        showSuccess("Reset password email sent successfully.");
      } else if (result === "not-found") {
        // Affichez un message d'erreur indiquant une mauvaise combinaison pseudo/mdp
        setValidationError("Email not found");
      } else {
        // Autres erreurs
        console.error("Failed to found the mail.");
      }
    } catch (error) {
      console.error("Error:", error);
      // Afficher le message d'erreur à l'utilisateur
      setValidationError(
        "Failed to send reset password email. Please check your email address."
      );
    }
  };

  return (
    <div className="box">
      <div className="login-page-title">Forgot your password ?</div>
      <div className="login-page-text">Enter your Email to receive a password reset link.</div>
      <form onSubmit={handleSubmit} className="myForm">
        <TextInputComponent
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          errorMessage={validationError}
          styleClass={"input-login"}
        />
        <Button
          styleClass="buttonconnexion button login-button"
          type="submit"
          label="Send"
        />
        <Button
          styleClass="buttonconnexion button login-button"
          type="temporary"
          onClick={() => openWindow("reset")}
          label="TEMPORARY BUTTON"
        />
      </form>
      <Button
        styleClass="buttonconnexion forgot-button"
        onClick={() => openWindow("login")}
        label="Return to connection menu"
      />
      <p></p>
    </div>
  );
};

export default ForgotPassword;
