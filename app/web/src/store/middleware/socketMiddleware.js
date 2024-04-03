// Redux middleware
import comm from "../../services/socket.js";

const actions = require("../actions/clientInteractionsType.js");

export const socketMiddleware = (socket) => (store) => (next) => (action) => {
    switch(action.type){
        case actions.START_GAME:
            console.log("Emitting startGame event from socketMiddleware");
            comm.startGame();
            // action = comm.reponseDispatch();
            break;
        case actions.FOLD:
            comm.dispatch({action:action});
        default:
            break;
    }
  return next(action);
};
