// This file contains the reducer for game-related actions
import * as actions from "../actions/actionTypes.js";
import Deck from "../../shared/Deck.js";
import Player from "../../shared/Player.js";
import Game from "../../shared/Game.js";

// import { useUserData } from "../../Utiles/useUserData";

const initialState = {
  gameClass: new Game(),
  // Initialy the game is in the preGame state and players can join
  players: [
    // Should be empty at the beginning
    // new Player(0, "diallo"),
    // ...Array.from(
    //   { length: 9 },
    //   (_, index) => new Player(index + 1, "Player" + index)
    // ),
  ],
  controlsMode: "preGame", // Can be "preGame", "roundOne", "roundTwo", "roundThree", "endGame
};

const begin = (gameState) => {
  // Initialize players
  const players = gameState.players;
  players.forEach((player) => gameState.gameClass.addPlayer(player));

  // Distribute small and big blinds
  const smallBlindPlayerId = 0; /* logic to determine small blind player id */
  const bigBlindPlayerId = 1; /* logic to determine big blind player id */
  const smallBlindAmount = 10; /* your small blind amount */
  const bigBlindAmount = 20; /* your big blind amount */

  // Designate small and big blinds
  gameState.gameClass.smallBlindPlayerId = smallBlindPlayerId;
  gameState.gameClass.bigBlindPlayerId = bigBlindPlayerId;

  // Distribute blinds
  gameState.gameClass.pokerTable.playerBet(
    gameState.gameClass.players[smallBlindPlayerId],
    smallBlindAmount
  );
  gameState.gameClass.pokerTable.playerBet(
    gameState.gameClass.players[bigBlindPlayerId],
    bigBlindAmount
  );

  // Start the game
  gameState.gameClass.start();

  return {
    ...gameState,
    controlsMode: "roundOne",
  };
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.PLAYER_JOINED:
      return {
        ...state,
        players: [...state.players, action.payload], // Add the new player to the list
      };
    case actions.START_GAME:
      return begin(state);
    // Other game actions can be handled here
    default:
      return state;
  }
};

export default gameReducer;
