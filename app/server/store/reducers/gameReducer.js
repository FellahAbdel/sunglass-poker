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
  var room;
  var playerId;
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

    case actions.LEAVE_ROOM:
      console.log(actions.payload);
      room = action.payload.tableId;
      playerId = action.payload.player;
      if (state.rooms.hasOwnProperty(room)) {
          const updatedPlayers = state.rooms[room].players.filter(player => player.id !== playerId);
          if (updatedPlayers.length !== state.rooms[room].players.length) {
              console.log("Player:", playerId, " removed from room:", room);
              return {
                  ...state,
                  answer:{status:true,mes:"OUI",payload:{restant:updatedPlayers.length}},
                  rooms: {
                      ...state.rooms,
                      [room]: {
                          ...state.rooms[action.payload.room],
                          players: updatedPlayers
                      }
                  }
              };
          } else {
              console.error("Player", actions.payload.player, "is not in the room");
              return state;
          }
      } else {
          console.error("Not a room, can't kick player", room, "  -:> ", playerId);
          return state;
      }

    case actions.CHANGE_MASTER:
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
      // --------------

      //Test to see if player id is given
      if(action.payload.player === undefined){
        state.answer = {status:false,mes:'No player given ?'};
        failed=true;
      }
      playerId = action.payload.player.id;
      pseudo = action.payload.player.pseudo;
      if(playerId === undefined || pseudo === undefined){
        failed = true;
        state.answer = {status:false, mes :'player empty'};
      }
      // --------------

      room = state.rooms[action.payload.tableId];
      
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
      // --------------


      // We can add the player in the game
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
