import * as actionTypes from "../../store/actions/clientInteractionsType";

const initialState = {
  messages: [],
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MESSAGE_SEND:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case actionTypes.MESSAGE_RCV:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    default:
      return state;
  }
};

export default chatReducer;
