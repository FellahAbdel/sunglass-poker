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
const fileType = "gameController";
csl.silenced("Status");
csl.silenced("refreshCall");

const log_refresh = false;
const log_broadcast = false;

module.exports = gameController = {
  io: null,
  dao: null,
  refresh: {},
  init: function (dao) {
    this.dao = dao;
  },

  makeRefreshCall: function (room) {
    const state = store.getState();
    if (state.game.rooms.hasOwnProperty(room)) {
      if (this.refresh[room]) {
        csl.log(
          "refreshCall",
          "Refresh already in place, automatically removed before being replaced."
        );
        clearInterval(this.refresh[room]);
      }
      this.refresh[room] = setInterval(
        (room, gc) => {
          csl.log("refreshCall", "Refresh for room : ", room);
          gc.broadcastStatus(room);
        },
        2000,
        room,
        this
      );
      csl.log("refreshCall", "Refresh setup");
    }
  },

  join: function (id, user) {
    csl.log(fileType, this);
    var state = store.getState();
    if (state.game.rooms !== undefined) {
      if (state.game.rooms.hasOwnProperty(id)) {
        csl.log(fileType, "User to add : ", user);
        if (user === undefined) {
          return { status: false, mes: "User undefined" };
        }
        const answer = this.dispatch(user, actions.sit(id, user));
        state = store.getState();
        csl.log(fileType, "answer of dispatch : ", answer);
        if (answer.status) {
          this.dao.addOnePlayerGameDesc(id, user.id);
          csl.log(fileType, state.game.rooms[id].state);
          csl.log(fileType, "New player, try to set refresh");
          this.makeRefreshCall(id, false);
          csl.log(fileType, "Join call for broadcast ", answer);
          if (state.game.rooms[id].players.length >= 2)
            if (this.dispatch(user, actions.startGame(id)))
              answer.start_game = true;
          this.broadcastStatus(id);
        }
        return answer;
      }
    }
    return { status: false, mes: "No rooms" };
  },

  deleteroom: function (room) {
    var state = store.getState();
    csl.log("deleteRoom", "Trying to deleteroom", room);
    if (state.game.rooms.hasOwnProperty(room)) {
      const players = state.game.rooms[room].players;
      console.log(players);
      if (players.length === 0) {
        // Si la salle est vide, supprimez-la
        this.dispatch(0, actions.deleteRoom(room));
        this.dao.removeGameDesc(room);
        console.log("Room", room, "has been deleted because it is empty.");
      } else {
        console.error(
          "Room",
          room,
          "is not empty",
          players.length,
          " cannot delete."
        );
      }
    } else {
      console.error("Room", room, "does not exist, cannot delete.");
    }
  },

  removePlayer: function (room, id) {
    reponse = this.dispatch(id, actions.leaveRoom(room, id));
    csl.log("removePlayer", "reponse : ", reponse);
    if (reponse.status) {
      this.dao.playerLeftGame(id);
      if (reponse.payload.restant === 0) {
        this.deleteroom(room);
      }
    }
  },

  timeOutPlayer: 3e10,
  broadcastStatus: function (room) {
    const state = store.getState();
    // Si la room existe
    if (this.io !== null) {
      if (!state.game.rooms.hasOwnProperty(room)) {
        if (log_broadcast)
          csl.error("refreshCall", "Room expired or does not exist");
        return;
      }
      const players = state.game.rooms[room].players;
      if (log_broadcast)
        csl.log(
          "refreshCall",
          "gameController call for broadcast on ",
          room,
          " to io with hash :",
          room
        );
      if (players.length == 0) {
        if (log_broadcast)
          csl.log(
            fileType,
            "No player in room, refreshcall will be remove if set."
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
      this.io.broadcastStatus(room);
    } else if (log_broadcast) csl.error(fileType, "No io to broadcast");
  },

  status: function (room, id) {
    const state = store.getState();
    csl.log("Status", "Status room:", room, " for : ", id);
    // csl.log(fileType,this.state.game.rooms, this.state.game.rooms.hasOwnProperty(room));
    if (state.game.rooms[room] !== undefined) {
      toSendroom = {};
      toSendroom.game = state.game.rooms[room].game.getForPlayer(id);
      toSendroom.players = state.game.rooms[room].players.map(player => player.statusFor(id));
      toSendroom.controlsMode = state.game.rooms[room].controlsMode
      csl.log('STATUS',state.game.rooms[room],toSendroom);
      // if (state.game.rooms[room].players.findIndex(player => player.getPlayerId() === id) !== -1) {
      return {
        status: true,
        mes: "Refreshing status",
        payload:toSendroom,
      };
      // }
    }
    return { status: false, mes: "Can't refresh status", payload: [] };
  },

  newGame: async function (userId) {
    const state = store.getState();
    if (userId === undefined) {
      csl.error(fileType, "player MUST be defined for newGame");
      return;
    }
    csl.log(fileType, "Create new game inside gameController");
    const respons = await this.dao.createGameDescription(userId, "", "", 0);
    csl.log(fileType, "respons : ", respons);
    if (respons.error) {
      csl.error(fileType, "Couln't create gamedescription", gameDescr.error);
      return;
    }
    const gameDescr = respons.data;
    const room = gameDescr._id;
    console.log("avant le init", state.game.rooms);
    state.game.rooms[room] = initGameRoom(room);
    console.log("après le init", state.game.rooms);
    this.dispatch(userId, actions.createGame(room));
    this.join(room, userId);
    await this.dao.updateUserData("_id", userId, "inGame", room);
    return room;
  },

  playerAction: function(action){
    csl.log('PLAYER_ACTION','Player is affecting the game : ',action);
    this.dispatch(action.payload.playerId,action);
    this.broadcastStatus(action.payload.room);
  },

  /**
   *
   * @param {id user} user
   * @param {actions} action
   * @returns  {{status:boolean,mes:string, payload:{}}}
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

  startGame: function (room, userId) {
    // Logique pour démarrer le jeu
    console.log("Starting game in room:", room, "requested by player:", userId );
    const state = store.getState();
    if (state.game.rooms.hasOwnProperty(room)) {
      store.dispatch(actions.startGame(room, userId));
    } else {
      console.error("Room does not exist:", room);
    }
  },
};
