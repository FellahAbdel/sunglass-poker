const jwt = require("jsonwebtoken");
const actions = require("../store/actions/actionTypes");
const actcrea = require("../store/actions/actionsCreator");
const store = require("../store/configStore");
const Player = require("../shared/Player");
const game = require("./game");
const csl = require("./intelligentLogging");
const hydra = require("./hydrateSpecifics");
// const session = require("express-session");
const fileType = "socket.io.js";
csl.silenced("broadcastStatus");
// Durée d'une session en millisecondes.
const SESSION_DURATION = 2 ** 31 - 1;

module.exports = function (
  server,
  Middleware,
  corsSettings,
  gameController,
  dao
) {
  const io = require("socket.io")(server, { cors: corsSettings });
  io.engine.use(Middleware);
  gameController.io = {
    broadcastStatus: function (room) {
      csl.log("broadcastStatus", "socket io broadcast to room", room);
      io.to(room).emit("refresh", { status: true });
    },
  };

  /**
   *
   * @param {object socket} socket
   * @param {{room:room id, id: player id}} data
   */

  function playerRoomStatus(socket, data) {
    csl.log(fileType, "Try for status");
    room = data.room;
    if (room === undefined || room === null) {
      csl.error(fileType, "Error in room number");
      return;
    }
    if (socket.request.session.userId === undefined) {
      csl.error(fileType, "Can't refresh status to player with undefined id");
      return;
    }
    id = socket.request.session.userId;
    const answer = gameController.status(room, id);
    csl.log(fileType, "status of ", id, " : =", answer);
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

  async function identify(socket, token) {
    csl.log(fileType, "User is himself with token ", token);
    if (token === null) {
      // csl.log(fileType,'Destroy socket for ', socket.id);
      // io.in(socket.request.session.id).disconnectSockets(true);
      // socket.request.session.destroy();
      // socket.disconnect();
    } else {
      csl.log(fileType, socket.rooms, socket.rooms.has(token));
      if (!socket.rooms.has(token)) {
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          // console.log("decoded : ", decoded);

          socket.request.session.save();
          csl.log(
            fileType,
            "Session id : ",
            socket.id,
            " join room session:",
            token
          );
          info = await dao.getUserInfo(decoded.id);
          if (info.success) {
            if (info.user) {
              socket.request.session.pseudo = info.user.pseudo;
            }
          }
          socket.request.session.userId = decoded.id;
          csl.log(
            "Session",
            "login out the session and pseudo of user",
            socket.request.session.pseudo,
            " id :",
            socket.request.session.userId
          );
          socket.join(token);
        } catch (err) {
          csl.error(fileType, "Error with token : ", err);
          socket.disconnect();
          csl.error(fileType, "Error with token : ", err);
          socket.disconnect();
        }
      }
    }
  }

  /**
   *
   * @param {socket}
   * @param {{id: roomId}} data
   *
   * socket.request.session.userId must be defined.
   */

  function joinRoom(socket, data) {
    // csl.log(fileType,"sessionHs:",session);
    // csl.log(fileType,'data:',data);
    // csl.log(fileType,'userId = ', socket.handshake.socket.request.session.userId);
    if (typeof data === "object" && data.id !== undefined) {
      answer = gameController.join(data.id, {
        id: socket.request.session.userId,
        pseudo: socket.request.session.pseudo,
      });
      if (answer.status === false) {
        socket.emit("joinRoom", answer);
      } else {
        room = data.id;
        csl.log("joinRoom", "join the socket room : ", room);
        socket.join(room);
        socket.emit("joinRoom", answer);
        csl.log(fileType, answer);
        const state = store.getState();
        // We send the new game state to the client store.
        sendEvent(
          socket,
          actcrea.sitted(
            state.game.rooms[data.id].game.pokerTable.communityCards,
            state.game.rooms[data.id].players
          )
        );
        io.to(room).emit("refresh");
        socket.request.session.userRoom = data.id;
        socket.request.session.save();
      }
    } else {
      csl.error(fileType, "User tried to join wrong room.");
      socket.emit("jointRoom", { status: failed, mes: "Invalid data" });
    }
    socket.request.session.save();
  }

  async function leaveRoom(socket) {
    csl.log(fileType, " receive leaveroom from player");
    const respons = await dao.getUserInfo(socket.request.session.userId);
    if (respons.success) {
      const user = respons.user;
      if (user.inGame !== null) {
        gameController.removePlayer(
          user.inGame.toString(),
          socket.request.session.userId
        );
        sendEvent(socket, actcrea.leftRoom());
      }
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
   *
   * @param {socket} socket
   * @param {{data:{action:{type: String, payload: any}, room:id}}} data
   */
  function dispatch(socket, data) {
    csl.log("dispatch", "dispatch recevied : ", data);
    var action = hydra(socket, data);
    csl.log(
      "DISPATCH SOCKET",
      "Action hydrated vs data received ",
      action,
      data
    );

    // switch (action.type) {
    //   case actions.BET:
    //     action = {
    //       ...action,
    //       payload: { ...action.payload, amount: data.action.payload.amount },
    //     };
    //     break;
    //   default:
    // }
    // si login
    if (action.payload.playerId) {
      if (action.subtype === actions.PLAYER_GAME_ACTION)
        gameController.playerAction(action);
      else gameController.dispatch(action.payload.playerId, action);
    }
  }

  /**
   *
   * @param {socket} socket
   * @returns
   */

  function createGame(socket) {
    csl.log(fileType, "createGame called (from socket.io.js)");
    // Handle the start game event
    // For example, you can start the game here
    csl.log(fileType, "createGame event received on the server");
    // Perform any necessary game initialization or logic here
    // We can dispatch an action to update the Redux state
    csl.log(fileType, "Who dispatch : ", socket.request.session.userId);

    const newGamePromise = new Promise((resolve) => {
      // Call the DAO function
      const id = gameController.newGame(socket.request.session.userId);

      // Resolve the promise once the DAO function completes
      resolve(id);
    });

    // Wait for the promise to resolve
    newGamePromise.then((id) => {
      csl.log(fileType, id, " >- id game created");
      if (id === undefined) {
        csl.error(fileType, "Refused to create new game");
        return;
      }
      // store.dispatch(actcrea.createGame(id));
      gameController.dispatch(
        socket.request.session.userId,
        actcrea.createGame(id)
      );
      csl.log(fileType, "store dispatch", store.getState());
      store.dispatch({ type: actions.GAME_LOBBY });

      // On récupère le nouvel état du store.
      state = store.getState();

      sendEvent(socket, actcrea.gameLobby(state.game.rooms[id]));
      const answer = joinRoom(socket, { id: id.toString() });
      csl.log(fileType, answer);
      socket.emit("joinRoom", answer);
    });

    // Si l'action vient de quelqu'un non connecter on ignore
  }

  function createGameV2(socket, receivedGameRoomId) {
    csl.log(fileType, "createGameV2 called (from socket.io.js)");
    csl.log(fileType, "createGameV2 event received on the server");
    csl.log(fileType, "Who dispatch : ", socket.request.session.userId);

    const userId = socket.request.session.userId;
    const result = gameController.newGameV2(userId, receivedGameRoomId);

    if (!result) {
      csl.error(fileType, "Refused to create new game");
      return;
    }

    gameController.dispatch(
      socket.request.session.userId,
      actcrea.createGame(receivedGameRoomId)
    );
    csl.log(fileType, "store dispatch", store.getState());
    store.dispatch({ type: actions.GAME_LOBBY });

    // On récupère le nouvel état du store.
    state = store.getState();

    sendEvent(socket, actcrea.gameLobby(state.game.rooms[receivedGameRoomId]));
    const answer = joinRoom(socket, { id: receivedGameRoomId.toString() });
    csl.log(fileType, answer);
    socket.emit("joinRoom", answer);
  }

  /** Lorsqu'une page est ouverte et se connecte au back.
   *
   *  On log la session et son Id.
   *
   *  La requête 'Hello' est une requête de test d'échange. On log la data et en renvoit. le front log aussi la data reçu.
   *
   *  En cas de déconnexion on log la session Id qui s'arrête.
   */
  io.on("connection", (socket) => {
    // On récupère la session lié à la connexion.
    session = socket.request.session;
    // On rejoint la session déjà existante.
    socket.join(socket.request.session.id);
    csl.log(
      fileType,
      "a user connected n: " +
        socket.id +
        " | session : " +
        socket.request.session.id,
      " userId : ",
      socket.request.session.userId
    );
    // Fixe un délais avec lequel la connexion est fermer.
    const session_timer = setInterval(() => {
      io.in(socket.request.session.id).disconnectSockets(true);
      socket.request.session.destroy();
    }, SESSION_DURATION);

    socket.on("status", (data) => {
      if (socket.request.session.userId) {
        csl.log(
          fileType,
          "giving status to player : ",
          socket.request.session.userId
        );
        playerRoomStatus(socket, data);
      } else {
        csl.log(fileType, "User not in session");
      }
    });

    // New socket session try to tell who is the user logged in with the token.
    // If token is valid add the socket to  the auth room to allow talk to session
    // otherwise close the room.
    socket.on("myNameIs", (token) => {
      identify(socket, token);
    });
    socket.on("joinRoom", (data) => {
      if (socket.request.session.id) {
        joinRoom(socket, data);
      }
    });
    socket.on("leaveRoom", () => {
      if (socket.request.session.id) {
        leaveRoom(socket, data);
      }
    });

    // Fonction test
    socket.on("hello", (data) => {
      session_timer.refresh();
      // csl.log(fileType,'Received from client : ' + socket.id + ' data :' + data + ' | session : ' + socket.request.session.id);
      socket.emit("world", { responseData: "The world salute you" });
    });

    // Si le client quitte
    socket.on("disconnect", () => {
      csl.log(
        fileType,
        "user disconnected n:" +
          socket.id +
          " | session : " +
          socket.request.session.id
      );
    });

    socket.on("dispatch", (data) => {
      if (socket.request.session.userId) {
        dispatch(socket, data);
      }
    });

    socket.on("createGame", () => {
      csl.log(
        fileType,
        "user try to createGame user : ",
        socket.request.session.userId
      );
      if (socket.request.session.userId) {
        createGame(socket);
      }
    });

    socket.on("createGameV2", (data) => {
      const receivedGameRoomId = data.gameRoomId;
      csl.log(
        fileType,
        "user try to createGame user : ",
        socket.request.session.userId
      );
      if (socket.request.session.userId) {
        createGameV2(socket, receivedGameRoomId);
      }
    });

    socket.on("startGame", (data) => {
      // console.log("Received startGame event with data:", data);
      const room = data.room;
      const userId = data.userId;
      gameController.startGame(room, userId);
    });

    socket.request.session.save();
  });

  return io;
};
