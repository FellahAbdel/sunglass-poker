import { combineReducers } from "redux";
import userReducer from "./userReducer";
import clientInteractionsReducer from "./clientInteractionsReducer";
import tableReducer from "./tableReducer";

const rootReducer = combineReducers({
  user: userReducer,
  game: tableReducer,
  action: clientInteractionsReducer,
});

export default rootReducer;
// Path: app/web/src/store/reducers/userReducer.js
