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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Effectuer la vérification de l'e-mail en utilisant la fonction de AuthProvider
      await checkEmail(formData.email);
    } catch (error) {
      console.error("Error:", error);
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
          type="email"
          placeholder="Email"
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
    </div>
  );
};

export default ForgotPassword;
