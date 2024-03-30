import * as actions from "./actionTypes.js";

export const startGame = () => ({
  type: actions.START_GAME,
});

export const dealCards = () => ({
  type: actions.DEAL_CARDS,
});

export const bet = (amount) => ({
  type: actions.BET,
  payload: amount,
});

export const fold = () => ({
  type: actions.FOLD,
});

export const check = () => ({
  type: actions.CHECK,
});

export const call = () => ({
  type: actions.CALL,
});

export const raise = (amount) => ({
  type: actions.RAISE,
  payload: amount,
});

export const endRound = () => ({
  type: actions.END_ROUND,
});

export const resetGame = () => ({
  type: actions.RESET_GAME,
});

// Actions creators for user authentication
export const login = (user) => ({
  type: actions.LOGIN,
  payload: user,
});

export const logout = () => ({
  type: actions.LOGOUT,
});

export const updateUserData = (data) => ({
  type: actions.UPDATE_USER_DATA,
  payload: data,
});

export const playerJoined = (playerData) => ({
  type: actions.PLAYER_JOINED,
  payload: playerData,
});
