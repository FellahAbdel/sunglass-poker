// This file contains the reducer for game-related actions
const actions =  require("../actions/actionTypes.js");
const Deck = require("../../shared/Deck.js");
const Player = require("../../shared/Player.js");
const Game = require("../../shared/Game.js");


const initialState = {
  gameClass: new Game(),
  players: [
    new Player(0, "diallo"),
    ...Array.from(
      { length: 4 },
      (_, index) => new Player(index + 1, "Player" + index)
    ),
  ],
    controlsMode: "preGame", // Can be "preGame", "roundOne", "roundTwo", "roundThree", "endGame
};


const begin = (gameState) => {
  // Initialize players
  const players = gameState.players;
  players.forEach((player) => gameState.gameClass.addPlayer(player));

  // Distribute small and big blinds
  const smallBlindPlayerId = 0; /* logic to determine small blind player id */
  const bigBlindPlayerId = 1; /* logic to determine big blind player id */
  const smallBlindAmount = 10; /* your small blind amount */
  const bigBlindAmount = 20; /* your big blind amount */

  // Designate small and big blinds
  gameState.gameClass.smallBlindPlayerId = smallBlindPlayerId;
  gameState.gameClass.bigBlindPlayerId = bigBlindPlayerId;

  // Distribute blinds
  gameState.gameClass.pokerTable.playerBet(
    gameState.gameClass.players[smallBlindPlayerId],
    smallBlindAmount
  );
  gameState.gameClass.pokerTable.playerBet(
    gameState.gameClass.players[bigBlindPlayerId],
    bigBlindAmount
  );

  // Start the game
  gameState.gameClass.start();

  return {
    ...gameState,
    controlsMode: "roundOne",
  };
};


const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GAME_STARTED:
    //   console.log('start',action.type);
    console.log("Game started (server/store)");
      return begin(state);
    // Other game actions can be handled here
    default:
      console.log('default',action.type);
      return state;
  }
};

module.exports =  gameReducer;
