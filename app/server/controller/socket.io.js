// Durée d'une session en millisecondes.
const SESSION_DURATION = 200 * 1e3;

module.exports = function(server,Middleware,corsSettings,gameController) {

    const io = require('socket.io')(server, {cors:corsSettings});
    io.engine.use(Middleware);

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
        console.log('a user connected n: '+socket.id + ' | session : '+session.id); 
        // Fixe un délais avec lequel la connexion est fermer.
        const session_timer = setInterval(() => {
            io.in(session.id).disconnectSockets(true);
            session.destroy();
        }, SESSION_DURATION);
        socket.on('joinRoom', (data) => {
            console.log("sessionHs:",session);
            console.log('data:',data);
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
                }
            }
            else{
                console.log('User tried to join wrong room.');
                socket.emit('jointRoom', {status:failed,mes:'Invalid data'});
            }
        });

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

    return io;
}