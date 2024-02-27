const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
      }
});
const port = 3001; // Port du server

app.get('/', (req, res) => {
    res.send('');
});

io.on('connection', (socket) => {
    console.log('a user connected n:'+socket.id); 
    socket.on('hello', (data) => {
        console.log('Received from client : ' + socket.id + ' data :' + data);
        socket.emit('world', {responseData:'The world salute you'});
    });
    socket.on('disconnect',() => {
        console.log('user disconnected n:' + socket.id);
    });
});


server.listen(port, ()=> {
    console.log('Server is running on port ' + port);
});