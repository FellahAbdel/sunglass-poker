import * as actions from "./clientInteractionsType";

/**
 * 
 * @param {id: id of the room to join} id 
 * 
 */
export const joinRoom = (id) => ({
    type:actions.JOIN_ROOM,
    payload:{id:id}
})


/**
 * Automatically find the room of the player that asked to leave.
 */
export const leaveRoom = () => ({
    type:actions.LEAVE_ROOM
});


export const startGame = () => ({
    type:actions.START_GAME
});


/**
 * Should include the possible argument to create a game.
 * Rules, Gamedesc, Name etc... need to be added to the game Object too.
 * Should already be in the bdd with GameDesc table.
 */
export const createGame = () => ({
    type:actions.CREATE_GAME
});

export const fold = () => ({
    type:actions.FOLD
});

export const bet = (amount) => ({
    type:actions.BET,
    payload:{amount:amount}
})


/**
 *  payload: {
 *     table: all table information,
 *     players: list of players
 *  }
 */
export const sitted = (table,players) =>({
    type:actions.SITTED,
    payload: {table:table, players:players}
});

/**
 * 
 * @param {room: state.game.rooms[id] <- object} room Should be filtered after. 
 * @returns 
 */
export const gameLobby = (room) => ({
    type:actions.GAME_LOBBY,
    payload: room
})


export const loggedIn = (user) => ({
    type:actions.LOGGED_IN,
    payload: user
});