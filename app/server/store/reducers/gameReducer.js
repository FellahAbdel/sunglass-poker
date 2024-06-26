// This file contains the reducer for game-related actions
const actions = require("../actions/actionTypes.js");
const Player = require("../../shared/Player.js");
const game = require("../../shared/Game.js");
const csl = require("../../controller/intelligentLogging.js");
const fileType = "gameReducer";

const initialRoomState = (serverName) => {
  csl.log("initialRoomsState", serverName);
  return {
    game: new game({ serverName: serverName }),
    players: [], // initial players
  };
};

const initialState = {
  rooms: {},
  answer: false,
};

const begin = (state) => {
  return {
    ...state,
    controlsMode: "roundOne",
  };
};

const gameReducer = (state = initialState, action) => {
  var room;
  var playerId;
  var answer;
  switch (action.type) {
    case actions.SET_DAO:
      return {
        ...state,
        dao: action.payload.dao,
      };
    case actions.CREATE_GAME:
      if (action.payload.serverName === undefined) return state;
      csl.log(fileType, "CREATE GAME");
      // Create a new room with an initial state
      // We should have the creator of the room in the players list
      state.rooms[action.payload.id] = initialRoomState(
        action.payload.serverName
      );
      return {
        ...state,
        rooms: {
          ...state.rooms,
        },
      };
    case actions.START_GAME:
      if (state.rooms[action.payload.id].players.length <= 1)
        csl.log("START_GAME_EVENT", "not enough player");
      else if (state.rooms[action.payload.id].game.state === "waiting") {
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
        csl.log("La partie est déjà en cours.");
        return state;
      }
    case actions.GAME_STARTED:
      csl.log(fileType, "start", action.type);
      return state;

    case actions.LEAVE_ROOM:
      answer = { status: false, mes: "Couldn't remove player from room" };
      csl.log(action.payload);
      room = action.payload.tableId;
      playerId = action.payload.player;
      var isMaster = false;
      if (state.rooms.hasOwnProperty(room)) {
        state.rooms[room].game.removePlayer(playerId);
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
          csl.log("Player:", playerId, " removed from room:", room);
          return {
            ...state,
            answer: {
              status: true,
              mes: "Player removed from room",
              payload: {
                restant: state.rooms[room].game.allPlayers.filter(
                  (p) => !p.isSpectator && !p.isAfk
                ).length,
                wasMaster: isMaster,
              },
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

      if (coins === undefined) {
        failed = true;
        state.answer = { status: false, mes: "coins empty" };
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
        state.answer = {
          status: false,
          alreadyIn: true,
          mes: "Player already inside the room",
          payload: { id: action.payload.tableId },
        };
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
        }
        state.answer = {
          status: true,
          mes: "Successfully join room",
          payload: { id: action.payload.tableId },
        };
        room.game.resetRestartCall();
        let newPlayer = new Player(playerId, pseudo, coins);
        newPlayer.updateUserCoins = state.dao.updateUserCoins;
        csl.log(["gameReducer", "new Player"], "player created : ", newPlayer);
        if (room.players.length === 0) {
          room.game.setMaster(playerId);
        }
        room.game.addPlayer(newPlayer);
        room.players = [...room.players, newPlayer];
        state.answer = {
          status: true,
          mes: "Successfully joined room",
          payload: { id: action.payload.tableId },
        };

        room.game.resetRestartCall();
        csl.log(fileType, "Added player successfully");
      } else {
        csl.error(fileType, "Failed to sit player at the table.");
      }
      return { ...state };
    case actions.DELETE_ROOM:
      if (action.payload.tableId !== undefined) {
        if (state.rooms.hasOwnProperty(action.payload.tableId)) {
          state.rooms[action.payload.tableId].game.destroy();
          delete state.rooms[action.payload.tableId];
          csl.log(
            fileType,
            "Room " + action.payload.tableId + " deleted successfully"
          );
        }
      }
      return {
        ...state,
      };
    case actions.FOLD:
      csl.log(
        "Handling FOLD action for player",
        action.payload.playerId,
        "in room",
        action.payload.room
      );
      csl.log(state.rooms[action.payload.room], action);

      if (action.payload && action.payload.playerId) {
        const room = state.rooms[action.payload.room];
        const player = room.players.find(
          (p) => p.getPlayerId() === action.payload.playerId
        );

        if (player) {
          csl.log("playerAction", "Player is folding.");
          room.game.fold(player);
        } else {
          csl.error("Player not found for the fold action");
        }
      } else {
        csl.error("Invalid payload for Fold action");
      }

      return { ...state };

    case actions.BET:
      answer = {
        success: false,
        mes: "Action did not go through",
        payload: undefined,
      };
      csl.log(state.rooms[action.payload.room], action);
      if (action.payload && action.payload.playerId) {
        csl.log("playerAction", " call for raise of ", action.payload.amount);
        const room = state.rooms[action.payload.room];
        const player = room.players.find(
          (p) => p.getPlayerId() === action.payload.playerId
        );

        if (player) {
          csl.log("playerAction", "Player is beting.");
          answer = room.game.bet(player, action.payload.amount);
        } else {
          csl.error("Player not found for the bet action");
        }
      } else {
        csl.error("Invalid payload for bet action");
      }

      return { ...state, answer: answer };

    case actions.CHECK:
      csl.log(
        "Handling CHECK action for player",
        action.payload.playerId,
        "in room",
        action.payload.room
      );
      csl.log(state.rooms[action.payload.room], action);

      if (action.payload && action.payload.playerId) {
        const room = state.rooms[action.payload.room];
        const player = room.players.find(
          (p) => p.getPlayerId() === action.payload.playerId
        );

        if (player) {
          csl.log("playerAction", "Player is checking.");
          room.game.check(player);
        } else {
          csl.error("Player not found for the check action");
        }
      } else {
        csl.error("Invalid payload for CHECK action");
      }

      return { ...state };

    case actions.SHOW_CARD:
      csl.log(state.rooms[action.payload.room], action);
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
        if (player && player.isActive) {
          player.revealCard(showCardIndex);
        }
      }
      return { ...state };

    case actions.HIDE_CARD:
      csl.log(state.rooms[action.payload.room], action);
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

    case actions.ACTIVATE_BONUS:
      csl.log(
        "Handling ACTIVATE_BONUS action for player",
        action.payload.playerId,
        "in room",
        action.payload.room
      );
      if (action.payload && action.payload.playerId) {
        const room = state.rooms[action.payload.room];
        const player = room.players.find(
          (p) => p.getPlayerId() === action.payload.playerId
        );

        if (player) {
          room.game.activateBonus(player);
        } else {
          csl.error("Player not found for the bonus activation action");
        }
      } else {
        csl.error("Invalid payload for bonus activation action");
      }
      return { ...state };

    case actions.PLAYER_PLAYED:
      state.rooms[action.payload.room].game.playerPlayed();
      return { ...state };
    case actions.CLEARANSWER:
      state.answer = false;
      return { ...state };
    case actions.AUTO_RESTART_TOGGLE:
      csl.log("TOGGLE_RESTART", "payload : ", action.payload);
      if (action.payload.playerId && action.payload.room) {
        if (state.rooms[action.payload.room]) {
          state.rooms[action.payload.room].game.toggleRestart(
            action.payload.playerId
          );
        }
      }
      return { ...state };
    // Other game actions can be handled here
    default:
      csl.log(fileType, "default", action.type);
      return state;
  }
};

module.exports = gameReducer;
