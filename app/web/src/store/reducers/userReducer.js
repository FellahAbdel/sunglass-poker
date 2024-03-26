// userReducer.js
export const initialState = { isLogged: false, user: null };

export function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isLogged: true, user: action.payload };
    case "LOGOUT":
      return { ...state, isLogged: false, user: null };
    case "UPDATE_USER_DATA":
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
