const jwt = require("jsonwebtoken");

// Durée d'une session en millisecondes.
const SESSION_DURATION = 200 * 1e3;




module.exports = function(server,Middleware,corsSettings,gameController) {

    const io = require('socket.io')(server, {cors:corsSettings});
    io.engine.use(Middleware);
    gameController.io = {
        broadcastStatus: function(room){
            console.log('socket io broadcast to room', room);
            io.to(room).emit('refresh',{status:true});
        },
    
    };

    
    /** Lorsqu'une page est ouverte et se connecte au back.
     * 
     *  On log la session et son Id.
     * 
     *  La requête 'Hello' est une requête de test d'échange. On log la data et en renvoit. le front log aussi la data reçu.
     * 
     *  En cas de déconnexion on log la session Id qui s'arrête.
     */
    io.on('connection', (socket) => {
        socket.on('startGame', () => {
            console.log("startGame called (from socket.io.js)");
              // Handle the start game event
            // For example, you can start the game here
            console.log("startGame event received on the server");

            // Perform any necessary game initialization or logic here
         
            
            // We can dispatch an action to update the Redux state
            store.dispatch({ type: "GAME_STARTED" });
        });   

                // Server-side logic
        socket.on("startGame", () => {
          // Dispatch an action to update the Redux state
        });

        // On récupère la session lié à la connexion.
        session = socket.request.session;
        // On rejoint la session déjà existante.
        socket.join(session.id);
        console.log('a user connected n: '+socket.id + ' | session : '+session.id); 
        // Fixe un délais avec lequel la connexion est fermer.
        const session_timer = setInterval(() => {
            io.in(session.id).disconnectSockets(true);
            session.destroy();
        }, SESSION_DURATION);

        socket.on('status', (data) => {
            console.log('Try for status');
            try{
                room= data.room;
                try{
                    const decoded = jwt.verify(data.id, "secretKeyForSession");
                    id = decoded.id;
                    const answer = gameController.status(room,id);
                    console.log('status of ', id, ' : =', answer);
                    io.to(data.id).emit('status', answer);
                }catch(err){
                    if(err.name==='TokenExpiredError'){
                        console.log('token expired for status');
                        socket.disconnect();
                    }
                }
            }catch(err){
                console.log(err);
            }
        })

        // New socket session try to tell who is the user logged in with the token.
        // If token is valid add the socket to  the auth room to allow talk to session
        // otherwise close the room.
        socket.on('myNameIs',(token) => {
            // console.log('Sets rooms',socket.rooms);
            if(token===null){
                console.log('Destroy socket for ', socket.id);
                io.in(session.id).disconnectSockets(true);
                session.destroy();
                socket.disconnect();
            }else{
                if(!socket.rooms.has(token)){
                    try{
                        const decoded = jwt.verify(token, "secretKeyForSession");
                        session.userId = decoded.id;
                        session.save(); 
                        console.log("Session id : ", socket.id," join room session:", token);
                        socket.join(token);
                    }
                    catch(err){
                        if(err.name==='TokenExpiredError'){
                            console.log('token expired for status');
                            socket.disconnect();
                        }
                    }
                }
            }
        })
        socket.on('joinRoom', (data) => {
            // console.log("sessionHs:",session);
            // console.log('data:',data);
            // console.log('userId = ', socket.handshake.session.userId);
            if(typeof data === 'object' && data.id !== undefined){
                answer = gameController.join(data.id,session.userId);
                if(answer.status === false)
                    socket.emit('joinRoom',answer);
                else{
                    roomHash = gameController.hashRoom(data.id);
                    socket.join(roomHash);
                    socket.emit('joinRoom',answer);
                    socket.to(roomHash).emit('newPlayer',answer);
                    session.userRoom = data.id;
                    session.save();
                }
            }
            else{
                console.log('User tried to join wrong room.');
                socket.emit('jointRoom', {status:failed,mes:'Invalid data'});
            }
            session.timeJoinRoomCalled = (session.timeJoinRoomCalled  || 0) +1;
            console.log(session.timeJoinRoomCalled);
            session.save();
        });

        // Fonction test
        socket.on('hello', (data) => {
            session_timer.refresh();
            // console.log('Received from client : ' + socket.id + ' data :' + data + ' | session : ' + session.id);
            socket.emit('world', {responseData:'The world salute you'});
        });

        // Si le client quitte
        socket.on('disconnect',() => {
            console.log('user disconnected n:' + socket.id + ' | session : ' + session.id);
        });

        
    
        session.save();
    });

    return io;
}