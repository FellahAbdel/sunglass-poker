import React, { useState } from "react";
import "./createTableWindow.css";
import Button from "../../button/Button.tsx"; // Assurez-vous que le chemin est correct
import TextInputComponent from "../../textInput/TextInput";
import { useWindowContext } from "../../Utiles/WindowContext.jsx";

const CreateGameWindow = () => {
  const { openWindow, openSuccessWindow } = useWindowContext();

  const [gameData, setGameData] = useState({
    serverName: "",
    password: "",
    rank: "Friendly",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setGameData((prevGameData) => ({
      ...prevGameData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Creating game with settings:", gameData);

    openSuccessWindow("Game created successfully", "servers");

    // Creer la partie
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
