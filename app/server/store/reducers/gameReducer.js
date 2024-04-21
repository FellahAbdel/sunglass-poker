// This file contains the reducer for game-related actions
const actions = require("../actions/actionTypes.js");
const Deck = require("../../shared/Deck.js");
const Player = require("../../shared/Player.js");
const game = require("../../shared/Game.js");
const csl = require('../../controller/intelligentLogging.js');
const fileType = "gameReducer";



const initialRoomState = {
  game: new game(),
  players: [], // initial players
};

const initialState = {
  rooms: {},
  answer: false,
};

const begin = (state) => {
  const deck = state.game.deck;
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
  csl.log(fileType,state, action);
  switch (action.type) {
    case actions.CREATE_GAME:
      csl.log(fileType,"CREATE GAME");
      state.rooms[action.payload.id] = initialRoomState;
      return state;
    case actions.START_GAME:
      state.rooms[action.payload.id] = begin(state.rooms[action.payload.id]);
      return state;
    case actions.GAME_STARTED:
      csl.log(fileType,"start", action.type);
      return state;


    case actions.SIT:
      failed =false;

      // test to check if table exist and id given
      if(action.payload.tableId === undefined){
        state.answer = {status:false, mes:'No room given?'};
        failed=true;
      }
      else if(state.rooms[action.payload.tableId] === undefined){
        state.answer = {status:false, mes:'No such room'};
        failed=true;
      }

      //Test to see if player id is given
      if(action.payload.player === undefined){
        state.answer = {status:false,mes:'No player given ?'};
        failed=true;
      }
      const playerId = action.payload.player.id;
      const pseudo = action.payload.player.pseudo;
      if(playerId === undefined || pseudo === undefined){
        failed = true;
        state.answer = {status:false, mes :'player empty'};
      }
      csl.log(fileType,'output for sit', action);
      const room = state.rooms[action.payload.tableId];
      csl.log(fileType, 'wtf', playerId,'  ' ,pseudo);
      // Test if player is already in the game
      found = false;
      csl.log(fileType,'(check for room length)',room.players, room.players.length);
      if(room.players.length > 0)
      room.players.forEach((p) => {
        // found is the status of the new comparison,
        // or if it's already true, then stay true
        found=((p.getPlayerId()==playerId) || (found));
      });
      if(found){
        state.answer = {status:false, mes:'Player already inside the room'};
        failed =true; 
      }

      csl.log(fileType,"tableid: ", action.payload.tableId);
      csl.log(fileType,"state.game : ", state);
      csl.log(fileType,state.rooms[action.payload.tableId]);
      if(!failed){
        state.answer = {status:true,mes:'Successfully join room', payload:{id:action.payload.tableId}};
        room.players = [
          ...room.players,
          new Player(playerId,pseudo),
        ];
        csl.log(fileType,"Added player successfully");
      }else{
        csl.error(fileType, "Failed to sit player at the table.");
      }
      return state;
    case actions.CLEARANSWER:
      state.answer = false;
      return state;
    // Other game actions can be handled here
    default:
      csl.log(fileType,"default", action.type);
      return state;
  }
};

module.exports = gameReducer;
