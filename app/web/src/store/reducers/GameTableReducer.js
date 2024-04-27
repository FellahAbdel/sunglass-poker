export const SET_MASTER = "SET_MASTER";
export const SET_WAITING_MESSAGE_VISIBLE = "SET_WAITING_MESSAGE_VISIBLE";
export const SET_FOCUS = "SET_FOCUS";

const initialState = {
  isMaster: false,
  showWaitingMessage: false,
  isFocus: null,
};

export function gameTableReducer(state, action) {
  switch (action.type) {
    case SET_MASTER:
      return { ...state, isMaster: action.payload };
    case SET_WAITING_MESSAGE_VISIBLE:
      return { ...state, showWaitingMessage: action.payload };
    case SET_FOCUS:
      return { ...state, isFocus: action.payload };
    default:
      return state;
  }
}
