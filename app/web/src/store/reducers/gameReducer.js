// This file contains the reducer for game-related actions
import * as actions from "../actions/actionTypes.js";
import * as Deck from "../../shared/Deck.js";

const initialState = {
  table: {
    deck: new Deck(),
    cards: [],
    chips: 0,
    stake: 0,
  },
  player: new Player(0, "diallo"),
  opponents: Array.from(
    { length: 8 },
    (_, index) => new Player(index + 1, "Player" + index)
  ),
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
