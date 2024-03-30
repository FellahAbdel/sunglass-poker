// This file contains the reducer for game-related actions
import * as actions from "../actions/actionTypes.js";
import Deck from "../../shared/Deck.js";
import Player from "../../shared/Player.js";

const initialState = {
  table: {
    deck: new Deck(),
    cards: [],
    chips: 0,
    stake: 0,
  },
  players: [
    new Player(0, "diallo"),
    ...Array.from(
      { length: 9 },
      (_, index) => new Player(index + 1, "Player" + index)
    ),
  ],
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
  switch (action.type) {
    case actions.START_GAME:
      return begin(state);
    // Other game actions can be handled here
    default:
      return state;
  }
};

export default gameReducer;
