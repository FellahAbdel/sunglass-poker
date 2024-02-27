const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = 3001; // Port du server
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Autorise les requêtes depuis n'importe quel domaine
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

app.get('/', (req, res) => {
    res.send('');
});

io.on('connection', (socket) => {
    console.log('a user connected'); 
    // io.on('hello', (data) => {
    //     console.log('Received from client : ', data);
    //     socket.emit('world', {responseData:'The world salute you'});
    // });
});


server.listen(port, ()=> {
    console.log('Server is running');
});