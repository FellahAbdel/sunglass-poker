// Durée d'une session en millisecondes.
const SESSION_DURATION = 2 * 1e3;

module.exports = function(server,Middleware,corsSettings) {

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


    return io;
}