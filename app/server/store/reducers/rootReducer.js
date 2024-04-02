import { combineReducers } from "redux";
import gameReducer from "./gameReducer";
import tablesReducer from "./tablesReducer";

const rootReducer = combineReducers({
  game: gameReducer,
  //   user: userReducer,
  table: tablesReducer,
});

export default rootReducer;
// Path: app/web/src/store/reducers/userReducer.js
