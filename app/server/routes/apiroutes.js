const express = require('express');
const app = express();
const session = require("express-session");
const server = require('http').createServer(app);
const cors = require("cors");


// Durée d'une session en seconde.
const SESSION_DURATION = 2 * 1e3;


/** Paramètres cors du serveur.
 * 
 * origin -> Fixer sur le front-end. Il n'y a que le serveur front end avec qui la communication est autoriser.
 *  */
const corsSettings = {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
const io = require('socket.io')(server, {cors:corsSettings});
app.use(cors(corsSettings))

/** Paramètres de session
 * 
 * 
 */
const Middleware = session({
    secret:'secretKeyForSession',
    cookie: {
        secure:false,
        maxAge: 1e7 // 10 seconds
    },
    resave: false,
    saveUninitialized: true
});

app.use(Middleware);
io.engine.use(Middleware);

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
    // On récupère la session lié à la connexion.
    const session = socket.request.session;
    // On rejoint la session déjà existante.
    socket.join(session.id);
    console.log('a user connected n: '+socket.id + ' | session : '+session.id); 
    // Fixe un délais avec lequel la connexion est fermer.
    const session_timer = setInterval(() => {
        io.in(session.id).disconnectSockets(true);
        session.destroy();
    }, SESSION_DURATION);

    // Fonction test
    socket.on('hello', (data) => {
        session_timer.refresh();
        console.log('Received from client : ' + socket.id + ' data :' + data + ' | session : ' + session.id);
        socket.emit('world', {responseData:'The world salute you'});
    });

    // Si le client quitte
    socket.on('disconnect',() => {
        console.log('user disconnected n:' + socket.id + ' | session : ' + session.id);
    });


    session.save();
});


/** Démarrage du serveur.
 * 
 */
server.listen(port, ()=> {
    console.log('Server is running on port ' + port);
});