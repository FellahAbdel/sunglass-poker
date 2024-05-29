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

/**
 *Manages the game table state, including player data updates and table data.
 *Provides functions to access game information and player data.
 */
export const GameTableProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameTableReducer, {
    isMaster: false,
    showWaitingMessage: false,
    isFocus: null,
  });
  const { userId } = useAuth();
  const gameInfo = useSelector((state) => state.game);
  const [playerCards, setPlayerCards] = useState([]);
  const [playerMoney, setPlayerMoney] = useState(0);
  const [communityCards, setCommunityCards] = useState([]);
  const [gameCurrentBet, SetGameCurrentBet] = useState(0);
  const [playerBonus, setPlayerBonus] = useState([]);
  const [autoRestartStatus, setautoRestartStatus] = useState(true);
  //MAel a add mais pas sur du fonctionnement
  const [gamePlayerCurrentBet, setGamePlayerCurrentBet] = useState([]);
  const [total, setTotal] = useState(0);
  const [gameState, setGameState] = useState("");
  const [isSpectator, setIsSpectator] = useState(false);
  const [playerHandName, setPlayerHandName] = useState("");
  const [serverName, setServerName] = useState("");
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);

  useEffect(() => {
    const isMaster =
      gameInfo && gameInfo.game && gameInfo.game.master === userId;
    dispatch({ type: SET_MASTER, payload: isMaster });
  }, [userId, gameInfo]);

  useEffect(() => {
    if (gameInfo && gameInfo.game && gameInfo.game.state) {
      dispatch({
        type: SET_WAITING_MESSAGE_VISIBLE,
        payload: gameInfo.game.state === "waiting",
      });
    }
  }, [gameInfo]);

  useEffect(() => {
    if (
      gameInfo &&
      gameInfo.game &&
      gameInfo.game.focus != null &&
      gameInfo.game.players &&
      gameInfo.game.players.length > gameInfo.game.focus
    ) {
      const focusPlayer = gameInfo.game.players[gameInfo.game.focus];
      if (focusPlayer) {
        const focusPlayerId = focusPlayer.playerId;
        const isFocus = focusPlayerId === userId;
        dispatch({ type: SET_FOCUS, payload: isFocus });
      }
    } else {
      // Si 'focus' est null ou non défini, ou l'index est invalide, réinitialiser isFocus
      dispatch({ type: SET_FOCUS, payload: false });
    }
  }, [gameInfo, userId]);

  // Mettre à jour l'argent du joueur
  useEffect(() => {
    if (gameInfo && gameInfo.game && gameInfo.game.players) {
      const currentPlayer = gameInfo.game.players.find(
        (player) => player.playerId === userId
      );
      if (currentPlayer) {
        setPlayerMoney(currentPlayer.playerMoney);
        setPlayerHandName(currentPlayer.playerHandName);
        setGamePlayerCurrentBet(
          gameInfo.game.players.find((p) => p.playerId === userId)
            .currentBetTurn
        );
        setIsSpectator(currentPlayer.isSpectator);

        // Mettre à jour les cartes du joueur
        if (currentPlayer.playerCards) {
          const cardsWithVisibility = currentPlayer?.playerCards?.map(
            (card, index) => ({
              number: card.number,
              color: card.color,
              isVisible: currentPlayer.cardsVisible
                ? currentPlayer.cardsVisible[index]
                : false,
            })
          );
          setPlayerCards(cardsWithVisibility);
        }

        //Mettre a jour le bonus du joueur
        setPlayerBonus(
          gameInfo.game.players.find((p) => p.playerId === userId).playerBonus
        );
      } else {
        setIsSpectator(true);
      }

      if (gameInfo?.game.autoRestartStatus !== undefined) {
        setautoRestartStatus(gameInfo.game.autoRestartStatus);
      }

      // Mettre à jour les cartes communautaires
      if (gameInfo?.game.pokerTable.communityCards) {
        setCommunityCards(gameInfo.game.pokerTable.communityCards);
      }

      if (gameInfo?.game) {
        SetGameCurrentBet(gameInfo.game.gameCurrentBet);
      }

      if (gameInfo?.game) {
        setTotal(gameInfo.game.total);
      }

      if (gameInfo?.game) {
        setGameState(gameInfo.game.state);
      }

      if (gameInfo?.game?.serverName) {
        setServerName(gameInfo.game.serverName);
      }
      setNumberOfPlayers(gameInfo.game.players.length);
    }
  }, [gameInfo, userId]);

  return (
    <GameTableContext.Provider
      value={{
        ...state,
        playerBonus,
        playerCards,
        playerMoney,
        communityCards,
        gameCurrentBet,
        gamePlayerCurrentBet,
        total,
        gameState,
        isSpectator,
        serverName,
        playerHandName,
        numberOfPlayers,
        autoRestartStatus,
      }}
    >
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
