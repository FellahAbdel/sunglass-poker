// Importing necessary modules
const jwt = require("jsonwebtoken"); // JSON Web Token for authentication
const actions = require("../store/actions/actionTypes"); // Action types
const actcrea = require("../store/actions/actionsCreator"); // Actions creator
const store = require("../store/configStore"); // Redux store configuration
const Player = require("../shared/Player"); // Player class
const game = require("./game"); // Game logic module
const csl = require("./intelligentLogging"); // Intelligent logging module
const hydra = require("./hydrateSpecifics"); // Hydra module for action hydration

// Setting file type for logging
const fileType = "socket.io.js";

// Silencing broadcastStatus logging
csl.silenced("broadcastStatus");

// Duration of a session in milliseconds
const SESSION_DURATION = 2 ** 31 - 1;

// Exporting function to initialize socket.io
module.exports = function (
  server,
  Middleware,
  corsSettings,
  gameController,
  dao
) {
  // Initializing socket.io server with CORS settings
  const io = require("socket.io")(server, { cors: corsSettings });

  // Applying middleware to socket.io engine
  io.engine.use(Middleware);

  // Setting up game controller with socket.io methods
  gameController.io = {
    // Method to broadcast status to a room
    broadcastStatus: function (room) {
      csl.log("broadcastStatus", "socket io broadcast to room", room);
      io.to(room).emit("refresh", { status: true });
    },
    // Method to stop listening to a room
    stopListeningToRoom: kickOfRoom,
  };

  /**
   * Finds the room of a player based on their user ID and joins them to that room if they are already in a game.
   * @param {object} socket - The socket object of the player.
   * @param {string} userId - The user ID of the player.
   */
  async function findPlayerRoom(socket, userId) {
    // Get user information from the database based on user ID
    answer = await dao.getUserInfo(userId);

    // Log the result of the manual request for game information
    csl.log("ManualRequestForGame", answer);

    // Check if user information retrieval was successful
    if (answer.success) {
      userInfos = answer.user;
      // Log user's in-game status
      csl.log(
        "ManualRequestForGame",
        userInfos.inGame,
        userInfos.inGame !== null,
        userInfos.inGame !== undefined
      );

      // If the user is already in a game, join them to that room
      if (userInfos.inGame !== null && userInfos.inGame !== undefined) {
        joinRoom(socket, { id: userInfos.inGame.toString() });
      }
    }
  }

  /**
   * Retrieves the status of a player in a specific room and sends the status information back to the player.
   * @param {object} socket - The socket object of the player.
   * @param {{room:room id, id: player id}} data - Data containing the room information.
   */
  function playerRoomStatus(socket, data) {
    // Logging attempt for status retrieval
    csl.log(fileType, "Try for status");

    // Retrieve room number from data
    room = data.room;

    // Check if room number is valid
    if (room === undefined || room === null) {
      // Log error for invalid room number
      csl.error(fileType, "Error in room number");
      return;
    }

    // Check if user ID is defined in the session
    if (socket.request.session.userId === undefined) {
      // Log error for undefined user ID
      csl.error(fileType, "Can't refresh status to player with undefined id");
      return;
    }

    // Retrieve user ID from session
    id = socket.request.session.userId;

    // Retrieve status information from game controller
    const answer = gameController.status(room, id);

    // Log the status of the player
    csl.log(fileType, "status of ", id, " : =", answer);

    // Emit an event to the player containing the status payload with type REFRESH
    socket.emit("event", {
      payload: answer.payload,
      type: actions.REFRESH,
    });
  }

  /**
   *
   * @param {socket} socket
   * @param {Token} token
   */

  /**
   * Identifies the user based on the provided token and associates the socket with the user's session.
   * @param {object} socket - The socket object.
   * @param {string} token - The JWT token used for user identification.
   */
  async function identify(socket, token) {
    // Logging user identification attempt with token
    csl.log(fileType, "User is identifying himself with token ", token);

    // Check if the token is null
    if (token === null) {
      // If token is null, handle session destruction and socket disconnection (code commented out)
      // csl.log(fileType,'Destroy socket for ', socket.id);
      // io.in(socket.request.session.id).disconnectSockets(true);
      // socket.request.session.destroy();
      // socket.disconnect();
    } else {
      // If token is not null
      csl.log(fileType, socket.rooms, socket.rooms.has(token));

      // Check if the socket is not already in the room identified by the token
      if (!socket.rooms.has(token)) {
        try {
          // Verify the JWT token
          const decoded = jwt.verify(token, process.env.JWT_SECRET);

          // Save the session
          socket.request.session.save();

          // Logging session ID and joining the room with the session ID
          csl.log(
            fileType,
            "Session id : ",
            socket.id,
            " join room session:",
            token
          );

          // Get user information from the database based on the decoded user ID
          info = await dao.getUserInfo(decoded.id);

          // If user information retrieval is successful
          if (info.success) {
            if (info.user) {
              // Set user's pseudo in the session
              socket.request.session.pseudo = info.user.pseudo;
            }
          }

          // Set user ID in the session
          socket.request.session.userId = decoded.id;

          // Logging session information after user login
          csl.log(
            "Session",
            "Logged in user's session pseudo:",
            socket.request.session.pseudo,
            " id :",
            socket.request.session.userId
          );

          // Join the room identified by the decoded user ID
          socket.join(decoded.id);
        } catch (err) {
          // Handle errors with token verification
          csl.error(fileType, "Error with token : ", err);
          socket.disconnect();
          csl.error(fileType, "Error with token : ", err);
          socket.disconnect();
        }
      }
    }
  }

  /**
   * Allows a user to join a specific room and handles the joining process.
   * @param {object} socket - The socket object of the user.
   * @param {{id: roomId}} data - Data containing the room ID to join.
   */
  async function joinRoom(socket, data) {
    // Check if data is an object and contains room ID
    if (typeof data === "object" && data.id !== undefined) {
      // Attempt to join the room using the game controller
      answer = await gameController.join(data.id, {
        id: socket.request.session.userId,
        pseudo: socket.request.session.pseudo,
      });

      // If joining is unsuccessful, emit an event to inform the user
      if (answer.status === false) {
        socket.emit("joinRoom", answer);
      } else {
        // If joining is successful
        room = data.id;
        csl.log("joinRoom", "Joining the socket room : ", room);

        // Join the socket room
        socket.join(room);

        // Emit an event to inform the user about successful joining
        socket.emit("joinRoom", answer);

        // Log the answer
        csl.log(fileType, answer);

        // Get the current state from the Redux store
        const state = store.getState();

        // Send the new game state to the client store
        sendEvent(
          socket,
          actcrea.sitted(
            state.game.rooms[data.id].game.pokerTable.communityCards,
            state.game.rooms[data.id].players
          )
        );

        // Emit a 'refresh' event to the room to trigger a refresh
        io.to(room).emit("refresh");

        // Update the user's room information in the session
        socket.request.session.userRoom = data.id;
        socket.request.session.save();
      }
    } else {
      // If data is invalid, emit an event to inform the user
      csl.error(fileType, "User tried to join wrong room.");
      socket.emit("jointRoom", { status: "failed", mes: "Invalid data" });
    }

    // Save the session
    socket.request.session.save();
  }

  /**
   * Kicks a user out of a specific room by removing their socket from the room.
   * @param {string} userId - The user ID of the player to be kicked.
   * @param {string} room - The room from which the user will be kicked.
   */
  async function kickOfRoom(userId, room) {
    // Get all sockets associated with the user ID
    const socketsOfPlayer = io.sockets.adapter.rooms.get(userId);

    // Check if sockets are found for the user
    if (socketsOfPlayer) {
      // Iterate through each socket in the room
      socketsOfPlayer.forEach((socketId) => {
        // Find the socket object by its ID
        const socket = io.sockets.sockets.get(socketId);

        // If the socket is found and it's in the specified room, remove it from the room
        if (socket && socket.rooms.has(room)) {
          // Log that the user is being kicked from the room
          csl.log("kickOfRoom", "Kicking user from room");

          // Emit a 'kicked' event to the socket
          socket.emit("kicked");

          // Emit a 'refresh' event to the room to trigger a refresh
          io.to(room).emit("refresh");

          // Remove the socket from the room
          socket.leave(room);
        }
      });
    }
  }

  /**
   * Handles a player leaving a room by removing them from the game and sending a 'leftRoom' event to the player.
   * @param {object} socket - The socket object of the player.
   */
  async function leaveRoom(socket) {
    // Log the reception of the 'leaveRoom' event from the player
    csl.log(fileType, "Received 'leaveRoom' from player");

    // Retrieve user information from the database based on the user ID stored in the session
    const response = await dao.getUserInfo(socket.request.session.userId);

    // If user information retrieval is successful
    if (response.success) {
      const user = response.user;

      // Check if the user is currently in a game
      if (user.inGame !== null) {
        // Remove the player from the game using the game controller
        gameController.removePlayer(
          user.inGame.toString(), // Convert the room ID to string
          socket.request.session.userId
        );

        // Send a 'leftRoom' event to the player
        sendEvent(socket, actcrea.leftRoom());
      } else csl.error(fileType, "Error in leaveRoom");
    } else {
      csl.error(fileType, "Error in leaveRoom");
    }
  }

  /**
   * Sends an event to a socket for dispatch.
   *
   * @param {Socket} socket The socket to send the event through.
   * @param {{ type: string, payload: any }} action The action object containing type and payload.
   */
  function sendEvent(socket, action) {
    csl.log("Event", "Sending event to dispatch at user:", action);
    socket.emit("event", action);
  }

  /**
   * Dispatches an action received from a socket, hydrating it if necessary, and triggers appropriate actions based on the action type.
   * @param {object} socket - The socket object from which the action is received.
   * @param {{data:{action:{type: String, payload: any}, room:id}}} data - The data containing the action to be dispatched.
   */
  function dispatch(socket, data) {
    // Log the reception of the dispatch
    csl.log("dispatch", "Dispatch received:", data);

    // Hydrate the action if necessary
    var action = hydra(socket, data);

    // Log the action after hydration
    csl.log(
      "DISPATCH SOCKET",
      "Action hydrated vs data received",
      action,
      data
    );

    // Check if the action is related to a player
    if (action.payload.playerId) {
      // Check if the action subtype is for player game action
      if (action.subtype === actions.PLAYER_GAME_ACTION) {
        // If subtype is for player game action, trigger playerAction in gameController
        gameController.playerAction(action);
      } else {
        // If not, dispatch the action in gameController
        gameController.dispatch(action.payload.playerId, action);
      }
    }
  }

  /**
   * Handles the creation of a new game when triggered by a socket event.
   * @param {object} socket - The socket object triggering the event.
   */
  function createGame(socket) {
    // Log that the 'createGame' event is called
    csl.log(fileType, "createGame called (from socket.io.js)");

    // Log that the 'createGame' event is received on the server
    csl.log(fileType, "createGame event received on the server");

    // Log who dispatches the event
    csl.log(fileType, "Who dispatches:", socket.request.session.userId);

    // Create a new promise for creating the game
    const newGamePromise = new Promise((resolve) => {
      // Call the DAO function to create the game
      const pseudo = socket.request.session.pseudo;
      const id = gameController.newGame(socket.request.session.userId);

      // Resolve the promise once the game creation completes
      resolve(id);
    });

    // Wait for the promise to resolve
    newGamePromise.then(async (id) => {
      // Log the ID of the newly created game
      csl.log(fileType, id, " >- ID of the created game");

      // Check if the game creation was successful
      if (id === undefined) {
        csl.error(fileType, "Refused to create a new game");
        return;
      }

      // Dispatch an action to update the Redux store with the created game
      gameController.dispatch(
        socket.request.session.userId,
        actcrea.createGame(id)
      );
      csl.log(fileType, "Store dispatch:", store.getState());

      // Dispatch an action to indicate that the game is in the lobby state
      store.dispatch({ type: actions.GAME_LOBBY });

      // Get the updated state of the Redux store
      const state = store.getState();

      // Send an event to the socket to update the client's game lobby state
      sendEvent(socket, actcrea.gameLobby(state.game.rooms[id]));

      // Join the room corresponding to the newly created game
      const answer = await joinRoom(socket, { id: id.toString() });
      csl.log(fileType, answer);
      socket.emit("joinRoom", answer);
    });
  }

  /**
   * Handles the creation of a new game when triggered by a socket event, version 2.
   * @param {object} socket - The socket object triggering the event.
   * @param {string} receivedGameRoomId - The ID of the game room received from the client.
   */
  function createGameV2(socket, receivedGameRoomId) {
    // Log that the 'createGameV2' event is called
    csl.log(fileType, "createGameV2 called (from socket.io.js)");

    // Log that the 'createGameV2' event is received on the server
    csl.log(fileType, "createGameV2 event received on the server");

    // Log who dispatches the event
    csl.log(fileType, "Who dispatches:", socket.request.session.userId);

    // Retrieve the user ID from the session
    const userId = socket.request.session.userId;

    // Call the gameController function to create a new game
    const result = gameController.newGameV2(userId, receivedGameRoomId);

    // Check if the game creation was successful
    if (!result) {
      csl.error(fileType, "Refused to create new game");
      return;
    }

    // Dispatch an action to update the Redux store with the created game
    gameController.dispatch(
      socket.request.session.userId,
      actcrea.createGame(receivedGameRoomId)
    );
    csl.log(fileType, "Store dispatch:", store.getState());

    // Dispatch an action to indicate that the game is in the lobby state
    store.dispatch({ type: actions.GAME_LOBBY });

    // Get the updated state of the Redux store
    state = store.getState();

    // Send an event to the socket to update the client's game lobby state
    sendEvent(socket, actcrea.gameLobby(state.game.rooms[receivedGameRoomId]));

    // Join the room corresponding to the newly created game
    const answer = joinRoom(socket, { id: receivedGameRoomId.toString() });
    csl.log(fileType, answer);
    socket.emit("joinRoom", answer);
  }

  /**
   * Updates the status of a game to 'in progress' in the database.
   * @param {string} roomId - The ID of the game room to update.
   */
  async function updateGameStatus(roomId) {
    // Log that the 'updateGameStatus' function is called
    csl.log(fileType, "updateGameStatus called");

    // Call the DAO function to update the game status to 'in progress'
    const answer = await dao.updateStatusToInProgress(roomId);

    // Check if the update was successful
    if (answer.success) {
      // Log that the game status is updated to 'in progress'
      csl.log(fileType, "Game status updated to in progress");
    } else {
      // Log an error if the update fails
      csl.error(fileType, "Failed to update game status to in progress");
    }
  }

  // Handle socket connections
  io.on("connection", (socket) => {
    // Retrieve the session associated with the connection
    session = socket.request.session;
    // Join the existing session
    socket.join(socket.request.session.id);
    // Log the user connection
    csl.log(
      fileType,
      "a user connected n: " +
        socket.id +
        " | session : " +
        socket.request.session.id,
      " userId : ",
      socket.request.session.userId
    );

    // Set a timer to close the connection after SESSION_DURATION
    const session_timer = setInterval(() => {
      io.in(socket.request.session.id).disconnectSockets(true);
      socket.request.session.destroy();
    }, SESSION_DURATION);

    // Listen for 'status' event
    socket.on("status", (data) => {
      if (socket.request.session.userId) {
        // Give status to the player
        playerRoomStatus(socket, data);
      } else {
        csl.log(fileType, "User not in session");
      }
    });

    // Listen for 'myNameIs' event
    socket.on("myNameIs", (token) => {
      // Identify the user with the provided token
      identify(socket, token);
    });

    // Listen for 'joinRoom' event
    socket.on("joinRoom", (data) => {
      if (socket.request.session.id) {
        joinRoom(socket, data);
      }
    });

    // Listen for 'leaveRoom' event
    socket.on("leaveRoom", () => {
      if (socket.request.session.id) {
        leaveRoom(socket);
      }
    });

    // Listen for 'hello' event
    socket.on("hello", (data) => {
      // Refresh session timer and emit 'world' event
      session_timer.refresh();
      socket.emit("world", { responseData: "The world salute you" });
    });

    // Listen for 'disconnect' event
    socket.on("disconnect", () => {
      // Log user disconnection
      csl.log(
        fileType,
        "user disconnected n:" +
          socket.id +
          " | session : " +
          socket.request.session.id
      );
    });

    // Listen for 'dispatch' event
    socket.on("dispatch", (data) => {
      if (socket.request.session.userId) {
        // Dispatch action
        dispatch(socket, data);
      }
    });

    // Listen for 'createGame' event
    socket.on("createGame", () => {
      if (socket.request.session.userId) {
        // Create new game
        createGame(socket);
      }
    });

    // Listen for 'createGameV2' event
    socket.on("createGameV2", (data) => {
      const receivedGameRoomId = data.gameRoomId;
      if (socket.request.session.userId) {
        // Create new game V2
        createGameV2(socket, receivedGameRoomId);
      }
    });

    // Listen for 'startGame' event
    socket.on("startGame", (data) => {
      // Start the game
      const room = data.room;
      const userId = data.userId;
      gameController.startGame(room, userId);
      updateGameStatus(room);
    });

    // Listen for 'showMyGame' event
    socket.on("showMyGame", () => {
      if (socket.request.session.userId) {
        // Find player's room
        findPlayerRoom(socket, socket.request.session.userId);
      }
    });

    // Save the session
    socket.request.session.save();
  });

  // Return the socket.io instance
  return io;
};
