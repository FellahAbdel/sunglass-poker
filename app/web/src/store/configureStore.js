import { legacy_createStore as createStore } from "redux";
import reducer from "./reducers/gameReducer.js";

const store = createStore(reducer);

export default store;
