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
    token:null,

    preFun: function() {
        this.token = sessionStorage.getItem('authToken');
        socket.emit('myNameIs',this.token);
    },
    
    Hello: function() {
        this.preFun();
        console.log("Emit hello");
        socket.emit('hello', this.token);
    },

    getStatus:function(data) {
        console.log('Getting status');
        console.log(data);
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
            if(data.status===true){
                sessionStorage.setItem('room',data.payloadRoom.id);
            }
            console.log(data);
        })

        socket.on('status', (data) => this.getStatus(data));

        socket.on('refresh', (data) => this.refresh(data));
    },

    status: function(){
        console.log('Call for status',sessionStorage.getItem('room'),sessionStorage.getItem('authToken'));
        socket.emit('status',{
            room:sessionStorage.getItem('room'),
            id: sessionStorage.getItem('authToken'),
        });
    },

    refresh: function(data){
        console.log('Receive news to refresh room',data);
        this.status();
    },

    joinRoom: function(id){
        this.preFun();
        socket.emit('joinRoom',{id:id});
        console.log('joining room id',id);
    }
}

export default comm;