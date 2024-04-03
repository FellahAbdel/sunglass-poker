import * as actions from "./clientInteractionsType";

export const startGame = () => ({
    type:actions.START_GAME
});
export const gameStarted = () => ({
    type:actions.GAME_STARTED
});

export const fold = () => ({
    type:actions.FOLD
});