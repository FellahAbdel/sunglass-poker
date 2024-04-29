// This file contains the reducer for game-related actions
const actions = require("../actions/actionTypes.js");
const Deck = require("../../shared/Deck.js");
const Player = require("../../shared/Player.js");
const game = require("../../shared/Game.js");
const csl = require("../../controller/intelligentLogging.js");
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
  const playersInRoom = state.game.players;

  // Start the game
  var posBigBlind = state.game.blind;
  var posSmallBlind = (posBigBlind + 1) % playersInRoom.length;
  var blind = 20;
  playersInRoom[posBigBlind].bet(blind * 2);
  playersInRoom[posSmallBlind].bet(blind);
  //state.game.focus = (posSmallBlind + 1) % playersInRoom.length;

  // Distribute blinds
  state.game.pokerTable.playerBet(state.game.players[posBigBlind], blind * 2);

  state.game.pokerTable.playerBet(state.game.players[posSmallBlind], blind);

  //state.game.start();
  return {
    ...state,
    controlsMode: "roundOne",
  };
};

const gameReducer = (state = initialState, action) => {
  csl.log(fileType, state, action);
  var room;
  var playerId;
  switch (action.type) {
    case actions.CREATE_GAME:
      csl.log(fileType, "CREATE GAME");
      // Create a new room with an initial state
      // We should have the creator of the room in the players list
      state.rooms[action.payload.id] = initialRoomState;
      return {
        ...state,
        rooms: {
          ...state.rooms,
          [action.payload.id]: { ...initialRoomState },
        },
      };
    case actions.START_GAME:
      if (state.rooms[action.payload.id].game.state === "waiting") {
        csl.log("START_GAME_EVENT", "Action payload:", action.payload);
        csl.log(
          "START_GAME_EVENT",
          "Starting game for room:",
          action.payload.id
        );
        csl.log(
          "START_GAME_EVENT",
          "Current game state:",
          state.rooms[action.payload.id].game.state,
          "USER :",
          action.payload.userId
        );

        csl.log("START_GAME_EVENT", "PlayerID start:", action.payload.userId);
        csl.log(fileType, "START GAME FOR ", action.payload.id);
        state.rooms[action.payload.id].game.players =
          state.rooms[action.payload.id].players;
        state.rooms[action.payload.id].game.start(action.payload.userId);
        return {
          ...state,
          rooms: {
            ...state.rooms,
            [action.payload.id]: { ...begin(state.rooms[action.payload.id]) },
          },
        };
      } else {
        // La partie est déjà en cours
        console.log("La partie est déjà en cours.");
        return state;
      }
    case actions.GAME_STARTED:
      csl.log(fileType, "start", action.type);
      return state;

    case actions.LEAVE_ROOM:
      answer = { status: false, mes: "Couldn't remove player from room" };
      console.log(action.payload);
      room = action.payload.tableId;
      playerId = action.payload.player;
      var isMaster = false;
      if (state.rooms.hasOwnProperty(room)) {
        const updatedPlayers = state.rooms[room].players.filter(
          (player) => player.getPlayerId() !== playerId
        );
        // If the player who leave was the master we change the master.
        // But only if there is still at least one player in the room.
        csl.log("leaveRoom", " srggm : ", state.rooms[room]);
        if (state.rooms[room].game.getMaster() === playerId) {
          isMaster = true;
          if (updatedPlayers.length !== 0)
            state.rooms[room].game.setMaster(updatedPlayers[0].getPlayerId());
        }
        if (updatedPlayers.length !== state.rooms[room].players.length) {
          console.log("Player:", playerId, " removed from room:", room);
          return {
            ...state,
            answer: {
              status: true,
              mes: "Player removed from room",
              payload: { restant: updatedPlayers.length, wasMaster: isMaster },
            },
            rooms: {
              ...state.rooms,
              [room]: {
                ...state.rooms[room],
                players: updatedPlayers,
              },
            },
          };
        } else {
          answer.mes = "Player" + playerId + "is not in the room";
          return state;
        }
      } else {
        answer.mes =
          "Not a room, can't kick player" + room + "  -:> " + playerId;
      }
      return {
        ...state,
        answer: answer,
      };

    case actions.SIT:
      failed = false;

      // test to check if table exist and id given
      if (action.payload.tableId === undefined) {
        state.answer = { status: false, mes: "No room given?" };
        failed = true;
      } else if (state.rooms[action.payload.tableId] === undefined) {
        state.answer = { status: false, mes: "No such room" };
        failed = true;
      }
      // --------------

      //Test to see if player id is given
      if (action.payload.player === undefined) {
        state.answer = { status: false, mes: "No player given ?" };
        failed = true;
      }
      playerId = action.payload.player.id;
      pseudo = action.payload.player.pseudo;
      if (playerId === undefined || pseudo === undefined) {
        failed = true;
        state.answer = { status: false, mes: "player empty" };
      }
      // --------------

      room = state.rooms[action.payload.tableId];

      // Test if player is already in the game
      found = false;
      csl.log(
        fileType,
        "(check for room length)",
        room.players,
        room.players.length
      );
      if (room.players.length > 0)
        room.players.forEach((p) => {
          // found is the status of the new comparison,
          // or if it's already true, then stay true
          found = p.getPlayerId() == playerId || found;
        });
      if (found) {
        state.answer = { status: false, mes: "Player already inside the room" };
        failed = true;
      }
      // --------------

      // We can add the player in the game
      if (!failed) {
        if (room.players.length === 0) {
          csl.log(
            fileType,
            "Sit player, first player set as Master and first to play."
          );
          room.game.setMaster(playerId);
          //room.game.setFocus(0);
        }
        state.answer = {
          status: true,
          mes: "Successfully join room",
          payload: { id: action.payload.tableId },
        };
        room.players = [...room.players, new Player(playerId, pseudo)];
        // We add the player to the game class.
        // room.game.addPlayer(room.players[room.players.length - 1]);
        csl.log(fileType, "Added player successfully");
      } else {
        csl.error(fileType, "Failed to sit player at the table.");
      }
      return { ...state };
    case actions.DELETE_ROOM:
      if (action.payload.tableId !== undefined) {
        if (state.rooms.hasOwnProperty(action.payload.tableId)) {
          delete state.rooms[action.payload.tableId];
        }
      }
      return {
        ...state,
      };
    case actions.FOLD:
      console.log(
        "Handling FOLD action for player",
        action.payload.playerId,
        "in room",
        action.payload.room
      );
      console.log(state.rooms[action.payload.room], action);

      if (action.payload && action.payload.playerId) {
        const room = state.rooms[action.payload.room];
        const player = room.players.find(
          (p) => p.getPlayerId() === action.payload.playerId
        );

        if (player) {
          csl.log("playerAction", "Player is folding.");
          room.game.fold(player);
        } else {
          console.error("Player not found for the fold action");
        }
      } else {
        console.error("Invalid payload for Fold action");
      }

      return { ...state };
      
    case actions.BET:
      console.log(state.rooms[action.payload.room], action);
      if (action.payload !== undefined)
        if (action.payload.amount !== undefined) {
          csl.log("playerAction", " call for raise of ", action.payload.amount);
          // state.rooms[action.payload.room].players
          //   .find((p) => p.getPlayerId() == action.payload.playerId)
          //   .bet(action.payload.amount);
          state.rooms[action.payload.room].game.pokerTable.playerBet(
            state.rooms[action.payload.room].game.players.find(
              (p) => p.getPlayerId() == action.payload.playerId
            ),
            action.payload.amount
          );

          state.rooms[action.payload.room].game.rotateFocus();
        }
      return { ...state };
    case actions.CHECK:
      console.log(
        "Handling CHECK action for player",
        action.payload.playerId,
        "in room",
        action.payload.room
      );
      console.log(state.rooms[action.payload.room], action);

      if (action.payload && action.payload.playerId) {
        const room = state.rooms[action.payload.room];
        const player = room.players.find(
          (p) => p.getPlayerId() === action.payload.playerId
        );

        if (player) {
          csl.log("playerAction", "Player is checking.");
          room.game.check(player);
        } else {
          console.error("Player not found for the check action");
        }
      } else {
        console.error("Invalid payload for CHECK action");
      }

      return { ...state };

    case actions.SHOW_CARD:
      console.log(state.rooms[action.payload.room], action);
      const {
        room: showRoomId,
        playerId: showPlayerId,
        cardIndex: showCardIndex,
      } = action.payload;
      const showRoom = state.rooms[showRoomId];
      if (showRoom) {
        csl.log("playerAction", "call for show card", showCardIndex);
        const player = showRoom.players.find(
          (p) => p.getPlayerId() === showPlayerId
        );
        if (player) {
          player.revealCard(showCardIndex);
        }
      }
      return { ...state };

    case actions.HIDE_CARD:
      console.log(state.rooms[action.payload.room], action);
      const {
        room: hideRoomId,
        playerId: hidePlayerId,
        cardIndex: hideCardIndex,
      } = action.payload;
      const hideRoom = state.rooms[hideRoomId];
      if (hideRoom) {
        {
          csl.log("playerAction", "call for hide card", hideCardIndex);
          const player = hideRoom.players.find(
            (p) => p.getPlayerId() === hidePlayerId
          );
          if (player) {
            player.hideCard(hideCardIndex);
          }
        }
      }
      return { ...state };
    case actions.CLEARANSWER:
      state.answer = false;
      return { ...state };
    // Other game actions can be handled here
    default:
      csl.log(fileType, "default", action.type);
      return state;
  }
};

module.exports = gameReducer;
