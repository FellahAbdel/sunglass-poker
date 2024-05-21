import * as actions from "./clientInteractionsType";

/**
 * Creates an action to join a room.
 *
 * @param {string} id - The ID of the room to join.
 * @returns {Object} The action object with type and payload.
 */
export const joinRoom = (id) => ({
  type: actions.JOIN_ROOM,
  payload: { id: id },
});

/**
 * Creates an action to leave the current room.
 *
 * @returns {Object} The action object with type.
 */
export const leaveRoom = () => ({
  type: actions.LEAVE_ROOM,
});

/**
 * Creates an action to start the game.
 *
 * @param {string} userId - The ID of the user starting the game.
 * @returns {Object} The action object with type and payload.
 */
export const startGame = (userId) => {
  console.log("UserId récupéré par startGame :", userId);
  return {
    type: actions.START_GAME,
    payload: { userId: userId },
  };
};

export const autoRestartToggle = () => {
  return {
    type:actions.AUTO_RESTART_TOGGLE
  };
};

/**
 * Creates an action to create a game.
 * Includes possible arguments for game creation such as rules, game description, name, etc.
 *
 * @returns {Object} The action object with type.
 */
export const createGame = () => ({
  type: actions.CREATE_GAME,
});

/**
 * Creates an action to create a game with a specific room ID.
 *
 * @param {string} gameRoomId - The ID of the game room.
 * @returns {Object} The action object with type and payload.
 */
export const createGameV2 = (gameRoomId) => ({
  type: actions.CREATE_GAME_V2,
  payload: { gameRoomId: gameRoomId },
});

/**
 * Creates an action to fold.
 *
 * @returns {Object} The action object with type.
 */
export const fold = () => ({
  type: actions.FOLD,
});

/**
 * Creates an action to activate a bonus.
 *
 * @returns {Object} The action object with type.
 */
export const activateBonus = () => ({
  type: actions.ACTIVATE_BONUS,
});

/**
 * Creates an action to show a card.
 *
 * @param {number} cardIndex - The index of the card to show.
 * @returns {Object} The action object with type and payload.
 */
export const showCard = (cardIndex) => ({
  type: actions.SHOW_CARD,
  payload: { cardIndex },
});

/**
 * Creates an action to hide a card.
 *
 * @param {number} cardIndex - The index of the card to hide.
 * @returns {Object} The action object with type and payload.
 */
export const hideCard = (cardIndex) => ({
  type: actions.HIDE_CARD,
  payload: { cardIndex },
});

/**
 * Creates an action to place a bet.
 *
 * @param {number} amount - The amount to bet.
 * @returns {Object} The action object with type and payload.
 */
export const bet = (amount) => ({
  type: actions.BET,
  payload: { amount: amount },
});

/**
 * Creates an action to check.
 *
 * @returns {Object} The action object with type.
 */
export const check = () => ({
  type: actions.CHECK,
});


 /**
 * Creates an action indicating players are sitted at a table.
 *
 * @param {Object} table - All table information.
 * @param {Array} players - List of players.
 * @returns {Object} The action object with type and payload.
 */
export const sitted = (table, players) => ({
  type: actions.SITTED,
  payload: { table: table, players: players },
});

/**
 * Creates an action for the game lobby.
 *
 * @param {Object} room - The room object (state.game.rooms[id]) to be filtered after.
 * @returns {Object} The action object with type and payload.
 */
export const gameLobby = (room) => ({
  type: actions.GAME_LOBBY,
  payload: room,
});

/**
 * Creates an action indicating a user has logged in.
 *
 * @param {Object} user - The user object.
 * @returns {Object} The action object with type and payload.
 */
export const loggedIn = (user) => ({
  type: actions.LOGGED_IN,
  payload: user,
});

/**
 * Creates an action with an empty payload.
 *
 * @returns {Object} The action object with type.
 */
export const emptyPayload = () => ({
  type: actions.EMPTY_PAYLOAD,
});
