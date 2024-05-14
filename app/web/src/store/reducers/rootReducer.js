import { combineReducers } from "redux";
import userReducer from "./userReducer";
import clientInteractionsReducer from "./clientInteractionsReducer";
import tableReducer from "./tableReducer";
import chatReducer from "./chatReducer";

const rootReducer = combineReducers({
  user: userReducer,
  game: tableReducer,
  action: clientInteractionsReducer,
  chat: chatReducer,
});

export default rootReducer;
// Path: app/web/src/store/reducers/userReducer.js
