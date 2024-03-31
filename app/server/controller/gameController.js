const jwt = require("jsonwebtoken");

module.exports = gameController = {
    io: null,
    hashRoom:function (id) {
        return id;
    },
    rooms:{2: {
        id:2,
        players:[],
        max:5,
        joinGame: function(userId){
            // console.log(this.players, typeof this.players);
            if(this.players !== undefined){
                if(this.players.length === 0){
                    this.players.push(userId);
                    return {status: true, mes:'Join successfull', payloadRoom: {id:this.id,players:this.players,max:this.max}};
                }
                if(this.players.indexOf(userId) === -1 && this.players.length < this.max){
                    this.players.push(userId);
                    return {status: true, mes:'Join successfull', payloadRoom: {id:this.id,players:this.players,max:this.max}};
                }
            }
            return  {status:false, mes:'Either the room is full or player already in'};
        }
    }},
    join: function(id,user){
        if(this.rooms !== undefined){
            if(this.rooms.hasOwnProperty(id)){
                if(user === undefined){
                    return {status:false,mes:'User undefined'};
                }
                const answer = this.rooms[id].joinGame(user);
                if(answer.status){
                    this.broadcastStatus(id);
                    return answer;
                }
            }
        }
        return {status: false, mes:'No rooms'};
    },
    broadcastStatus:function (room){
        // Si la room existe
        if(this.io !== null){
            const hroom = this.hashRoom(room);
            console.log('gameController call for broadcast on ',room,' to io with hash :',hroom);
            this.io.broadcastStatus(hroom);
        }
    },
    status:function(room,id){
        console.log('Status room:',room, ' for : ',id);
        console.log(this.rooms,this.rooms.hasOwnProperty(room));
        console.log(this.rooms[room].players.gameControllerindexOf(id));
        if(this.rooms.hasOwnProperty(room)){
            if(this.rooms[room].players.indexOf(id) !== -1){
                return {status:true,mes:'Refreshing status',payload:this.rooms[room]};
            }
        }
        return {status:false,mes:"Can't refresh status", payload:[]};
    }


};