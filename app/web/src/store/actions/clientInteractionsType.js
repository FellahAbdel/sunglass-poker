export const START_GAME = "START_GAME";

export const JOIN_ROOM = "JOIN_ROOM";

export const LEAVE_ROOM = "LEAVE_ROOM";

export const FOLD = "FOLD";

export const SIT = "SIT";

export const REFRESH  = "REFRESH";



/**
 * _______________________________________
 * 
 *  Actions sent by server to inform the player
 * 
 * _______________________________________
 */
// Game has started
export const GAME_STARTED = "GAME_STARTED";
// Successfully sit at a table.
/**
 *  payload: {
 *     table: all table information,
 *     players: list of players
 *  }
 */
export const SITTED = "SITTED";