import React, { useState, useEffect } from "react";
import "./createTableWindow.css";
import Button from "../../button/Button.tsx"; // Assurez-vous que le chemin est correct
import TextInputComponent from "../../textInput/TextInput";
import { useWindowContext } from "../../Utiles/WindowContext.jsx";
import { useAuth } from "../../Utiles/AuthProvider";
import {
  validateUsername,
  validatePasswordOrNull,
} from "../../Utiles/ValidationUtils.jsx";

import { useDispatch, useSelector } from "react-redux";
import { createGameV2 } from "../../../store/actions/clientInteractionsCreator.js";
import { useTranslation } from "../../Utiles/Translations.jsx";

/**
 * Provides a UI for users to create a new game room or join an existing one,
 * including server name input, optional password, and rank selection.
 */
const CreateGameWindow = () => {
  const { openWindow, showGameTable, closeWindow, setWindowType } =
    useWindowContext();
  const { createGameRoom, user } = useAuth();
  const { getTranslatedWord } = useTranslation();

  const dispatch = useDispatch();
  const gameCreated = useSelector((state) => state.game.gameCreated);

  // Define your function to display the game room
  const displayGameRoom = () => {
    // Your logic to display the game room goes here
    console.log("Game room displayed!");
    showGameTable();
    closeWindow();
    setWindowType("");
  };

  useEffect(() => {
    if (gameCreated) {
      displayGameRoom();
      console.log("gameCreated (useEffect)", gameCreated);
    }
  }, [gameCreated]);

  const [formData, setFormData] = useState({
    serverName: "",
    password: "",
    rank: "friendly",
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
    // Create an object with only the _id and pseudo fields from the user
    const masterInfo = 0; // master

    console.log("user", user);
    if (validateForm()) {
      try {
        const result = await createGameRoom(
          formData.serverName,
          formData.password,
          formData.rank,
          masterInfo
        );

        if (result && result.error) {
          if (result.error === "game_exists") {
            // Afficher un message d'erreur indiquant que le jeu existe déjà
            setValidationErrors((prevErrors) => ({
              ...prevErrors,
              serverName: getTranslatedWord("serverPanel.gameExist"),
            }));
          } else {
            // Autres erreurs
            console.error("Failed to create game:", result.error);
          }
        }
        else if (result) {
          // We dispatch the action to start the game
          const gameRoomId = result;
          console.log("Game created with ID:", gameRoomId);
          dispatch(createGameV2(gameRoomId));
          // We have to wait for the game to be created before closing the window
          // And then we sent the user to the game room
          //   showGameTable();
          //   closeWindow();
          //   setWindowType("");
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
          placeholder="game.gameName"
          errorMessage={validationErrors.serverName}
          styleClass="input-connectionDefault input-icon-GameName"
        />
        <TextInputComponent
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          placeholder="game.PasswordOptionnal"
          errorMessage={validationErrors.password}
          styleClass="input-connectionDefault input-icon-password"
        />
        <div className="container-select-rank">
          <label htmlFor="rank-select">{getTranslatedWord("serverPanel.selectRank")}</label>
          <select
            name="rank"
            id="rank-select"
            className="select-rank"
            value={formData.rank}
            onChange={handleChange}
          >
            <option value="friendly">{getTranslatedWord("serverPanel.friendly")}</option>
            <option value="intermediate">{getTranslatedWord("serverPanel.intermediate")}</option>
            <option value="advanced">{getTranslatedWord("serverPanel.advanced")}</option>
            <option value="elite">{getTranslatedWord("serverPanel.elite")}</option>
          </select>
        </div>
        <Button
          styleClass="btn-connectionDefault start-button back-color1"
          type="submit"
          label={getTranslatedWord("serverPanel.createTheGame")}
        />
        <br />
        <Button
          styleClass="btn-connectionDefault start-button back-color2"
          type="button"
          label={getTranslatedWord("game.joinGame")}
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
