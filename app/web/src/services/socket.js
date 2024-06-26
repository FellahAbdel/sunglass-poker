// Set up your Socket.io service here
import io from "socket.io-client";
import store from "../store/configureStore";
let vm = "https://mai-projet-integrateur.u-strasbg.fr/";
let target = "ws://localhost:3001";

// Create Socket.io instance
const socket = io(target, {
  withCredentials: true,
  path: target === vm ? "/vmProjetIntegrateurgrp9-1/socketio/" : "",
  // transports: ["polling"],
});

/** Fonction de test de communication entre le front et le back
 *
 * Le front envoie un Hello avec des données et le back le log
 *
 * Puis le back envoie des données et le front le log.
 *
 */
export const comm = {
  token: null,
  authenticated: false,
  preFun: function (init = false) {
    if (!this.authenticated) {
      this.token = sessionStorage.getItem("authToken");
      socket.emit("myNameIs", { token: this.token, init: init });
    }
  },

  Hello: function () {
    this.preFun();
    // console.log("Emit hello");
    socket.emit("hello", this.token);
  },

  getStatus: function (data) {
    // console.log("Getting status");
    // console.log(data);
  },

  Init: function () {
    this.preFun(true);
    this.Hello();
    socket.on("world", (data) => {
      // console.log(data);
    });
    socket.on("joinRoom", (data) => {
      // console.log("joinroom received : ", data);
      if (data === null || data === undefined) return;
      if (data.status === false) console.error(data.mes);
      if (data.status === true) {
        sessionStorage.setItem("room", data.payload.id);
      }
    });

    let leftReceived = false;

    socket.on("event", (data) => {
      // Logique pour traiter l'événement "LEFT"
      if (data.type === "LEFT_ROOM") {
        store.dispatch({ payload: data.payload, type: data.type });
        leftReceived = true;
      } else if (leftReceived && data.type === "REFRESH") {
        // Si un "REFRESH" est reçu après "LEFT", effectuer deux dispatches
        store.dispatch({ payload: data.payload, type: data.type });
        store.dispatch({ payload: "", type: "EMPTY_PAYLOAD" }); // Dispatch avec un payload vide
        leftReceived = false;
      } else {
        // Pour tous les autres types d'événements
        store.dispatch({ payload: data.payload, type: data.type });
      }
    });

    // socket.on("event", (data) => {
    //   // console.log("event receive (from server) [socket.js]: ", data);
    //   store.dispatch({ payload: data.payload, type: data.type });
    // });
    // socket.on("event", (data) => {
    //   const room = sessionStorage.getItem("room");
    //   if (room) {
    //     const state = store.getState().game.rooms[room];
    //     if (
    //       state &&
    //       state.players.find(
    //         (player) => player.id === socket.request.session.userId
    //       )
    //     ) {
    //       store.dispatch({ payload: data.payload, type: data.type });
    //     } else {
    //       // Le joueur a quitté la partie, gérer l'état initial du jeu
    //       // (Peut-être en réinitialisant l'état de l'interface utilisateur)
    //     }
    //   }
    // });

    // When the client receive the status of the room
    // we console log the data.
    socket.on("status", (data) => this.getStatus(data));

    // When the client receive an refresh event, we call the refresh function
    //
    socket.on("refresh", (data) => this.handleNewsRefresh(data));
    // He asked if he was in game to get the infos.
    socket.on("askedForGame", () => {
      socket.emit("showMyGame");
    });

    socket.on("identifySuccessfull", () => {
      this.authenticated = true;
      clearInterval(this.tryAuth);
      setTimeout(() => {
        clearInterval(this.tryAuth);
        this.authenticated = false;
        this.tryAuth = setInterval(() => {
          this.preFun(true);
        }, 1000);
      }, 5000);
    });
    clearInterval(this.tryAuth);
    this.tryAuth = setInterval(() => {
      this.authenticated = false;
      this.preFun(true);
    }, 1000);
  },

  status: function () {
    this.preFun();
    // console.log(
    //   "Call for status",
    //   sessionStorage.getItem("room"),
    //   sessionStorage.getItem("authToken")
    // );
    socket.emit("status", {
      room: sessionStorage.getItem("room"),
      id: sessionStorage.getItem("authToken"),
    });
  },

  handleNewsRefresh: function (data) {
    // console.log(
    //   "Receive news to refresh room",
    //   data,
    //   "   ",
    //   sessionStorage.getItem("room")
    // );

    if (sessionStorage.getItem("room")) {
      // console.log("refreshing room", sessionStorage.getItem("room"));
      this.status();
    } else {
    }
  },

  // Call for the game the player is playing right now
  refresh: function () {
    socket.emit("showMyGame");
  },

  leaveRoom: function () {
    this.preFun();
    // console.log("comm emit leaveRoom");
    socket.emit("leaveRoom");
  },

  joinRoom: function (id) {
    this.preFun();
    socket.emit("joinRoom", { id: id });
  },

  dispatch: function (data) {
    this.preFun();
    socket.emit("dispatch", data);
  },

  createGame: function () {
    this.preFun();
    // socket.emit('startGame',{room:sessionStorage.getItem('room')});
    socket.emit("createGame");
  },

  createGameV2: function (gameRoomId) {
    this.preFun();
    // socket.emit('startGame',{room:sessionStorage.getItem('room')});
    socket.emit("createGameV2", { gameRoomId: gameRoomId });
  },

  startGame: function (userId) {
    this.preFun();
    const roomId = sessionStorage.getItem("room");
    socket.emit("startGame", { room: roomId, userId: userId });
  },

  toggleAutoRestart: function(){
    socket.emit("autoRestartToggle");
  }
};
