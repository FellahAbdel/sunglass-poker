// Set up your Socket.io service here
import io from "socket.io-client";
import store from "../store/configureStore";
let vm = "https://mai-projet-integrateur.u-strasbg.fr/";
let target = "http://localhost:3001";

// Create Socket.io instance
const socket = io(target, {
  withCredentials: true,
  path: target === vm ? "/vmProjetIntegrateurgrp9-1/socketio/" : "",
  transports: ["polling"],
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

  preFun: function () {
    this.token = sessionStorage.getItem("authToken");
    // console.log("(fellahClient) Token is ", this.token);
    socket.emit("myNameIs", this.token);
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
    this.preFun();
    // console.log("Init of socketio client side");
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

    socket.on("event", (data) => {
      // console.log("event receive (from server) [socket.js]: ", data);
      store.dispatch({ payload: data.payload, type: data.type });
    });

    // When the client receive the status of the room
    // we console log the data.
    socket.on("status", (data) => this.getStatus(data));

    // When the client receive an refresh event, we call the refresh function
    //
    socket.on("refresh", (data) => this.handleNewsRefresh(data));
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
      console.log("No room no status");
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
    console.log("joining room id", id);
  },

  dispatch: function (data) {
    console.log("dispatch of socket");
    this.preFun();
    console.log("Event dispatch (socket.js - fellah) : ", data);
    socket.emit("dispatch", data);
  },

  createGame: function () {
    this.preFun();
    // socket.emit('startGame',{room:sessionStorage.getItem('room')});
    console.log("Emit startGame from comm");
    socket.emit("createGame");
  },

  createGameV2: function (gameRoomId) {
    this.preFun();
    // socket.emit('startGame',{room:sessionStorage.getItem('room')});
    console.log("Emit startGame from comm");
    socket.emit("createGameV2", { gameRoomId: gameRoomId });
  },

  startGame: function (userId) {
    this.preFun();
    const roomId = sessionStorage.getItem("room");
    console.log("Emitting startGame with room and userId:", roomId, userId);
    socket.emit("startGame", { room: roomId, userId: userId });
  },
};
