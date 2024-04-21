import * as actions from "./clientInteractionsType";

export const joinRoom = (id) => ({
    type:actions.JOIN_ROOM,
    payload:{id:id}
})


//surement a modifier pour enlever ici, un id peut etre ?
export const leaveRoom = () => ({
    type:actions.LEAVE_ROOM
});


export const startGame = () => ({
    type:actions.START_GAME
});

export const fold = () => ({
    type:actions.FOLD
});



