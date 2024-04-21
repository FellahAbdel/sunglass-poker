// Définition de l'état initial basé sur le code existant
const functionMapper = {
  defaultConfirm: () => console.log("Confirmed"),
  defaultCancel: () => console.log("Cancelled"),
};

const getInitialWindowType = () => {
  const storedWindowType = sessionStorage.getItem("windowType");
  const isGameTableVisible =
    sessionStorage.getItem("isGameTableVisible") === "true";

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
  }
  else{
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
  };
};

export const initialState = loadInitialState();

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
  console.log("Action Received:", action);
  console.log("Current State before update:", state);

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
      sessionStorage.setItem("alertOnConfirm", action.payload.onConfirm);
      sessionStorage.setItem("alertOnCancel", action.payload.onCancel);
      nextState.alertParams = action.payload;
      break;
    case TOGGLE_WINDOW_OPEN:
      sessionStorage.setItem(
        "isWindowOpen",
        (action.payload !== undefined
          ? action.payload
          : !state.isWindowOpen
        ).toString()
      );
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
      console.log("Unhandled action type in windowReducer:", action.type);
      return state;
  }

  console.log("New State after update:", nextState);
  return nextState;
}
