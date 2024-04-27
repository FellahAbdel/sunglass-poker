import * as actions from "../actions/clientInteractionsType.js";


// Fonction utilitaire pour sauvegarder l'état dans sessionStorage
const saveStateToSessionStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('tableState', serializedState);
  } catch (err) {
    console.error('Error saving state to sessionStorage:', err);
  }
};

// Fonction utilitaire pour charger l'état depuis sessionStorage
const loadStateFromSessionStorage = () => {
  try {
    const serializedState = sessionStorage.getItem('tableState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading state from sessionStorage:', err);
    return undefined;
  }
};

const initialState = loadStateFromSessionStorage() || {
  players: [],
  gameStarted: false,
  gameCreated: false,
};

const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GAME_STARTED:
      console.log(action);
      console.log("game started");
      const newStateGameStarted = {
        ...state,
        gameStarted: true,
        gameCreated: true,
        players: action.payload.players,
      };
      saveStateToSessionStorage(newStateGameStarted);
      return newStateGameStarted;
    case actions.REFRESH:
      console.log("Refresh page (tableReducer-fellah) ");
      const newStateRefresh = {
        ...state,
        players: action.payload.players || state.players,
        game: action.payload.game || state.game,
      };
      saveStateToSessionStorage(newStateRefresh);
      return newStateRefresh;
    case actions.SIT:
      console.log("New player sit at the table");
      const newStateSit = {
        ...state,
        players: action.payload.game.players,
      };
      saveStateToSessionStorage(newStateSit);
      return newStateSit;
    case actions.SITTED:
      console.log("You sit successfully");
      const newStateSitted = {
        ...state,
        gameCreated: true,
        gameStarted: true,
        players: action.payload.players,
      };
      saveStateToSessionStorage(newStateSitted);
      return newStateSitted;
    case actions.LEFT_ROOM:
      // Effacer l'état sauvegardé lorsque l'utilisateur quitte la room
      sessionStorage.removeItem('tableState');
      return {
        ...initialState
      };
    default:
      console.log("Table reducer called");
      return state;
  }
};

export default tableReducer;