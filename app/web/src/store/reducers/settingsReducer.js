export const initialState = {
  theme: localStorage.getItem("theme") || "light",
  sound: localStorage.getItem("sound") === "true" || true,
  language: localStorage.getItem("language") || "en",
  animation: localStorage.getItem("animation") === "true" || true,
  volume: localStorage.getItem("volume")
    ? parseFloat(localStorage.getItem("volume"))
    : 0.5,
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

    case "SET_VOLUME":
      return {
        ...state,
        volume: action.payload,
      };

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
