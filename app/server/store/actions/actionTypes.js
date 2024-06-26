module.exports.START_GAME = "START_GAME";
module.exports.DEAL_CARDS = "DEAL_CARDS";
module.exports.BET = "BET";
module.exports.FOLD = "FOLD";
module.exports.CHECK = "CHECK";
module.exports.CALL = "CALL";
module.exports.RAISE = "RAISE";
module.exports.END_ROUND = "END_ROUND";
module.exports.RESET_GAME = "RESET_GAME";
module.exports.SHOW_CARD = "SHOW_CARD";
module.exports.HIDE_CARD = "HIDE_CARD";
module.exports.ACTIVATE_BONUS = "ACTIVATE_BONUS";

module.exports.AUTO_RESTART_TOGGLE = "AUTO_RESTART_TOGGLE";

module.exports.LEAVE_ROOM = "LEAVE_ROOM";
module.exports.LEFT_ROOM = "LEFT_ROOM";
module.exports.DELETE_ROOM = "DELETE_ROOM";

// Actions for user authentication
module.exports.LOGIN = "LOGIN";
module.exports.LOGOUT = "LOGOUT";
module.exports.UPDATE_USER_DATA = "UPDATE_USER_DATA";

module.exports.CREATE_GAME = "CREATE_GAME";

module.exports.GAME_LOBBY = "GAME_LOBBY";
module.exports.GAME_STARTED = "GAME_STARTED";


module.exports.SIT = "SIT";

/**
 * _______________________________________
 *
 *  Actions to send informations to player
 *
 * _______________________________________
 */
module.exports.REFRESH = "REFRESH";
module.exports.SITTED = "SITTED";
module.exports.KICKED = "KICKED";

//####################################

// reducer controls

module.exports.CLEARANSWER = "CLEAR_ANSWER";

module.exports.USER_GENERIC_ACTION = "USER_GENERIC_ACTION";
module.exports.PLAYER_GAME_ACTION = "PLAYER_GAME_ACTION";
module.exports.PLAYER_GAME_ASYNC = "PLAYER_GAME_ASYNC";

module.exports.PLAYER_PLAYED = "PLAYER_PLAYED";

module.exports.PLAYER_GAME_ACTION_LIST = [
  module.exports.FOLD,
  module.exports.BET,,
  module.exports.CHECK,
  module.exports.RAISE,
  module.exports.ACTIVATE_BONUS,
];

module.exports.PLAYER_GAME_ASYNC_LIST = [
  module.exports.SHOW_CARD,
  module.exports.HIDE_CARD,
  module.exports.AUTO_RESTART_TOGGLE
];


module.exports.SET_DAO = "SET_DAO";
