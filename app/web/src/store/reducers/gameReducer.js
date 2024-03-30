// This file contains the reducer for game-related actions
import * as actions from "../actions/actionTypes.js";
import Deck from "../../shared/Deck.js";
import Player from "../../shared/Player.js";
import Game from "../../shared/Game.js";

const initialState = {
  gameClass: new Game(),
  // Initialy the game is in the preGame state and players can join
  players: [
    // Should be empty at the beginning
    new Player(0, "diallo"),
    ...Array.from(
      { length: 9 },
      (_, index) => new Player(index + 1, "Player" + index)
    ),
  ],
  controlsMode: "preGame", // Can be "preGame", "roundOne", "roundTwo", "roundThree", "endGame
};

const begin = (gameState) => {
  // Initialize players
  const players = gameState.players;
  players.forEach((player) => gameState.gameClass.addPlayer(player));

  // Start the game
  gameState.gameClass.start();

  return gameState;
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
