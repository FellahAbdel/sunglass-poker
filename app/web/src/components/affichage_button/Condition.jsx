// redux/selectors.js
export const selectIsUserLoggedIn = (state) => state.user.isLoggedIn;

// redux/reducers/userReducer.js
const initialState = {
  isLoggedIn: false,
  // ... autres propriétés de l'utilisateur
};

const userReducer = (state = initialState, action) => {
  // Réductions pour gérer l'état de connexion
  return state;
};

export default userReducer;