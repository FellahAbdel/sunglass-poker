import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
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
  const [playerCards, setPlayerCards] = useState([]);

  useEffect(() => {
    const isMaster =
      gameInfo && gameInfo.game && gameInfo.game.master === userId;
    dispatch({ type: SET_MASTER, payload: isMaster });
  }, [userId, gameInfo?.game?.master]);

  useEffect(() => {
    if (gameInfo && gameInfo.game && gameInfo.game.state) {
      dispatch({
        type: SET_WAITING_MESSAGE_VISIBLE,
        payload: gameInfo.game.state === "waiting",
      });
    }
  }, [gameInfo?.game?.state]);

  useEffect(() => {
    if (gameInfo && gameInfo.game && gameInfo.game.focus != null) {
      const focusPlayerId = gameInfo.game.players[gameInfo.game.focus].playerId;
      const isFocus = focusPlayerId === userId;
      // console.log("Focus:", gameInfo.game.focus);
      // console.log("Est-ce que je suis focus:", isFocus);
      dispatch({ type: SET_FOCUS, payload: isFocus });
    }
  }, [gameInfo?.game?.focus, userId]);

  useEffect(() => {
    if (gameInfo && gameInfo.game && gameInfo.game.players) {
      const currentPlayer = gameInfo.game.players.find(
        (player) => player.playerId === userId
      );
      if (currentPlayer && currentPlayer.playerCards) {
        // Assurer que chaque carte a un numéro et une couleur définis
        const transformedCards = currentPlayer.playerCards
          .filter(
            (card) => card.number !== undefined && card.color !== undefined
          )
          .map((card) => [card.number.toString(), card.color]);
        console.log("Transformed Cards:", transformedCards);
        setPlayerCards(transformedCards);
      }
    }
  }, [gameInfo, userId]);

  return (
    <GameTableContext.Provider value={{ ...state, playerCards }}>
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
