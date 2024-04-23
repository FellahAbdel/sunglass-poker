// This file contains the reducer for game-related actions
const actions = require("../actions/actionTypes.js");
const Deck = require("../../shared/Deck.js");
const Player = require("../../shared/Player.js");
const game = require("../../shared/Game.js");
const csl = require('../../controller/intelligentLogging.js');
const { strictEqual } = require("assert");
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
      return {
        ...state,
        rooms:{
          ...state.rooms,
          [action.payload.id]:{...initialRoomState}
        }
      };
    case actions.START_GAME:
      csl.log(fileType,"START GAME FOR ", action.payload.id);
      state.rooms[action.payload.id] = begin(state.rooms[action.payload.id]);
      return {
        ...state,
        answer:{success:true},
        rooms:{
          ...state.rooms,
          [action.payload.id]:{...begin(state.rooms[action.payload.id])}
        }
      };
    case actions.GAME_STARTED:
      csl.log(fileType,"start", action.type);
      return state;

    case actions.LEAVE_ROOM:
      answer = {status: false, mes:"Couldn't remove player from room"};
      console.log(action.payload);
      room = action.payload.tableId;
      playerId = action.payload.player;
      var isMaster = false;
      if (state.rooms.hasOwnProperty(room)) {
          const updatedPlayers = state.rooms[room].players.filter(player => player.getPlayerId() !== playerId);
          // If the player who leave was the master we change the master.
          // But only if there is still at least one player in the room.
          csl.log('leaveRoom', ' srggm : ', state.rooms[room]);
          if(state.rooms[room].game.getMaster() === playerId){
            isMaster = true;
            if(updatedPlayers.length !== 0)
              state.rooms[room].game.setMaster(updatedPlayers[0].getPlayerId());
          }
          if (updatedPlayers.length !== state.rooms[room].players.length) {
              console.log("Player:", playerId, " removed from room:", room);
              return {
                  ...state,
                  answer:{status:true,mes:"Player removed from room",payload:{restant:updatedPlayers.length, wasMaster:isMaster}},
                  rooms: {
                      ...state.rooms,
                      [room]: {
                          ...state.rooms[room],
                          players: updatedPlayers
                      }
                  }
              };
          } else {
              answer.mes = "Player"+ playerId+ "is not in the room";
              return state;
          }
      } else {
          answer.mes = "Not a room, can't kick player"+ room+ "  -:> "+ playerId;
      }
      return {
        ...state,
        answer:answer
      };

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
        if(room.players.length === 0){
          csl.log(fileType, 'Sit player, first player set as Master and first to play.');
          room.game.setMaster(playerId);
          room.game.setFocus(0);
        }
        state.answer = {status:true,mes:'Successfully join room', payload:{id:action.payload.tableId}};
        room.players = [
          ...room.players,
          new Player(playerId,pseudo),
        ];

        csl.log(fileType,"Added player successfully");
      }else{
        csl.error(fileType, "Failed to sit player at the table.");
      }
      return {...state};
    case actions.DELETE_ROOM:
      if(action.payload.tableId !== undefined){
        if(state.rooms.hasOwnProperty(action.payload.tableId)){
          delete state.rooms[action.payload.tableId];
        }
      }
      return {
        ...state
      }
    case actions.CLEARANSWER:
      state.answer = false;
      return {...state};
    // Other game actions can be handled here
    default:
      csl.log(fileType,"default", action.type);
      return state;
  }
};

module.exports = gameReducer;
