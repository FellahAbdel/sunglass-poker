import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import logger from "redux-logger";
import rootReducer from "./reducers/rootReducer.js";
import { socketMiddleware } from "./middleware/socketMiddleware";

// Create Socket.io instance
// const socket = io(target, {
//   withCredentials: true,
//   path: target === vm ? "/vmProjetIntegrateurgrp9-1/socketio/" : "",
//   transports: ["polling"],
// });
// Apply middleware when creating the Redux store
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger, socketMiddleware(undefined)))
);

export default store;
