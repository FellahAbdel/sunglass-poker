// Set up your Socket.io service here
import io from 'socket.io-client';
const socket = io("http://localhost:3001");

socket.emit('hello', 'Hello world');