import React, { useState } from "react";
import "./createTableWindow.css";
import Button from "../../button/Button.tsx"; // Assurez-vous que le chemin est correct
import TextInputComponent from "../../textInput/TextInput";
import { useWindowContext } from "../../Utiles/WindowContext.jsx";
import { useAuth } from "../../Utiles/AuthProvider";

const CreateGameWindow = () => {
  const { openWindow, openSuccessWindow } = useWindowContext();
  const { createGameRoom } = useAuth();

  const [gameData, setGameData] = useState({
    serverName: "",
    password: "",
    rank: "Friendly",
    countPlayers: 1, // The master of the room is always present.
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setGameData((prevGameData) => ({
      ...prevGameData,
      [name]: value,
    }));
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
      console.log("Game created successfully");

      openSuccessWindow("Game created successfully", "servers");

      //   openWindow("list_table");
    } else {
      // Handle failure
      console.error("Error creating game");
    }
  };

  return (
    <div className="box create-game-box">
      <form onSubmit={handleSubmit} className="myForm">
        <TextInputComponent
          name="serverName"
          value={gameData.serverName}
          onChange={handleChange}
          placeholder="Game name"
          errorMessage=""
          styleClass="input-connectionDefault input-icon-GameName"
        />
        <TextInputComponent
          name="password"
          value={gameData.password}
          onChange={handleChange}
          type="password"
          placeholder="Password (optional)"
          errorMessage=""
          styleClass="input-connectionDefault input-icon-password"
        />
        <div className="container-select-rank">
          <label htmlFor="rank-select">Select rank</label>
          <select
            name="rank"
            id="rank-select"
            className="select-rank"
            value={gameData.rank}
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
          type="submit"
          label="Join a Game"
          onClick={() => openWindow("list_table")}
        />
      </form>
    </div>
  );
};

export default CreateGameWindow;
