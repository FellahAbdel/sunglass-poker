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
  };


const tableReducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.GAME_STARTED:
          console.log(action);
          console.log("game started");
          return {
            ...state,
            gameStarted: true,
            table:action.payload.rooms[10].table,
            players:action.payload.rooms[10].players
          }
        case actions.REFRESH:
          return {
            ...state,
            table:action.payload.game.rooms[10].table,
            players:action.payload.game.rooms[10].game.players
          };
        case actions.SIT:
          console.log("New player sit at the table");
          return {
            ...state,
            table:action.payload.rooms[10].table,
            players:action.payload.rooms[10].game.players
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