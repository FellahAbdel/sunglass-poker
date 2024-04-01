const defaultState = {
  // Initial state of game
  player: [], //ajouter ici lors de l'ajout a la table
};

const gameTableReducer = (state = defaultState, action) => {
  const { payload, type } = action;

  switch (type) {
    case "SIT":
      return {
        ...state,
        player: { ...state.player, payload },
      };
      case "STAND_UP":
        return {
          ...state,
          players: state.player.filter(player => player.id !== payload.id), // Retirer le joueur de la table
      };
    default:
      return state;
  }
};

export default gameTableReducer;
