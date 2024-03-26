// This file contains the reducer for game-related actions
import * as actions from "../actions/actionTypes.js";

const initialState = {
  // Initial state of game
  players: [
    {
      id: 1,
      chips: 1000,
      betAmount: 0,
    },
    // Additional player objects can be added here as needed
  ],
  // Other game state variables can be added here
  communityCards: [], // array of card objects
  currentPlayerIndex: 0,
  round: 0,
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CALL:
      const currentPlayer = state.players[state.currentPlayerIndex];
      const callAmount = action.payload;
      const chipsAfterCall = currentPlayer.chips - callAmount;
      const betAmountAfterCall = currentPlayer.betAmount + callAmount;

      return {
        ...state,
        players: state.players.map((player, index) => {
          if (index === state.currentPlayerIndex) {
            return {
              ...player,
              chips: chipsAfterCall,
              betAmount: betAmountAfterCall,
            };
          }
          return player;
        }),
      };
    // Other game actions can be handled here
    default:
      return state;
  }
};

export default gameReducer;
