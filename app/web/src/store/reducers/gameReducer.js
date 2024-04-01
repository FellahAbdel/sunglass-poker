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
  player: new Player(0, "diallo"),
  opponents: Array.from(
    { length: 8 },
    (_, index) => new Player(index + 1, "Player" + index)
  ),
};

const begin = (state) => {
  const deck = state.table.deck;
  deck.initCards();
  deck.shuffle();

  const player = state.player;
  player.clearHand();
  player.setCards(deck.deal(2));

  const opponents = state.opponents.map((opponent) => {
    opponent.clearHand();
    opponent.setCards(deck.deal(2));
    return opponent;
  });

  return {
    ...state,
    table: {
      ...state.table,
      deck,
      stake: 0,
    },
    player,
    opponents,
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
