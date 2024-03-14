import React, { useState } from "react";
import Button from "../../button/Buttons";
import LogoComponent from "../../logo/Logo";
import TextInputComponent from "../../textInput/TextInput";
import Text from "../../text/Text";
import { useAuth } from "../../AuthProvider";
const ForgotPassword = ({
  openResetPassword,
  openLoginWindow,
  showSuccess,
}) => {
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
      <Text className="title" content="You forgot your password?" />
      <LogoComponent className="logoconnexion" />
      <Text className="littletext" content="Enter your account email here" />
      <form onSubmit={handleSubmit} className="myForm">
        <TextInputComponent
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          errorMessage={validationError}
          style={"input-login"}
        />
        <Button
          className="buttonconnexion button login-button"
          type="submit"
          label="Send"
        />
        <Button
          className="buttonconnexion button login-button"
          type="temporary"
          onClick={openResetPassword}
          label="TEMPORARY BUTTON"
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

export default ForgotPassword;
