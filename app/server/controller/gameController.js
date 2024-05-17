const gameReducer = require("../store/reducers/gameReducer");
const gameDescriptionModel = require("../models/GameDescription");
const actions = require("../store/actions/actionsCreator");
const actionsTypes = require("../store/actions/actionTypes");
const jwt = require("jsonwebtoken");
const { clearInterval } = require("timers");
const initGameRoom = require("./game");
const { create } = require("domain");
const store = require("../store/configStore");
const csl = require("./intelligentLogging");
const { userInfo } = require("os");
const fileType = "gameController";
// csl.silenced("Status");
// csl.silenced("refreshCall");

let previousPlayerAction = {};

module.exports = gameController = {
  io: null,
  dao: null,
  refresh: {},
  /**
   * @param {dao} dao
   */
  init: function (dao) {
    csl.log('initGameController');
    this.dao = dao;
    store.dispatch(actions.setDao(dao));
  },

  /**
   * Sets up a periodic refresh call for a specific game room.
   * @param {string} room - The name of the room for which the refresh call is made.
   */
  makeRefreshCall: function (room) {
    // Get the current state of the store.
    const state = store.getState();

    // Check if the specified room exists in the game state.
    if (state.game.rooms.hasOwnProperty(room)) {
      // Check if a refresh is already in place for this room.
      if (this.refresh[room]) {
        // If a refresh is already in place, remove it.
        csl.log(
          "refreshCall",
          "Refresh already in place, automatically removed before being replaced."
        );
        clearInterval(this.refresh[room]);
      }

      // Set up an interval to periodically call the status broadcast function.
      this.refresh[room] = setInterval(
        (room, gc) => {
          // Log that the refresh is ongoing.
          csl.log("refreshCall", "Refresh for room : ", room);
          // Broadcast the updated status of the room.
          gc.broadcastStatus(room);
        },
        2000, // Refresh interval (in milliseconds).
        room, // Parameter: room name.
        this // Parameter: reference to the current object.
      );

      // Log that the refresh has been successfully set up.
      csl.log("refreshCall", "Refresh setup");
    }
  },

  /**
   * Adds a user to a game room.
   * @param {string} id - The ID of the game room.
   * @param {object} user - The user object containing user information.
   * @returns {object} - An object indicating the status of the join operation.
   */
  join: async function (id, user) {
    csl.log(fileType, this);
    var state = store.getState();

    // Check if game rooms are defined in the state.
    if (state.game.rooms !== undefined) {
      // Check if the specified room exists in the game state.
      if (state.game.rooms.hasOwnProperty(id)) {
        // Ensure user object is defined.
        if (user === undefined) {
          return { status: false, mes: "User undefined" };
        }

        // Retrieve user information from the database.
        answer = await this.dao.getUserInfo(user.id);
        if (!answer.success)
          return { status: false, mes: "Player not found in database" };
        userInfos = answer.user;
        coins = userInfos.coins;

        csl.log(
          fileType,
          "Room: ",
          id,
          "User to add : ",
          user,
          "His infos : ",
          userInfos.inGame
        );

        // Check if the user is already in a game.
        if (
          userInfos.inGame !== undefined &&
          userInfos.inGame !== null
        ) {
          // he's in a game, we check if it's a game that exist on our side and if it's this one
          if(userInfos.inGame.toString() !== id &&
          state.game.rooms.hasOwnProperty(userInfos.inGame.toString()))
            return { status: false, mes: "User already in a game." };
        }

        // Dispatch the sit action for the user.
        var answer = this.dispatch(user, actions.sit(id, user, coins));
        state = store.getState();
        csl.log(fileType, "answer of dispatch : ", answer);

        // If the sit action was successful.
        if (answer.status) {
          // Add the player's game description to the database.
          this.dao.addOnePlayerGameDesc(id, user.id);
          csl.log(fileType, state.game.rooms[id].state);
          csl.log(fileType, "New player, try to set refresh");

          // Set up refresh for the room.
          this.makeRefreshCall(id, false);
          csl.log(fileType, "Join call for broadcast ", answer);

          // Broadcast the updated status of the room.
          this.broadcastStatus(id);
        } else {
          // If the user is already in the room, broadcast status.
          if (answer.alreadyIn !== undefined && answer.alreadyIn) {
            this.broadcastStatus(id);
            answer = { ...answer, status: true };
          }
        }
        return answer;
      }
    }

    // If no rooms are available, return status false.
    return { status: false, mes: "No rooms" };
  },

  /**
   * Deletes a game room if it is empty.
   * @param {string} room - The ID of the room to delete.
   */
  deleteroom: function (room) {
    var state = store.getState();
    csl.log("deleteRoom", "Trying to delete room", room);

    // Check if the specified room exists in the game state.
    if (state.game.rooms.hasOwnProperty(room)) {
      const players = state.game.rooms[room].players;
      console.log(players);

      // If the room is empty, delete it.
      if (players.length === 0) {
        this.dispatch(0, actions.deleteRoom(room));
        this.dao.removeGameDesc(room);
        console.log("Room", room, "has been deleted because it is empty.");
      } else {
        console.error(
          "Room",
          room,
          "is not empty",
          players.length,
          "cannot delete."
        );
      }
    } else {
      console.error("Room", room, "does not exist, cannot delete.");
    }
  },
  // removeAfk:function(room,roomId){
  //   csl.log("removeAFK",room,roomId);
  //   const copy = room.players;
  //   csl.log('removeAfk','List of player :',copy);
  //   for(p in copy){
  //     csl.log('removeAfk',copy[p]);
  //     if(copy[p].isAfk){
  //       this.removePlayer(roomId,copy[p].getPlayerId());
  //     }
  //   }
  //   room.hasAfk = false;
  // },
  /**
   * Removes a player from a game room.
   * @param {string} room - The ID of the room from which the player is being removed.
   * @param {string} id - The ID of the player to be removed.
   */
  removePlayer: function (room, id) {
    // Dispatch the leave room action for the player.
    reponse = this.dispatch(id, actions.leaveRoom(room, id));
    csl.log("removePlayer", "Response : ", reponse);

    // If the player was successfully removed.
    if (reponse.status) {
      // Update database to reflect player leaving the game.
      this.dao.playerLeftGame(id);

      // Set up refresh for the room.
      this.makeRefreshCall(room);
      csl.log("removePlayer", this.io);

      // Stop listening to the room for the removed player.
      this.io.stopListeningToRoom(id, room);

      // If there are no remaining players in the room, delete the room.
      if (reponse.payload.restant === 0) {
        this.deleteroom(room);
      }
    }
  },

  timeOutPlayer: 3e10,
  /**
   * Broadcasts the status of a game room to connected clients.
   * @param {string} room - The ID of the room to broadcast the status of.
   */
  broadcastStatus: function (room) {
    const state = store.getState();

    // If the WebSocket connection is available.
    if (this.io !== null) {
      // Check if the specified room exists in the game state.
      if (!state.game.rooms.hasOwnProperty(room)) {
        // If the room does not exist, log an error and return.
        csl.error("refreshCall", "Room expired or does not exist");
        return;
      }

      const players = state.game.rooms[room].players;

      // Log the broadcast call.
        csl.log(
          "refreshCall",
          "gameController call for broadcast on ",
          room,
          " to io with hash :",
          room
        );

      // If there are no players in the room, clear the refresh call if set.
      if (players.length == 0) {
          csl.log(
            fileType,
            "No player in room, refresh call will be removed if set."
          );
        if (this.refresh[room] !== undefined)
          this.refresh[room] = clearInterval(this.refresh[room]);
      }

      // Code to kick someone if they didn't answer soon enough.
      // for (var i = 0; i < players.length; i++) {
      //     timedPassed = (Date.now() - players[i].gettimeLastAnswer());
      //     csl.log(('refreshCall'),' last answer :', players[i].gettimeLastAnswer());
      //     if (timedPassed > this.timeOutPlayer) {
      //         this.removePlayer(room, players[i].id);
      //     }
      // }

      // Broadcast the status of the room to connected clients.
      this.io.broadcastStatus(room);
    } else {
      // If no WebSocket connection is available, log an error.
      csl.error(fileType, "No io to broadcast");
    }
  },

  /**
   * Retrieves the status of a game room for a specific player.
   * @param {string} room - The ID of the room for which to retrieve the status.
   * @param {string} id - The ID of the player for whom the status is being retrieved.
   * @returns {object} - An object containing the status of the room for the specified player.
   */
  status: function (room, id) {
    const state = store.getState();

    // Check if the room exists in the game state.
    if (state.game.rooms[room] !== undefined) {
      // Prepare data to send back.
      toSendroom = {};
      toSendroom.game = state.game.rooms[room].game.getForPlayer(id);
      toSendroom.players = state.game.rooms[room].players.map((player) =>
        player.statusFor(id)
      );
      toSendroom.controlsMode = state.game.rooms[room].controlsMode;

      // Return status with data payload.
      return {
        status: true,
        mes: "Refreshing status",
        payload: toSendroom,
      };
    }

    // Return status indicating inability to refresh status.
    return { status: false, mes: "Can't refresh status", payload: [] };
  },
  /**
   * Creates a new game for a player and initializes a game room.
   * @param {string} userId - The ID of the player creating the new game.
   * @returns {string} - The ID of the newly created game room.
   * @throws {Error} - If there's an error during the process.
   */
  newGame: async function (userId) {
    const state = store.getState();

    // Check if userId is defined.
    if (userId === undefined) {
      csl.error(fileType, "player MUST be defined for newGame");
      return;
    }

    try {
      // Retrieve the user's pseudo.
      const pseudo = await this.dao.getUserPseudoFromUserId(userId);

      // Log the creation of a new game.
      csl.log(fileType, "Create new game inside gameController");

      // Create a new game description in the database.
      const respons = await this.dao.createGameDescription(
        pseudo,
        "",
        "friendly",
        0
      );
      csl.log(fileType, "respons : ", respons);

      // Handle errors in game description creation.
      if (respons.error) {
        csl.error(
          fileType,
          "Couldn't create game description",
          gameDescr.error
        );
        return;
      }

      // Retrieve the newly created game description.
      const gameDescr = respons.data;
      const room = gameDescr._id;
      console.log("Before init", state.game.rooms);

      // Initialize the game room.
      state.game.rooms[room] = initGameRoom(room);
      console.log("After init", state.game.rooms);

      // Dispatch actions to create the game and join the room.
      this.dispatch(userId, actions.createGame(room, pseudo));
      await this.join(room, userId);

      // Update user data to reflect being in the game.
      await this.dao.updateUserData("_id", userId, "inGame", room);

      return room;
    } catch (error) {
      // Handle errors from getUserPseudoFromUserId
      csl.error(fileType, "Error getting user name from user id:", error);
      throw error; // Re-throw the error for handling by the caller
    }
  },

  /**
   * Creates a new game and initializes a game room using a provided game room ID.
   * @param {string} userId - The ID of the player creating the new game.
   * @param {string} gameRoomId - The ID of the game room to be initialized.
   * @returns {boolean} - Indicates whether the operation was successful.
   */
  newGameV2: async function (userId, gameRoomId) {
    const state = store.getState();

    // Check if userId is defined.
    if (userId === undefined) {
      csl.error(fileType, "player MUST be defined for newGame");
      return;
    }

    console.log("Before init", state.game.rooms);

    // Initialize the game room.
    state.game.rooms[gameRoomId] = initGameRoom(gameRoomId);

    console.log("After init", state.game.rooms);

    // Retrieve the server name from the provided game room ID.
    const serverName = await this.dao.getServerNameFromGameId(gameRoomId);

    // Dispatch actions to create the game and join the room.
    this.dispatch(userId, actions.createGame(gameRoomId, serverName));
    this.join(gameRoomId, userId);

    // Update user data to reflect being in the game.
    await this.dao.updateUserData("_id", userId, "inGame", gameRoomId);

    return true;
  },
  /**
   * Handles a player's action affecting the game.
   * @param {object} action - The action object representing the player's action.
   */
  playerAction: function (action) {
    csl.log("PLAYER_ACTION", "Player is affecting the game : ", action);
    roomId = action.payload.room;

    // Check if the action is to show or hide a card
    if (
      action.type === actionsTypes.SHOW_CARD ||
      action.type === actionsTypes.HIDE_CARD
    ) {
      // Dispatch the action directly to the player
      this.dispatch(action.payload.playerId, action);
    } else {
      state = store.getState();

      // Check if game rooms are defined in the state
      if (state.game.rooms === undefined) return;
      if (state.game.rooms[action.payload.room] === undefined) return;

      room = state.game.rooms[roomId];
      csl.log("playerAction", room);

      // If the game state is not "waiting"
      if (room.game.state !== "waiting") {
        // If the current player is the active player
        if (
          room.game.players.findIndex(
            (p) => p.getPlayerId() == action.payload.playerId
          ) === room.game.focus
        ) {
          // Dispatch the player's action
          csl.log(
            "playerAction",
            this.dispatch(action.payload.playerId, action)
          );

          // Dispatch action indicating player has made a move
          answer_post_action = this.dispatch(
            action.payload.playerId,
            actions.playerPlayed(roomId, action)
          );
          csl.log("playerAction", answer_post_action);

          // Store the previous player's action
          previousPlayerAction[action.payload.playerId] = action;
        }
      }

      // Broadcast the updated status of the room
      this.broadcastStatus(roomId);
    }
  },
  /**
   * Dispatches an action to the Redux store and retrieves the resulting answer.
   * @param {object} user - The user object initiating the action.
   * @param {object} action - The action object to be dispatched.
   * @returns {object} - The answer retrieved from the store after dispatching the action.
   */
  dispatch: function (user, action) {
    csl.log(fileType, "user : ", user, " dispatch event : ", action);
    store.dispatch(action);
    const state = store.getState();
    console.log(state);
    const answer = state.game.answer;
    csl.log(fileType, "Answer: ", answer);
    store.dispatch(actions.clearAnswer());
    return answer;
  },

  /**
   * Starts the game in a specified room.
   * @param {string} room - The ID of the room where the game is to be started.
   * @param {string} userId - The ID of the player requesting to start the game.
   */
  startGame: async function (room, userId) {
    // Logic to start the game
    console.log("Starting game in room:", room, "requested by player:", userId);
    const state = store.getState();
    if (state.game.rooms.hasOwnProperty(room)) {
      store.dispatch(actions.startGame(room, userId));
      this.broadcastStatus(room);
    } else {
      console.error("Room does not exist:", room);
    }
  },
};
