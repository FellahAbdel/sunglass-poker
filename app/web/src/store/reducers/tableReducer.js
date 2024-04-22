import *  as actions from "../actions/clientInteractionsType.js";

const initialState = {
    table: {
      deck: {},
      cards: [],
      chips: 0,
      stake: 0,
    },
    players: [],
    gameStarted:false,
    gameCreated:false,
  };


const tableReducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.GAME_STARTED:
          console.log(action);
          console.log("game started");
          return {
            ...state,
            gameStarted: true,
            gameCreated:true,
            table:action.payload.table,
            players:action.payload.players
          }
        case actions.REFRESH:
          return {
            ...state,
            table:action.payload.game,
            players:action.payload.players,
            game:action.payload.game,
          };
        case actions.SIT:
          console.log("New player sit at the table");
          return {
            ...state,
            table:action.payload.table,
            players:action.payload.game.players
          };
        case actions.SITTED:
          console.log('You sit successfully');
          return {
            ...state,
            gameStarted:true,
            table:action.payload.table,
            players:action.payload.players
          }
        default:
            console.log("Table reducer called");
            return state;
    }
}

export default tableReducer;