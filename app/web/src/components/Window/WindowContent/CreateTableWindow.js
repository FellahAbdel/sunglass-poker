import React, { useState } from "react";
import "./createTableWindow.css";
import Button from "../../button/Button.tsx"; // Assurez-vous que le chemin est correct
import TextInputComponent from "../../textInput/TextInput";
import { useWindowContext } from "../../Utiles/WindowContext.jsx";
import { useAuth } from "../../Utiles/AuthProvider";
import {
  validateUsername,
  validatePasswordOrNull,
} from "../../Utiles/ValidationUtils.jsx";

const CreateGameWindow = () => {
  const { openWindow, openSuccessWindow } = useWindowContext();
  const { createGameRoom } = useAuth();

  const [formData, setFormData] = useState({
    serverName: "",
    password: "",
    rank: "Friendly",
    countPlayers: 1,
  });

  const [validationErrors, setValidationErrors] = useState({
    serverName: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const errors = {
      serverName: "",
      password: "",
    };

    const usernameValidation = validateUsername(formData.serverName);
    if (!usernameValidation.isValid) {
      errors.serverName = usernameValidation.errorMessage;
    }

    const passwordValidation = validatePasswordOrNull(formData.password);
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.errorMessage;
    }

    setValidationErrors(errors);
    return Object.values(errors).every((error) => error === "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (validateForm()) {
      try {
        const result = await createGameRoom(
          formData.serverName,
          formData.password,
          formData.rank,
          formData.countPlayers
        );
  
        if (result === true) {
          openSuccessWindow("Game created successfully", "servers");
        } else if (result && result.error) {
          if (result.error === "game_exists") {
            // Afficher un message d'erreur indiquant que le jeu existe déjà
            setValidationErrors((prevErrors) => ({
              ...prevErrors,
              serverName: "Game name already exists",
            }));
          } else {
            // Autres erreurs
            console.error("Failed to create game:", result.error);
          }
        }
      } catch (error) {
        console.error("Error creating game:", error);
      }
    } else {
      // Feedback pour indiquer les erreurs de validation
      console.error("Form validation failed");
    }
  };




  return (
    <div className="box create-game-box">
      <form onSubmit={handleSubmit} className="myForm">
        <TextInputComponent
          name="serverName"
          value={formData.serverName}
          onChange={handleChange}
          placeholder="Game name"
          errorMessage={validationErrors.serverName}
          styleClass="input-connectionDefault input-icon-GameName"
        />
        <TextInputComponent
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          placeholder="Password (optional)"
          errorMessage={validationErrors.password}
          styleClass="input-connectionDefault input-icon-password"
        />
        <div className="container-select-rank">
          <label htmlFor="rank-select">Select rank</label>
          <select
            name="rank"
            id="rank-select"
            className="select-rank"
            value={formData.rank}
            onChange={handleChange}
          >
            <option value="Novice">Novice</option>
            <option value="Intermédiaire">Intermédiaire</option>
            <option value="Avancé">Avancé</option>
            <option value="Élite">Élite</option>
          </select>
        </div>
        <p></p>
        <Button
          styleClass="btn-connectionDefault start-button back-color1"
          type="submit"
          label="Create the Game"
        />
        <br />
        <Button
          styleClass="btn-connectionDefault start-button back-color2"
          type="button"
          label="Join a Game"
          onClick={() => openWindow("servers")}
        />
      </form>
    </div>
  );
};

export default CreateGameWindow;
