const { combineReducers } = require("redux");
const gameReducer = require("./gameReducer");
const tablesReducer = require("./tablesReducer");

const rootReducer = combineReducers({
  game: gameReducer,
  //   user: userReducer,
  // table: tablesReducer,
});

module.exports = rootReducer;
// Path: app/web/src/store/reducers/userReducer.js
