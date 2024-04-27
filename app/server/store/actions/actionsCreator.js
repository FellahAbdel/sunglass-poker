const actions = require("./actionTypes.js");

module.exports.gameLobby = (idGame) => ({
  type: actions.GAME_LOBBY,
  payload: { id: idGame },
});

module.exports.startGame = (idGame, userId) => {
  console.log("Action START_GAME created with payload:", {
    id: idGame,
    userId: userId,
  });
  return {
    type: actions.START_GAME,
    payload: { id: idGame, userId: userId },
  };
};

module.exports.dealCards = () => ({
  type: actions.DEAL_CARDS,
});

module.exports.bet = (amount) => ({
  type: actions.BET,
  payload: amount,
});

module.exports.fold = () => ({
  type: actions.FOLD,
});

module.exports.check = () => ({
  type: actions.CHECK,
});

module.exports.call = () => ({
  type: actions.CALL,
});

module.exports.raise = (amount) => ({
  type: actions.RAISE,
  payload: amount,
});

module.exports.showCard = (cardIndex) => ({
  type: actions.SHOW_CARD,
  payload: { cardIndex },
});

module.exports.hideCard = (cardIndex) => ({
  type: actions.HIDE_CARD,
  payload: { cardIndex },
});

module.exports.endRound = () => ({
  type: actions.END_ROUND,
});

module.exports.resetGame = () => ({
  type: actions.RESET_GAME,
});

// Rooms control

/**
 *
 * @param {table: id} table
 * @param {{id: id, pseudo:STRING}} player
 * @returns
 */
module.exports.sit = (table, player) => ({
  type: actions.SIT,
  payload: { tableId: table, player: player },
});

module.exports.leaveRoom = (table, player) => ({
  type: actions.LEAVE_ROOM,
  payload: { tableId: table, player: player },
});

module.exports.leftRoom = () => ({
  type: actions.LEFT_ROOM,
});

module.exports.deleteRoom = (room) => ({
  type: actions.DELETE_ROOM,
  payload: { tableId: room },
});

// Actions creators for user authentication
module.exports.login = (user) => ({
  type: actions.LOGIN,
  payload: user,
});

module.exports.logout = () => ({
  type: actions.LOGOUT,
});

module.exports.updateUserData = (data) => ({
  type: actions.UPDATE_USER_DATA,
  payload: data,
});

module.exports.createGame = (id, player = false) => ({
  type: actions.CREATE_GAME,
  payload: { id: id, player: player },
});

module.exports.clearAnswer = () => ({
  type: actions.CLEARANSWER,
});

/**
 * _______________________________________
 *
 *  Actions to send informations to player
 *
 * _______________________________________
 */

module.exports.sitted = (table, players) => ({
  type: actions.SITTED,
  payload: { table: table, players: players },
});
