import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import logger from "redux-logger";
import rootReducer from "./reducers/rootReducer.js";
import { socketMiddleware } from "./middleware/socketMiddleware"; // Adjust the path accordingly
import io from "socket.io-client";

let vm = "https://mai-projet-integrateur.u-strasbg.fr/";
let target = "http://localhost:3001";


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
