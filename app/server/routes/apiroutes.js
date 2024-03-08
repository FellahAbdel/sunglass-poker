const express = require('express');
const app = express();
const server = require('http').createServer(app);

/** Paramètres cors du serveur.
 * 
 * origin -> Fixer sur le front-end. Il n'y a que le serveur front end avec qui la communication est autoriser.
 *  */
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
      }
});

// Port du server
const port = 3001;

// Requête vide on n'envoit rien.
app.get('/', (req, res) => {
    res.send('');
});


/** Lorsqu'une page est ouverte et se connecte au back.
 * 
 *  On log la session et son Id.
 * 
 *  La requête 'Hello' est une requête de test d'échange. On log la data et en renvoit. le front log aussi la data reçu.
 * 
 *  En cas de déconnexion on log la session Id qui s'arrête.
 */
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


/** Démarrage du serveur.
 * 
 */
server.listen(port, ()=> {
    console.log('Server is running on port ' + port);
});