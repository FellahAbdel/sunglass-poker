import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "./AuthProvider.jsx";
import {
  gameTableReducer,
  SET_MASTER,
  SET_WAITING_MESSAGE_VISIBLE,
  SET_FOCUS,
} from "../../store/reducers/GameTableReducer.js";

// Créer un contexte pour la table de jeu
const GameTableContext = createContext();

// Créer un provider pour le contexte
export const GameTableProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameTableReducer, {
    isMaster: false,
    showWaitingMessage: false,
    isFocus: null,
  });
  const { userId } = useAuth();
  const gameInfo = useSelector((state) => state.game);

  // Mettre à jour si l'utilisateur est le maître du jeu
  useEffect(() => {
    const isMaster = gameInfo && gameInfo.game && gameInfo.game.master === userId;
    dispatch({ type: SET_MASTER, payload: isMaster });
  }, [userId, gameInfo?.game?.master]);

  // Contrôler la visibilité du message d'attente
  useEffect(() => {
    if (gameInfo && gameInfo.game && gameInfo.game.state) {
      dispatch({
        type: SET_WAITING_MESSAGE_VISIBLE,
        payload: gameInfo.game.state === "waiting",
      });
    }
  }, [gameInfo?.game?.state]);

  // Mettre à jour le focus
  useEffect(() => {
    if (gameInfo && gameInfo.game && gameInfo.game.focus != null) {
      // Récupérer l'ID du joueur ciblé par le focus
      const focusPlayerId = gameInfo.game.players[gameInfo.game.focus].playerId;
      // Déterminer si l'utilisateur actuel est focus en comparant les IDs
      const isFocus = focusPlayerId === userId;
      console.log("Focus:", gameInfo.game.focus);
      console.log("Est-ce que je suis focus:", isFocus);
      dispatch({ type: SET_FOCUS, payload: isFocus });
    }
  }, [gameInfo?.game?.focus, userId]);

  return (
    <GameTableContext.Provider value={state}>
      {children}
    </GameTableContext.Provider>
  );
};

// Hook personnalisé pour accéder au contexte
export const useGameTable = () => {
  const context = useContext(GameTableContext);
  if (!context) {
    throw new Error("useGameTable must be used within a GameTableProvider");
  }
  return context;
};
