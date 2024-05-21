const defaultState = {
  // Initial state of game
  player: false, //ajouter ici lors de l'ajout a la table
};

const gameTableReducer = (state = defaultState, action) => {
  const { payload, type } = action;
  console.log(state,action);

  switch (type) {
    // case "SIT":
    //   return {
    //     ...defaultState,
    //     player: { ...player, payload },
    //   };
    case "STAND_UP":
      const updatedPlayers = player.filter(
        (player) => player.id !== payload.id
      );
      return {
        ...defaultState,
        players: updatedPlayers,
      };
    default:
      return state;
  }
};

module.exports =  gameTableReducer;
