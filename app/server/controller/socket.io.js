const jwt = require("jsonwebtoken");
const actions = require('../store/actions/actionTypes');
const actcrea = require('../store/actions/actionsCreator');
const store = require('../store/configStore');
const Player = require("../shared/Player");
const game = require("./game");
const csl = require('./intelligentLogging');
// const session = require("express-session");
const fileType = 'socket.io.js';

// Durée d'une session en millisecondes.
const SESSION_DURATION = 200 * 1e3;




module.exports = function (server, Middleware, corsSettings, gameController,dao) {

    const io = require('socket.io')(server, { cors: corsSettings });
    io.engine.use(Middleware);
    gameController.io = {
        broadcastStatus: function (room) {
            // csl.log(fileType,'socket io broadcast to room', room);
            io.to(room).emit('refresh', { status: true });
        },
    };


    /**
     * 
     * @param {object socket} socket 
     * @param {{room:room id, id: player id}} data 
     */

    function playerRoomStatus(socket, data) {
        csl.log(fileType, 'Try for status');
        try {
            room = data.room;
            if(room === undefined || room === null){
                csl.error(fileType, "Error in room number");
                return;
            }
            try {
                const decoded = jwt.verify(data.id, "secretKeyForSession");
                id = decoded.id;
                const answer = gameController.status(room, id);
                csl.log(fileType, 'status of ', id, ' : =', answer);
                io.to(data.id).emit('event', { payload: answer.payload, type: actions.REFRESH });
            } catch (err) {
                if (err.name === 'TokenExpiredError') {
                    csl.log(fileType, 'token expired for status');
                    socket.disconnect();
                }
            }
        } catch (err) {
            csl.log(fileType,' err => ' ,err);
        }
    }

    /**
     * 
     * @param {socket} socket 
     * @param {Token} token 
     */

    async function identify(socket, token) {
        // csl.log(fileType,'Sets rooms',socket.rooms);
        if (token === null) {
            // csl.log(fileType,'Destroy socket for ', socket.id);
            // io.in(session.id).disconnectSockets(true);
            // session.destroy();
            // socket.disconnect();
        } else {
            if (!socket.rooms.has(token)) {
                try {
                    const decoded = jwt.verify(token, "secretKeyForSession");
                    
                    session.save();
                    csl.log(fileType, "Session id : ", socket.id, " join room session:", token);
                    info = await dao.userInfo(token);
                    if(!info.error){
                        if(info.data.success){
                            session.pseudo = info.data.user.pseudo;
                        }
                    }
                    session.userId = decoded.id;
                    csl.log('Session','login out the session and pseudo of user', session.pseudo, ' id :', session.userId);
                    socket.join(token);
                }
                catch (err) {
                    if (err.name === 'TokenExpiredError') {
                        csl.log(fileType, 'token expired for status');
                        socket.disconnect();
                    }
                }
            }
        }

    }

    /**
     * 
     * @param {socket}
     * @param {{id: roomId}} data
     * 
     * session.userId must be defined. 
     */

    function joinRoom(socket,data) {
        // csl.log(fileType,"sessionHs:",session);
        // csl.log(fileType,'data:',data);
        // csl.log(fileType,'userId = ', socket.handshake.session.userId);
        if (typeof data === 'object' && data.id !== undefined) {
            answer = gameController.join(data.id, {id:session.userId,pseudo:session.pseudo});
            if (answer.status === false){
                socket.emit('joinRoom', answer);
            }
            else {
                roomHash = gameController.hashRoom(data.id);
                socket.join(roomHash);
                socket.emit('joinRoom', answer);
                csl.log(fileType, answer);
                sendEvent(socket,actcrea.sitted(gameController.rooms[data.id].game.pokerTable.communityCards,gameController.rooms[data.id].players));
                io.to(roomHash).emit('refresh');
                session.userRoom = data.id;
                session.save();
            }
        }
        else {
            csl.error(fileType, 'User tried to join wrong room.');
            socket.emit('jointRoom', { status: failed, mes: 'Invalid data' });
        }
        session.save();

    }


    /**
     * 
     * @param {socket} socket 
     * @param {{type:STRING?actionType, payload:{}}} action 
     */

    function sendEvent(socket,action){
        csl.log(fileType, 'send event to dispatch at user');
        socket.emit('event',action)
    }


    /**
     * 
     * @param {socket} socket 
     * @param {{action:{}, room:id}} data 
     */
    function dispatch(socket,data) {
        csl.log(fileType, 'dispatch recevied : ', data);
        const { action, room } = data;
        const userId = session.userId;
        // si login
        if (userId) {
            gameController.dispatch(userId, action, room);
        }
    }

    /**
     * 
     * @param {socket} socket 
     * @returns 
     */

    function createGame(socket) {
        csl.log(fileType, "createGame called (from socket.io.js)");
        // Handle the start game event
        // For example, you can start the game here
        csl.log(fileType, "createGame event received on the server");
        // Perform any necessary game initialization or logic here
        // We can dispatch an action to update the Redux state
        csl.log(fileType, 'Who dispatch : ', session.userId);
        // Si l'action vient de quelqu'un non connecter on ignore
        const id = gameController.newGame();
        csl.log(fileType, id, ' >- id game created');
        if (id === undefined) {
            csl.error(fileType, 'Refused to create new game');
            csl.log(fileType, 'Join instead');
            joinRoom(socket,{id:10});
            // store.dispatch(actcrea.sit(10, session.userId));
            // io.emit('event', { payload: state.game, type: actions.GAME_STARTED });
            // csl.log(fileType, 'rooms : ', gameController.rooms.state);
            // csl.log(fileType, 'la room gc:', gameController.rooms[10].game.players);
            return;
        }
        store.dispatch(actcrea.createGame(id));
        // gameController.dispatch(session.userId,actions.START_GAME);
        csl.log(fileType, 'store dispatch');
        csl.log(fileType, store.getState())
        store.dispatch({ type: actions.GAME_STARTED });
        state = store.getState();
        const an =joinRoom(socket,{id:id});
        csl.log(fileType, an);
        socket.emit('joinRoom', an);
        socket.emit('event', { payload: state.game, type: actions.GAME_STARTED });
    }


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
        session = socket.request.session;
        // On rejoint la session déjà existante.
        socket.join(session.id);
        csl.log(fileType, 'a user connected n: ' + socket.id + ' | session : ' + session.id);
        // Fixe un délais avec lequel la connexion est fermer.
        const session_timer = setInterval(() => {
            io.in(session.id).disconnectSockets(true);
            session.destroy();
        }, SESSION_DURATION);

        socket.on('status', (data) => {if(session.userId) playerRoomStatus(socket,data) });

        // New socket session try to tell who is the user logged in with the token.
        // If token is valid add the socket to  the auth room to allow talk to session
        // otherwise close the room.
        socket.on('myNameIs', (token) => { identify(socket,token) })
        socket.on('joinRoom', (data) => { if(session.id) joinRoom(socket,data) });

        // Fonction test
        socket.on('hello', (data) => {
            session_timer.refresh();
            // csl.log(fileType,'Received from client : ' + socket.id + ' data :' + data + ' | session : ' + session.id);
            socket.emit('world', { responseData: 'The world salute you' });
        });

        // Si le client quitte
        socket.on('disconnect', () => {
            csl.log(fileType, 'user disconnected n:' + socket.id + ' | session : ' + session.id);
        });

        socket.on('dispatch', (data) => {if(session.userId) dispatch(socket,data) })

        socket.on('createGame', () => {if(session.userId) createGame(socket) });

        session.save();
    });

    return io;
}