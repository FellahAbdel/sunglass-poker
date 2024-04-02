// Redux middleware
const actions = require("../actions/clientInteractionsType.js");

export const socketMiddleware = (socket) => (store) => (next) => (action) => {
    switch(action.type){
        case actions.START_GAME:
            console.log("Emitting startGame event from socketMiddleware");
            socket.emit("startGame");
            break;
        default:
            socket.emit("startGame");
    }
  return next(action);
};
