import *  as actions from "../actions/clientInteractionsType.js";

const initialState = {
    table: {
      deck: {},
      cards: [],
      chips: 0,
      stake: 0,
    },
    players: [],
  };


const tableReducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.GAME_STARTED:
          console.log(action);
          console.log("game started");
          return {
            ...state,
            table:action.payload.table,
            players:action.payload.players
          }
        default:
            console.log("Table reducer called");
            return state;
    }
}

export default tableReducer;