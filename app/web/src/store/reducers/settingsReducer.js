export const initialState = {
  theme: localStorage.getItem("theme") || "light",
  sound: localStorage.getItem("sound") === "true",
  language: localStorage.getItem("language") || "en",
  animation: localStorage.getItem("animation") === "true" || false,
};

export function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case "TOGGLE_THEME":
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      };

    case "TOGGLE_SOUND":
      return {
        ...state,
        sound: !state.sound,
      };

      case 'SET_VOLUME':
        return { ...state, volume: action.payload };

    case "TOGGLE_ANIMATION":
      return {
        ...state,
        animation: !state.animation,
      };

    case "CHANGE_LANGUAGE":
      return {
        ...state,
        language: action.payload,
      };

    default:
      return state;
  }
}
