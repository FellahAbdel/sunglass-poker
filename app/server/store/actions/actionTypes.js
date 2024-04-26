module.exports.START_GAME = "START_GAME";
module.exports.DEAL_CARDS = "DEAL_CARDS";
module.exports.BET = "BET";
module.exports.FOLD = "FOLD";
module.exports.CHECK = "CHECK";
module.exports.CALL = "CALL";
module.exports.RAISE = "RAISE";
module.exports.END_ROUND = "END_ROUND";
module.exports.RESET_GAME = "RESET_GAME";


module.exports.LEAVE_ROOM="LEAVE_ROOM";
module.exports.LEFT_ROOM="LEFT_ROOM";
module.exports.DELETE_ROOM="DELETE_ROOM";

// Actions for user authentication
module.exports.LOGIN = "LOGIN";
module.exports.LOGOUT = "LOGOUT";
module.exports.UPDATE_USER_DATA = "UPDATE_USER_DATA";


module.exports.CREATE_GAME= "CREATE_GAME";

module.exports.GAME_LOBBY = "GAME_LOBBY";
module.exports.GAME_STARTED = "GAME_STARTED";

module.exports.FOLD = "FOLD";


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


//####################################

// reducer controls

module.exports.CLEARANSWER = "CLEAR_ANSWER";

module.exports.PLAYER_GAME_ACTION = "PLAYER_GAME_ACTION";

module.exports.PLAYER_GAME_ACTION_LIST = [
    module.exports.FOLD,
    module.exports.RAISE,
    module.exports.CHECK,
];