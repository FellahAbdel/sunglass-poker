// Définition de l'état initial basé sur le code existant
const confirmFunctions = {
  defaultConfirm: () => console.log("Confirmed"),
};

const cancelFunctions = {
  defaultCancel: () => console.log("Cancelled"),
};

export const initialState = {
  selectedItem: null,
  redirectAfterSuccess: sessionStorage.getItem("redirectAfterSuccess") || "",
  alertParams: {
    message: "",
    onConfirm: () => {},
    onCancel: () => {},
  },
  isWindowOpen: sessionStorage.getItem("isWindowOpen") === "true",
  windowType: sessionStorage.getItem("windowType") || "accueil",
  connectionWindowOpen: false,
  successMessage: sessionStorage.getItem("successMessage") || "",
  isGameTableVisible: sessionStorage.getItem("isGameTableVisible") === "true",
};

// Actions Types
const SET_SELECTED_ITEM = "SET_SELECTED_ITEM";
const SET_REDIRECT_AFTER_SUCCESS = "SET_REDIRECT_AFTER_SUCCESS";
const SET_ALERT_PARAMS = "SET_ALERT_PARAMS";
const TOGGLE_WINDOW_OPEN = "TOGGLE_WINDOW_OPEN";
const SET_WINDOW_TYPE = "SET_WINDOW_TYPE";
const TOGGLE_CONNECTION_WINDOW_OPEN = "TOGGLE_CONNECTION_WINDOW_OPEN";
const SET_SUCCESS_MESSAGE = "SET_SUCCESS_MESSAGE";
const TOGGLE_GAME_TABLE_VISIBLE = "TOGGLE_GAME_TABLE_VISIBLE";

// Reducer
export function windowReducer(state = initialState, action) {
  let nextState = { ...state };

  switch (action.type) {
    case SET_SELECTED_ITEM:
      nextState.selectedItem = action.payload;
      break;
    case SET_REDIRECT_AFTER_SUCCESS:
      nextState.redirectAfterSuccess = action.payload;
      sessionStorage.setItem("redirectAfterSuccess", action.payload);
      break;
    case SET_ALERT_PARAMS:
      nextState.alertParams = action.payload;
      sessionStorage.setItem("alertMessage", action.payload.message);
      sessionStorage.setItem("alertOnConfirm", action.payload.onConfirm);
      sessionStorage.setItem("alertOnCancel", action.payload.onCancel);
      break;
    case "TOGGLE_WINDOW_OPEN":
      nextState.isWindowOpen =
        action.payload !== undefined ? action.payload : !state.isWindowOpen;
      break;
    case SET_WINDOW_TYPE:
      nextState.windowType = action.payload;
      break;
    case TOGGLE_CONNECTION_WINDOW_OPEN:
      nextState.connectionWindowOpen = !state.connectionWindowOpen;
      break;
    case SET_SUCCESS_MESSAGE:
      nextState.successMessage = action.payload;
      sessionStorage.setItem("successMessage", action.payload);
      break;
    case TOGGLE_GAME_TABLE_VISIBLE:
      nextState.isGameTableVisible = !state.isGameTableVisible;
      break;
    default:
      return state;
  }

  // Appliquer la logique conditionnelle pour 'windowType'
  if (!nextState.isGameTableVisible && !nextState.windowType) {
    nextState.windowType = "accueil";
  }

  return nextState;
}
