/**
 * Defines action types for window-related actions.
 */
export const SET_SELECTED_ITEM = "SET_SELECTED_ITEM";
export const SET_REDIRECT_AFTER_SUCCESS = "SET_REDIRECT_AFTER_SUCCESS";
export const SET_ALERT_PARAMS = "SET_ALERT_PARAMS";
export const TOGGLE_WINDOW_OPEN = "TOGGLE_WINDOW_OPEN";
export const SET_WINDOW_TYPE = "SET_WINDOW_TYPE";
export const TOGGLE_CONNECTION_WINDOW_OPEN = "TOGGLE_CONNECTION_WINDOW_OPEN";
export const SET_SUCCESS_MESSAGE = "SET_SUCCESS_MESSAGE";
export const SHOW_GAME_TABLE = "SHOW_GAME_TABLE";
export const HIDE_GAME_TABLE = "HIDE_GAME_TABLE";
export const SET_EMAIL = "SET_EMAIL";

// Définition de l'état initial basé sur le code existant
const functionMapper = {
  defaultConfirm: () => console.log("Confirmed"),
  defaultCancel: () => console.log("Cancelled"),
};

const getInitialWindowType = () => {
  const storedWindowType = sessionStorage.getItem("windowType");
  if (storedWindowType === "alert") {
    return "";
  }
  if (storedWindowType !== null) {
    return storedWindowType;
  } else {
    return "";
  }
};

const getIsWindowOpen = () => {
  const storedWindowType = sessionStorage.getItem("windowType");
  if (storedWindowType === "alert") {
    return false;
  } else {
    return storedWindowType;
  }
};

const loadInitialState = () => {
  return {
    selectedItem: sessionStorage.getItem("selectedItem") || null,
    redirectAfterSuccess: sessionStorage.getItem("redirectAfterSuccess") || "",
    alertParams: {
      message: sessionStorage.getItem("alertMessage") || "",
      onConfirm:
        functionMapper[sessionStorage.getItem("alertOnConfirm")] ||
        functionMapper.defaultConfirm,
      onCancel:
        functionMapper[sessionStorage.getItem("alertOnCancel")] ||
        functionMapper.defaultCancel,
    },
    isWindowOpen: getIsWindowOpen(),
    windowType: getInitialWindowType(),
    connectionWindowOpen:
      sessionStorage.getItem("connectionWindowOpen") === "true",
    successMessage: sessionStorage.getItem("successMessage") || "",
    isGameTableVisible: sessionStorage.getItem("isGameTableVisible") === "true",
    email: sessionStorage.getItem("email") || null,
  };
};

export const initialState = loadInitialState();

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
      sessionStorage.setItem("alertMessage", action.payload.message);
      sessionStorage.setItem(
        "alertOnConfirm",
        action.payload.onConfirm.toString()
      );
      sessionStorage.setItem(
        "alertOnCancel",
        action.payload.onCancel.toString()
      );
      nextState.alertParams = action.payload;
      break;
    case TOGGLE_WINDOW_OPEN:
      const newIsWindowOpen =
        action.payload !== undefined ? action.payload : !state.isWindowOpen;
      sessionStorage.setItem("isWindowOpen", newIsWindowOpen.toString());
      nextState.isWindowOpen = newIsWindowOpen;
      break;
    case SET_WINDOW_TYPE:
      sessionStorage.setItem("windowType", action.payload);
      nextState.windowType = action.payload;
      break;
    case TOGGLE_CONNECTION_WINDOW_OPEN:
      const newConnectionWindowOpen = !state.connectionWindowOpen;
      sessionStorage.setItem(
        "connectionWindowOpen",
        newConnectionWindowOpen.toString()
      );
      nextState.connectionWindowOpen = newConnectionWindowOpen;
      break;
    case SET_SUCCESS_MESSAGE:
      nextState.successMessage = action.payload;
      sessionStorage.setItem("successMessage", action.payload);
      break;
    case SHOW_GAME_TABLE:
      nextState.isGameTableVisible = true;
      sessionStorage.setItem("isGameTableVisible", "true");
      break;
    case HIDE_GAME_TABLE:
      nextState.isGameTableVisible = false;
      sessionStorage.setItem("isGameTableVisible", "false");
      break;
    case SET_EMAIL:
      nextState.email = action.payload;
      sessionStorage.setItem("email", action.payload);
      break;
    default:
      return state;
  }

  return nextState;
}
