// Redux middleware
import comm from "../../services/socket.js";


const actions = require("../actions/clientInteractionsType.js");

export const socketMiddleware = (socket) => (store) => (next) => (action) => {
    console.log('Middleware scoket');
    switch(action.type){
        case actions.START_GAME:
            console.log("Emitting startGame event from socketMiddleware");
            comm.createGame();
            // action = comm.reponseDispatch();
            break;
        case actions.JOIN_ROOM:
            console.log('Player want to join a room, emit');
            comm.joinRoom(action.payload.id);
            break;
        case actions.FOLD:
            comm.dispatch({action:action});
            break;
        default:
            break;
    }
  return next(action);
};
