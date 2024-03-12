const express = require('express');
const app = express();
const session = require("express-session");
const cors = require("cors");




/** Paramètres cors du serveur.
 * 
 * origin -> Fixer sur le front-end. Il n'y a que le serveur front end avec qui la communication est autoriser.
 *  */
const corsSettings = {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["my-custom-header", "Content-Type"],
    credentials: true
  }
app.use(cors(corsSettings))

const server = require('http').createServer(app);
app.use(express.json());
const db = require('./models/bdd')(app);
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
const port = 3001;


// router
// const router = require('./routes/apiroutes')(app,db);


/** Démarrage du serveur.
 * 
 */
server.listen(port, ()=> {
    console.log('Server is running on port ' + port);
});