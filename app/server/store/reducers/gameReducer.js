// This file contains the reducer for game-related actions
const actions =  require("../actions/actionTypes.js");
const Deck = require("../../shared/Deck.js");
const Player = require("../../shared/Player.js");
// const game = require("../../shared/Game.js");


const initialRoomState = {
  game: false,//new game(),
  table: {
    deck: new Deck(),
    cards: [],
    chips: 0,
    stake: 0,
  },
  players: [
    new Player(0, "diallo"),
    ...Array.from(
      { length: 4 },
      (_, index) => new Player(index + 1, "Player" + index)
    ),
  ],
};

const initialState = {
  rooms : {},
};

const begin = (state) => {
  const deck = state.table.deck;
  deck.initCards();
  deck.shuffle();

  const updatedPlayers = state.players.map((player) => {
    player.clearHand();
    player.setCards(deck.deal(2));
    player.setStatus("Playing"); // Set status to "Playing" during gameplay
    return player;
  });

  return {
    ...state,
    table: {
      ...state.table,
      deck,
      stake: 0,
    },
    players: updatedPlayers,
    controlsMode: "roundOne",
  };
};

const gameReducer = (state = initialState, action) => {
  console.log(state,action);
  switch (action.type) {
    case actions.CREATE_GAME:
      console.log('CREATE GAME');
      state.rooms[action.payload.id] = begin(initialRoomState);
      if(!action.player)
        state.rooms[action.payload.id].players = [...state.rooms[action.payload.id].players, action.payload.player];
      return state;
    case actions.GAME_STARTED:
      console.log('start',action.type);
      return state;
    case actions.SIT:
      console.log('tableid: ',action.payload.idTable);
      console.log('state.game : ',state);
      console.log(state.rooms[action.payload.idTable]);
      state.rooms[action.payload.idTable].players = [...state.rooms[action.payload.idTable].players, new Player(action.payload.playerId,action.payload.playerId)];
      return state;
    // Other game actions can be handled here
    default:
      console.log('default',action.type);
      return state;
  }
};

module.exports =  gameReducer;
