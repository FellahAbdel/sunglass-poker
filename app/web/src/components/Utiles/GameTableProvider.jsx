import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "./AuthProvider.jsx";
import {
  gameTableReducer,
  SET_MASTER,
  SET_WAITING_MESSAGE_VISIBLE,
} from "../../store/reducers/GameTableReducer.js";

// Créer un contexte pour la table de jeu
const GameTableContext = createContext();

// Créer un provider pour le contexte
export const GameTableProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameTableReducer, {
    isMaster: false,
    showWaitingMessage: false,
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
