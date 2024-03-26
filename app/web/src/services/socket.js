// Set up your Socket.io service here
import io from 'socket.io-client';


const socket =  io("http://localhost:3001", {
    withCredentials: true
});

/** Fonction de test de communication entre le front et le back
 * 
 * Le front envoie un Hello avec des données et le back le log
 * 
 * Puis le back envoie des données et le front le log.
 * 
 */
const comm = {
    
    Hello: function() {
        console.log("Emit hello");
        socket.emit('hello', 'Hello world');
    },
    
    Init: function() { 
        console.log("Init of socketio client side");
        this.Hello();
        socket.on('world', (data) => {
            console.log(data);
        });

        socket.on('joinRoom', (data) => {
            if(data.status === false)
                console.error(data.mes);
            console.log(data);
        })
    },

    joinRoom: function(id){
        socket.emit('joinRoom',{id:id});
        console.log('joining room id');
    }
}

export default comm;