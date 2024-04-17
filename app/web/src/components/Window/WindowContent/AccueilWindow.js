import React, { useEffect, useState } from "react";
import "./profileMenu.css";
//import ClientsProfile from "./../../gameTable/PlayersProfile/PlayersProfile";
import Button from "../../button/Button.tsx";
import { useWindowContext } from "../../Utiles/WindowContext.jsx";
import { useTranslation } from "../../Utiles/Translations.jsx";
import { useAuth } from "../../Utiles/AuthProvider.jsx";
import TextGlitch from "../../TextGlitch/TextGlitch.js";

import { useDispatch, useSelector } from "react-redux";
import { startGame } from "../../../store/actions/clientInteractionsCreator.js";

import "./acceuil.css";

const AcceuilWindow = () => {
  const { isLogged } = useAuth();
  const { closeWindow, openWindow, showGameTable, setWindowType } =
    useWindowContext();
  const { getTranslatedWord } = useTranslation();
  const dispatch = useDispatch();

  const isGameStarted = useSelector((state) => state.game.gameStarted); // Get the gameStarted state from redux store
  useEffect(() => {
    console.log("IsGameStarted: ", isGameStarted);
    // Check if the game has started whenever isGameStarted changes
    if (isGameStarted) {
      console.log("Game has started, showing game table");
      showGameTable();
    } else {
      console.log("Game has not started");
    }
  }, [isGameStarted]);

  const onClickStartGame = () => {
    if (isLogged) {
      dispatch(startGame());
      console.log("Utilisateur connecté, on montre la table");
      //   showGameTable();
      closeWindow();
      setWindowType("");
    } else {
      console.error("User not connected trying to start a game");
    }
  };

  return (
    <div className="profileMenu">
      <TextGlitch
        children={"SunGlassPoker"}
        styleClass={"glitch-accueil"}
        glitchStyle={"glitchStyle-accueil"}
      />
      <div className="container-startButtons">
        {isLogged ? (
          <>
            <Button
              styleClass={"btn-gameStart btn-gameJoin back-color1"}
              label={getTranslatedWord("game.startGame")}
              onClick={() => onClickStartGame()}
            />
            <Button
              styleClass={"btn-gameStart btn-gameJoin back-color1"}
              label={getTranslatedWord("game.joinGame")}
              onClick={() => openWindow("servers")}
            />
          </>
        ) : (
          <>
            <Button
              styleClass={"btn-gameStart btn-gameJoin back-color2"}
              label={getTranslatedWord("game.loginPlay")}
              onClick={() => openWindow("login")}
            />
            <Button
              styleClass={"btn-gameStart btn-gameJoin back-color2"}
              label={getTranslatedWord("game.signupPlay")}
              onClick={() => openWindow("register")}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AcceuilWindow;
