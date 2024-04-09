import *  as actions from "../actions/clientInteractionsType.js";

const initialState = {
    gameClass: {},
    players: [{}],
    isGameStarted: false,
    controlsMode: "preGameClient",
  };


const tableReducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.GAME_STARTED:
        //   console.log(action);
          console.log("game started (client/store)");
          return {
            ...state,
            gameClass :action.payload.gameClass,
            players:action.payload.players,
            isGameStarted: action.payload.isGameStarted,
            controlsMode: action.payload.controlsMode,
          }
        case actions.REFRESH:
          return {
            ...state,
            ...action.payload,
          };
        case actions.SIT:
          console.log("New player sit at the table");
          return {
            ...state,
            table:action.payload.table,
            players:action.payload.players
          };
        default:
            console.log("Table reducer called");
            return state;
    }
}

export default tableReducer;