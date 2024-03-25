import * as actions from "./actionTypes.js";

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
