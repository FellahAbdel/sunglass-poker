// This file contains the reducer for game-related actions
import { CALL_ACTION } from '../actions/gameActions';

const initialState = {
  // Initial state of game
  user: {
    // Initial state of user
    chips: 1000,
    // User's available chips
    betAmount: 0
    // User's current bet amount
  }
  // Other game state variables can be added here
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case CALL_ACTION:
      return {
        // ! Attention on modifie pas directement state : 
        ...state, 
        user: {
          ...state.user,
          chips: state.user.chips - action.payload,
          betAmount: state.user.betAmount + action.payload
        }
      };
    // Other game actions can be handled here
    default:
      return state;
  }
};

export default gameReducer;