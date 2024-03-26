const express = require('express');
const app = express();
const session = require("express-session");
const cors = require("cors");
const ENV_CONST_COMM = require('./controller/envConstants')();
const gameController = require('./controller/roomController')();
console.log(ENV_CONST_COMM);


A = gameController.createGame('mon id', {type:'normal',bid:2});
B = gameController.createGame('autre id', {type:'special',bid:20});
console.log(A);
console.log(B);
console.log(A.isPlaying(1))
console.log(B.isPlaying(0))
/** Paramètres cors du serveur.
 * 
 * origin -> Fixer sur le front-end. Il n'y a que le serveur front end avec qui la communication est autoriser.
 *  */
const corsSettings = {
    origin: "http://localhost:"+ENV_CONST_COMM.ENV_PORT_WEB,
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["my-custom-header", "Content-Type", "Authorization"],
    credentials: true
  }
app.use(cors(corsSettings))

const server = require('http').createServer(app);
app.use(express.json());
const db = require('./models/bdd')(app,ENV_CONST_COMM.ENV_IP_BDD+':'+ENV_CONST_COMM.ENV_PORT_BDD);
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

// socketIo
const io = require('./controller/socket.io')(server,Middleware,corsSettings);

// Port du server
const port = ENV_CONST_COMM.ENV_PORT_SERVER;


// router
// const router = require('./routes/apiroutes')(app,db);


/** Démarrage du serveur.
 * 
 */
server.listen(port, ()=> {
    console.log('Server is running on port ' + port);
});