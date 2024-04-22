// Redux middleware
import {comm} from "../../services/socket.js";


const actions = require("../actions/clientInteractionsType.js");

export const socketMiddleware = (socket) => (store) => (next) => (action) => {
    console.log('Middleware scoket');
    switch(action.type){
        case actions.LOGIN:
            console.log('LOGIN INIT');
            comm.Init();
            break;
        case actions.CREATE_GAME:
            console.log('emit createGame');
            comm.createGame();
            break;
        case actions.START_GAME:
            console.log("Emitting startGame event from socketMiddleware");
            // action = comm.reponseDispatch();
            break;
        case actions.JOIN_ROOM:
            console.log('Player want to join a room, emit');
            comm.joinRoom(action.payload.id);
            break;
        case actions.FOLD:
            comm.dispatch({action:action});
            break;

        /*Ducoup il manque juste recuperer la liste des joueurs et enlever l id de celui qui parle
        mais jsp ou ce trouve cette liste, normalement j'ai installe tt au bonne endroit et cela devrait marcher */    
        case actions.LEAVE_ROOM:
            console.log('Player wants to leave the room, emit');
            comm.leaveRoom();
            break;

        default:
            break;
    }
  return next(action);
};
