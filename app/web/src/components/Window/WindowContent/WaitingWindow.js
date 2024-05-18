// TutorialWindow.jsx
import React, { useEffect } from "react";
import { useAuth } from "./../../Utiles/AuthProvider.jsx";
import { useDispatch } from "react-redux";
import { useGameTable } from "../../Utiles/GameTableProvider.jsx";
import TextGlitch from "../../TextGlitch/TextGlitch.js";
import Button from "../../button/Button.tsx";
import * as actions from "../../../store/actions/clientInteractionsCreator.js";

/**
 * WaitingWindow component displays a waiting screen for players before the game starts.
 * If the user is the master, they have the option to start the game.
 * The component also displays a message when it is the player's turn to act.
 */
const WaitingWindow = () => {
  const { userId } = useAuth();
  const { isMaster, showWaitingMessage, isFocus } = useGameTable();
  const dispatch = useDispatch();

  // Function to start the game.
  const startGame = () => {
    // Logique pour commencer la partie
    console.log("Starting game with roomId:");
    dispatch(actions.startGame(userId));
  };

  useEffect(() => {
    console.log("isFocus TABLE:", isFocus);
  }, [isFocus]);

  return (
    <div className={`container-waitingRoom`}>
      {showWaitingMessage && (
        <>
          <TextGlitch
            children={"En attente de joueurs"}
            styleClass={"glitch-accueil"}
            glitchStyle={"glitchStyle-accueil"}
          />
          {isMaster && (
            <Button
              styleClass="btn-connectionDefault back-color1"
              label={"Commencer la partie"}
              onClick={() => startGame()}
            />
          )}
          {/* Afficher le texte lorsque le focus est sur le joueur */}
          {isFocus && (
            <TextGlitch
              children={"A vous de jouer ! "}
              styleClass={"glitch-accueil"}
              glitchStyle={"glitchStyle-accueil"}
            />
          )}
        </>
      )}
    </div>
  );
};

export default WaitingWindow;
