import * as actions from "../actions/clientInteractionsType.js";

const initialState = {
  gameStarted: false,
};

const clientInteractionsReducer = (state = initialState, action) => {
  switch (action.type) {
    // case actions.REFRESH:
    //     console.log('Refresh page');
    //     if(action.payload.game === undefined) return state;
    //     return {
    //         ...state,
    //         table:action.payload.table,
    //         players:action.payload.game.players
    //       };
    default:
      return state;
  }
};

export default clientInteractionsReducer;
