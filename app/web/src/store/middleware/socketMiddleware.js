// Redux middleware
import { comm } from "../../services/socket.js";

const actions = require("../actions/clientInteractionsType.js");

export const socketMiddleware = (socket) => (store) => (next) => (action) => {
  // console.log("Middleware scoket");
  switch (action.type) {
    case actions.LOGGED_IN:
      // console.log("LOGGED_IN INIT called (fellah)");
      comm.Init();
      break;

    case actions.CREATE_GAME:
      // console.log("emit createGame (socketMiddleware)");
      // once the server finish creating the game,
      // the client store will receive a SITTED event.
      comm.createGame();
      break;
    case actions.CREATE_GAME_V2:
      comm.createGameV2(action.payload.gameRoomId);
      break;
    case actions.START_GAME:
      // console.log(
      //   "Emitting startGame event from socketMiddleware",
      //   action.payload.userId
      // );
      comm.startGame(action.payload.userId);
      break;
    case actions.JOIN_ROOM:
      // console.log("Player want to join a room, emit");
      comm.joinRoom(action.payload.id);
      break;
    case actions.FOLD:
      comm.dispatch({ action: action });
      break;
    case actions.BET:
      comm.dispatch({ action: action });
      break;
    case actions.CHECK:
      comm.dispatch({ action: action });
      break;
    case actions.SHOW_CARD:
      comm.dispatch({ action: action });
      break;
    case actions.HIDE_CARD:
      comm.dispatch({ action: action });
      break;
    case actions.ACTIVATE_BONUS:
      comm.dispatch({ action: action });
      break;
    case actions.LEAVE_ROOM:
      // console.log("Player wants to leave the room, emit");
      comm.leaveRoom();
      break;
    case actions.MESSAGE_SEND:
      comm.sendMessage(action.payload);
      break;
    case actions.MESSAGE_RCV:
      return next(action);

    default:
      break;
  }
  return next(action);
};
