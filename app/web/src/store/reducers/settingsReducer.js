export const initialState = {
    theme: localStorage.getItem('theme') || "dark",
    mute: localStorage.getItem('mute') === 'true',
    language: localStorage.getItem('language') || 'en',
  };

  
export function settingsReducer(state = initialState, action) {
    switch (action.type) {
      case "TOGGLE_THEME":
        return {
          ...state,
          theme: state.theme === "light" ? "dark" : "light",
        };
  
      case "TOGGLE_MUTE":
        return {
          ...state,
          mute: !state.mute,
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
  