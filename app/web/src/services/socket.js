// Set up your Socket.io service here
import io from "socket.io-client";

const socket = io("http://localhost:3001", {
  withCredentials: true,
});

/** Fonction de test de communication entre le front et le back
 *
 * Le front envoie un Hello avec des données et le back le log
 *
 * Puis le back envoie des données et le front le log.
 *
 */
const comm = {
  Hello: () => {
    console.log("Emit hello");
    socket.emit("hello", "Hello world");
  },

  Init: () => {
    console.log("Init of socketio client side");
    this.Hello();
    socket.on("world", (data) => {
      console.log(data);
    });
  },
};

export default comm;
