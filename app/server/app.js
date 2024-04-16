const express = require('express');
const app = express();
const session = require("express-session");
const cors = require("cors");
const ENV_CONST_COMM = require('./controller/envConstants')();
// const gameController = require('./controller/gameController');
// gameController.init();
const MemoryStore = require('memorystore')(session)
// const console = require('./controller/intelligentLogging');
console.outLocaly = true;

gameController = 1

console.log('app',ENV_CONST_COMM);
/**
 * Settings for output in the console.
 * 
 * 
 */
// const logsocket = 'socket.io.js';
// const loggameController = 'gameController';
// const loggameReducer = 'gameReducer';
// console.silenced(logsocket)


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

app.use(express.json());

const myStore = new MemoryStore({
    checkPeriod: 3000 // prune expired entries every 24h
 });
/** Paramètres de session
 * 
 * 
*/
const Middleware = session({
    secret:'secretKeyForSession',
    name:'SunglassPokerSession',
    credentials:'include',
    secure:true,
    resave: true,
    proxy:true,
    store:myStore,
    saveUninitialized: true,
    cookie: {
        httpOnly:false,
        secure:true,
        maxAge: 1e5, // 10 seconds
        sameSite:'none',
    },
});
app.use(Middleware);

const db = require('./models/bdd')(app,ENV_CONST_COMM.ENV_IP_BDD+':'+ENV_CONST_COMM.ENV_PORT_BDD);

const server = require('http').createServer(app);

// socketIo
const io = require('./controller/socket.io')(server,Middleware,corsSettings,gameController,db);

io.engine.use(Middleware);
// Port du server
const port = ENV_CONST_COMM.ENV_PORT_SERVER;


// router
const router = require('./routes/apiroutes')(app,db);


/** Démarrage du serveur.
 * 
 */
server.listen(port, ()=> {
    console.log('Server is running on port ' + port);
});