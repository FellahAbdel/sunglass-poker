const actions = require("./actionTypes.js");

module.exports.startGame = () => ({
  type: actions.START_GAME,
});

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

module.exports.endRound = () => ({
  type: actions.END_ROUND,
});

module.exports.resetGame = () => ({
  type: actions.RESET_GAME,
});

// Rooms control

module.exports.sit = () => ({
  type: actions.SIT,
})

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

