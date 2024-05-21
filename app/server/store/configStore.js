const { createStore } = require("redux");
const rootReducer = require("./reducers/rootReducer.js");


// Apply middleware when creating the Redux store
const store = createStore(
  rootReducer,
);

module.exports = store;
