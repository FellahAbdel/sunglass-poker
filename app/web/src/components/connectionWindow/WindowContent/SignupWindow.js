// forgotPassword.jsx
import React, { useState } from "react";
import Button from "../../button/Buttons";
import LogoComponent from "../../logo/Logo";
import TextInputComponent from "../../textInput/TextInput";
import Text from "../../text/Text";
import { useAuth } from "../../AuthProvider";

const SignUpWindow = ({ openLoginWindow, onClose, showSuccess }) => {
  const { registerUser } = useAuth();
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

    try {
      const success = await registerUser(formData);

      if (success) {
        showSuccess("Account created with success!");
      } else {
        //Feedback a faire
        console.error("Failed to create user.");
      }
    } catch (error) {
      console.error("Error:", error);
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
