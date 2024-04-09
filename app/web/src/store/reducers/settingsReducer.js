export const initialState = {
    theme: sessionStorage.getItem('theme') || "dark",
    mute: sessionStorage.getItem('mute') === 'true',
    language: sessionStorage.getItem('language') || 'en',
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
  