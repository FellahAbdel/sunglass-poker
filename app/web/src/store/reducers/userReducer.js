export const initialState = {
  isLogged: false,
  user: null,
};

export function userReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    
    case "LOGIN":
      return {
        ...state,
        isLogged: true,
        user: payload,
      };

    case "LOGOUT":
      return {
        ...state,
        isLogged: false,
        user: null,
      };

    case "UPDATE_USER_DATA":
      return {
        ...state,
        user: {
          ...state.user,
          ...payload,
        },
      };

    default:
      return state;
  }
}