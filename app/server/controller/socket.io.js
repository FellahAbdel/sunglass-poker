// Importing necessary modules
const jwt = require("jsonwebtoken"); // JSON Web Token for authentication
const actions = require("../store/actions/actionTypes"); // Action types
const actcrea = require("../store/actions/actionsCreator"); // Actions creator
const store = require("../store/configStore"); // Redux store configuration
const Player = require("../shared/Player"); // Player class
const game = require("./game"); // Game logic module
const csl = require("./intelligentLogging"); // Intelligent logging module
const hydra = require("./hydrateSpecifics"); // Hydra module for action hydration

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

  // create custom socket io function to the controller
  gameController.io = {
    // Will allow the gameController to ask all client of a room
    // to actualize the room they see.
    broadcastStatus: function (room) {
      csl.log("broadcastStatus", "socket io broadcast to room", room);
      io.to(room).emit("refresh", { status: true });
    },
    // Method to stop listening to a room
    stopListeningToRoom: kickOfRoom,
  };


  /**
   * Handles the creation of a new game when triggered by a socket event.
   * Automatically read the id of the user asking to join him after the creation of the room
   * @param {object} socket - The socket object triggering the event.
   */
  function createGame(socket) {
    csl.log("socketio", "createGame called (from socket.io.js)", socket.request.session.userId);

    // Create a new promise for the creation of the game
    const newGamePromise = new Promise((resolve) => {
      const id = gameController.newGame(socket.request.session.userId);
      // resolve based on the id.
      resolve(id);
    });

    // Once it's done we check.
    newGamePromise.then(async (id) => {
      csl.log("socketio", id, " >- ID of the created game");

      // If the creation failed we stop.
      if (id === undefined) {
        csl.error("socketio", "Refused to create a new game");
        return;
      }

      // Dispatch an action to update the Redux store with the created game
      gameController.dispatch(
        socket.request.session.userId,
        actcrea.createGame(id)
      );
      csl.log("socketio", "Store dispatch:", store.getState());

      // Dispatch an action to indicate that the game is in the lobby state
      store.dispatch({ type: actions.GAME_LOBBY });

      // Get the updated state of the Redux store
      const state = store.getState();

      // Send an event to the socket to update the client's game lobby state
      sendEvent(socket, actcrea.gameLobby(state.game.rooms[id]));

      // Join the room corresponding to the newly created game
      const answer = await joinRoom(socket, { id: id.toString() });
      csl.log("socketio", answer);
      socket.emit("joinRoom", answer);
    });
  }

  /**
   * Handles the creation of a new game when triggered by a socket event.
   * This version doesn't actually create the gamedescription on the bdd,
   * the client has to provide the id of the one he created 
   * @param {object} socket - The socket object triggering the event.
   * @param {string} receivedGameRoomId - The ID of the game room received from the client based on the one added in Database.
   */
  function createGameV2(socket, receivedGameRoomId) {
    csl.log("socketio", "createGameV2 called (from socket.io.js)", socket.request.session.userId);

    // Retrieve the user ID from the session
    const userId = socket.request.session.userId;
    const result = gameController.newGameV2(userId, receivedGameRoomId);

    // Check if the game creation was successful
    if (!result) {
      csl.error("socketio", "Refused to create new game");
      return;
    }

    // Dispatch an action to update the Redux store with the created game
    gameController.dispatch(
      socket.request.session.userId,
      actcrea.createGame(receivedGameRoomId)
    );
    csl.log("socketio", "Store dispatch:", store.getState());

    // Dispatch an action to indicate that the game has to be in the lobby state
    store.dispatch({ type: actions.GAME_LOBBY });

    // Get the updated state of the Redux store
    state = store.getState();

    // send to the client the state of the game he created.
    sendEvent(socket, actcrea.gameLobby(state.game.rooms[receivedGameRoomId]));

    // Join the room corresponding to the newly created game
    const answer = joinRoom(socket, { id: receivedGameRoomId.toString() });
    csl.log("socketio", answer);
    socket.emit("joinRoom", answer);
  }

  /**
   * Dispatches an action received from a socket, hydrating it if necessary, and triggers appropriate actions based on the action type.
   * @param {object} socket - The socket object from which the action is received.
   * @param {{action:{type: String, payload: any}, room:id}} data - The data containing the action to be dispatched.
   */
  function dispatch(socket, data) {
    csl.log("dispatch", "Dispatch received:", data);

    // Filter and correct the inputs accordingly to the action type
    var action = hydra(socket, data);

    csl.log(
      "DISPATCH SOCKET",
      "Action hydrated vs data received",
      action,
      data
    );

    // Check if the action is auth.
    if (action.payload.playerId) {
      // Check if the action subtype is for player game action
      if (action.subtype === actions.PLAYER_GAME_ACTION) {
        gameController.playerAction(action);
      } else {
        // If not, regular dispatch in gameController
        gameController.dispatch(action.payload.playerId, action);
      }
    }
  }


  /**
   * Finds the room of a player based on their user ID and joins them to that room if they are already in a game.
   * @param {object} socket - The socket object of the player.
   * @param {string} userId - The user ID of the player.
   */
  async function findPlayerRoom(socket, userId) {
    // Get user information from the database based on user ID
    answer = await dao.getUserInfo(userId);

    csl.log("ManualRequestForGame", answer);

    //If we can't read the player of the bdd we wont know the game he's in.
    if (answer.success) {
      //we take the object user from the answer of the db
      userInfos = answer.user;
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
   * Identify a user based on the token he got at login
   * If successfull we save the username and id in the session from the database
   * Nothing else is really needed and for security reason we don't save them. 
   * @param {object} socket - L'objet socket faisant la requête
   * @param {string} token - Le token JWT de l'utilisateur.
   */
  async function identify(socket, token) {
    csl.log("identify", "User is identifying himself with token ", token);
  
    // Can't identify without the token.
    if (token !== null) {
      csl.log("identify", socket.rooms, socket.rooms.has(token));
      let decoded = false;
      try {
        // Verify the JWT token
        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (err) {
        // Handle errors with token verification
        csl.error("socketio", "Error with token : ", err);
        socket.disconnect();
        return false;
      }

      // Check if the socket is not already in the room identified by the token
      // If so, he's auth again.
      if (socket.rooms.has(decoded.id)) return true;
      else {

        // Logging session ID and joining the room with the session ID
        csl.log(
          "identify",
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
        } else return false;

        // Set user ID in the session
        socket.request.session.userId = decoded.id;

        csl.log(
          "identify",
          "Logged in user's session pseudo:",
          socket.request.session.pseudo,
          " id :",
          socket.request.session.userId
        );
        // Save the session
        socket.request.session.save();

        // Join the room identified by the decoded user ID
        socket.join(decoded.id);
        return true;
      }
    }
    return false;
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
        room = data.id;
        csl.log("joinRoom", "Joining the socket room : ", room);

        // Join the communication room of the game.
        socket.join(room);

        // Emit an event to inform the user about successful joining
        socket.emit("joinRoom", answer);

        csl.log("socketio", answer);

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

        // Emit a 'refresh' event to the room to trigger a refresh status of all player.
        // this will allow them to see the new player.
        io.to(room).emit("refresh");

        // Update the user's room information in the session
        socket.request.session.userRoom = data.id;
        socket.request.session.save();
      }
    } else {
      // If data is invalid, emit an event to inform the user
      csl.error("socketio", "User tried to join wrong room.");
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
   * We find the game he's in ourself to not have a selflock situation where the client forgot the room
   * they were in.
   *   /\    IMPORTANT:  this event cannot fail. If there's no game we still send a leftRoom to refresh the client page
   *  /||\                If the game is running the client still wants to leave, we let him do it and he will be kicked
   * / .. \               for being AFK. He still has time to join the room again and continue the Game. 
   *                                                                        [Leaving during the game is not fairplay :) ]
   * @param {object} socket - The socket object of the player.
   */
  async function leaveRoom(socket) {
    csl.log("socketio", "Received 'leaveRoom' from player");

    if(!socket.request.session.userId)
      sendEvent(socket, actcrea.leftRoom());

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

      } else csl.error("socketio", "Error in leaveRoom");
    } else {
      csl.error("socketio", "Error in leaveRoom");
    }
    // Send a 'leftRoom' event to the player.
    sendEvent(socket, actcrea.leftRoom());
  }


  /**
   * Retrieves the status of a player in a specific room and sends the status information back to the player.
   * @param {object} socket - The socket object of the player.
   * @param {{room:roomId}} data - Expected to contain the room id. The user id is retrieved from the socket session.
   */
  function playerRoomStatus(socket, data) {
    csl.log("socketio", "Try for status");

    // Get the room id from  the data and check if it's set, otherwise end error to the player.
    room = data.room;
    if (room === undefined || room === null) {
      csl.error("socketio", "Error in room number");
      return;
    }

    // Check if user ID is defined in the session
    // Otherwise the call fail. (It should have failed earlier)
    if (socket.request.session.userId === undefined) {
      csl.error("socketio", "Can't refresh status to player with undefined id");
      return;
    }

    // Else we can read the user id
    id = socket.request.session.userId;

    // Custom status for the player
    const answer = gameController.status(room, id);

    csl.log("socketio", "status of ", id, " : =", answer);

    // Emit to the player the resulting
    socket.emit("event", {
      payload: answer.payload,
      type: actions.REFRESH,
    });
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
   * Updates the status of a game to 'in progress' in the database.
   * @param {string} roomId - The ID of the game room to update.
   */
  async function updateGameStatus(roomId) {
    csl.log("socketio", "updateGameStatus called");

    // Call the DAO function to update the game status to 'in progress'
    const answer = await dao.updateStatusToInProgress(roomId);

    if (answer.success) {
      csl.log("socketio", "Game status updated to in progress");
    } else {
      csl.error("socketio", "Failed to update game status to in progress");
    }
  }

  // Handle socket connections
  io.on("connection", (socket) => {
    // Join together all session of a socket.
    session = socket.request.session;
    socket.join(socket.request.session.id);

    csl.log(
      "socketio",
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

    // --- List of event to listen to ---

    // Give status to the player if he's auth
    socket.on("status", (data) => {
      if (socket.request.session.userId) {
        playerRoomStatus(socket, data);
      } else {
        csl.log("socketio", "User not in session");
      }
    });


    // identify. If he asked for init it means he's not sure to be in a game and asked for it if auth is successfull.
    // We only allow one identification per second per socket.
    socket.on("myNameIs", (data) => {
      let kindOfTimer = 0;
      let token = undefined;
      if (typeof data === "object" && data.id !== undefined) {
        token = data.token;
        kindOfTimer = (data.init === true);
      }
      if(socket.alreadyCalled === undefined)
        socket.alreadyCalled = {0:Date.now()-1000,1:Date.now()-1000};
      csl.log('myNameIs', data, socket.alreadyCalled);
      // Identify the user with the provided token
      if (identify(socket, data.token)) {
        session_timer.refresh();
        if (socket.alreadyCalled[kindOfTimer] === undefined || (Date.now() - socket.alreadyCalled[kindOfTimer] > 1000)){
          csl.log('sendSuccess', "Auth correct");
          socket.emit('identifySuccessfull');
          socket.alreadyCalled[kindOfTimer] = Date.now();
          if(kindOfTimer === 1)
            socket.emit('askedForGame');
        }
      }
    });

    // Try to join if Auth
    socket.on("joinRoom", (data) => {
      if (socket.request.session.id) {
        joinRoom(socket, data);
      }
    });

    // Leaving a room is always a success to never block a player in a dead state.
    socket.on("leaveRoom", () => {
        leaveRoom(socket);
    });

    // Hello world, small easter egg :)
    socket.on("hello", () => {
      socket.emit("world", { responseData: "The world salute you :) " });
    });

    socket.on("disconnect", () => {
      // Log user disconnection
      csl.log(
        "socketio",
        "user disconnected n:" +
        socket.id +
        " | session : " +
        socket.request.session.id
      );
    });

    // Only take action event from user Auth
    socket.on("dispatch", (data) => {
      if (socket.request.session.userId) {
        // Dispatch action
        dispatch(socket, data);
      }
    });

    // Auth player create a quick game based on them.
    socket.on("createGame", () => {
      if (socket.request.session.userId) {
        // Create new game
        createGame(socket);
      }
    });

    // Auth player create a custom game.
    socket.on("createGameV2", (data) => {
      const receivedGameRoomId = data.gameRoomId;
      if (socket.request.session.userId) {
        // Create new game V2
        createGameV2(socket, receivedGameRoomId);
      }
    });

    // This event is actually a double event :
    //                                         -- Start the game for a master
    //                                         -- Join the game or spectate the game for other
    //
    socket.on("startGame", (data) => {
      // Start the game
      let room = undefined;
      if(data !== undefined)
        room = data.room;
      if(socket.request.session.userId){
        gameController.startGame(room, socket.request.session.userId);
        updateGameStatus(room);
      }
    });

    // Player want's to see his game. Called after a Auth.
    socket.on("showMyGame", () => {
      csl.log("showMyGame", "socketEvent received", socket.request.session.userId);
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
