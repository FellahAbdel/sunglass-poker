import * as actions from "./clientInteractionsType";

export const joinRoom = (id) => ({
    type:actions.JOIN_ROOM,
    payload:{id:id}
})

export const startGame = () => ({
    type:actions.START_GAME
});

export const fold = () => ({
    type:actions.FOLD
});


