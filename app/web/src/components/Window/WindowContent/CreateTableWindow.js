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

import { useDispatch } from "react-redux";
import { startGame } from "../../../store/actions/clientInteractionsCreator.js";

const CreateGameWindow = () => {
  const { openWindow, showGameTable, closeWindow, setWindowType } =
    useWindowContext();
  const { createGameRoom } = useAuth();

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    serverName: "",
    password: "",
    rank: "Friendly",
    countPlayers: 1, // The master of the room is always present.
    master: user._id,
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
    console.log("Creating game with settings:", gameData);

    // Creer la partie
    const { serverName, password, rank, countPlayers } = gameData;
    const success = await createGameRoom(
      serverName,
      password,
      rank,
      countPlayers
    );

    if (success) {
      // Handle success
      console.log("Game room created successfully");

      // On fait un dispatch StartGame
      dispatch(startGame());

      // On envoie le master de la room à la table de jeux.
      showGameTable();
      closeWindow();
      setWindowType("");

      //   openWindow("list_table");
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
          // ICI QUE JE DOIT CHANGER (MAEL)
          //pas ici mais apres

          onClick={() => openWindow("servers")}

          ///////////////////////////////////////
        />
      </form>
    </div>
  );
};

export default CreateGameWindow;
