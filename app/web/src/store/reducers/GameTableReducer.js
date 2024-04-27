export const SET_MASTER = "SET_MASTER";
export const SET_WAITING_MESSAGE_VISIBLE = "SET_WAITING_MESSAGE_VISIBLE";

const initialState = {
  isMaster: false,
  showWaitingMessage: false,
};

export function gameTableReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MASTER:
      return { ...state, isMaster: action.payload };
    case SET_WAITING_MESSAGE_VISIBLE:
      return { ...state, showWaitingMessage: action.payload };
    default:
      return state;
  }
}