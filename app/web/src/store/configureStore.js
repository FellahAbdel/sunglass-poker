import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import logger from "redux-logger";
import rootReducer from "./reducers/rootReducer.js";
import { socketMiddleware } from "./middleware/socketMiddleware"; // Adjust the path accordingly
import io from "socket.io-client";

// Create Socket.io instance
const socket = io("https://mai-projet-integrateur.u-strasbg.fr/vmProjetIntegrateurgrp9-1/socketio/", {
  withCredentials: true,
  path:"/vmProjetIntegrateurgrp9-1/socketio/",
  transports: ["polling"]
});
// Apply middleware when creating the Redux store
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger, socketMiddleware(socket)))
);

export default store;
