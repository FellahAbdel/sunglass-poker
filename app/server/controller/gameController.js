const jwt = require("jsonwebtoken");
const { clearInterval } = require("timers");

module.exports = gameController = {
    io: null,
    hashRoom:function (id) {
        return id;
    },
    rooms:{2: {
        id:2,
        players:[],
        max:5,
        refresh:null,
        joinGame: function(userId){
            // console.log(this.players, typeof this.players);
            if(this.players !== undefined){
                if(this.players.length === 0){
                    this.players.push({id:userId,timeLastAnswer:Date.now()});
                    return {status: true, mes:'Join successfull', payloadRoom: {id:this.id,players:this.players,max:this.max}};
                }
                if(this.players.findIndex(player => player.id === userId) === -1 && this.players.length < this.max){
                    this.players.push({id:userId,timeLastAnswer:Date.now()});
                    return {status: true, mes:'Join successfull', payloadRoom: {id:this.id,players:this.players,max:this.max}};
                }
            }
            return  {status:false, mes:'Either the room is full or player already in'};
        }
    }},
    
    makeRefreshCall:function(room, reset = false){
        const hroom = this.hashRoom(room);
        if(this.rooms.hasOwnProperty(hroom)){
            if(this.rooms[hroom].refresh && !reset){
                console.error("RefreshCall already exist, reset set to false -> Action canceled");
                return;
            }else{
                if(this.rooms[hroom].refresh) clearInterval(this.rooms[hroom].refresh);
                this.rooms[hroom].refresh = setInterval((room)=>{
                    this.broadcastStatus(room);
                },1000);
            }
        }
        console.error("Can't create refreshCall for inexistant room, make sure it's NOT the hash that's passed",hroom);
    },

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
    removePlayer:function(room,id){
        const hroom = this.hashRoom(room);
        if(this.rooms.hasOwnProperty(hroom)){
            let index = -1;
            if((index = this.rooms[room].players.findIndex(player => player.id === id)) !== -1){
                console.log("Player : ", id, " removed from room : ", room);
                this.rooms[room].players.splice(index,1);
                return;
            } else console.error("Player ", id, " is not in the room");
        }else console.error("Not a room, can't kick player", room,"  -:> " ,id);
    },

    timeOutPlayer:3000,
    broadcastStatus:function (room){
        // Si la room existe
        if(this.io !== null){
            const hroom = this.hashRoom(room);
            console.log('gameController call for broadcast on ',room,' to io with hash :',hroom);
            if(this.rooms.hasOwnProperty(hroom)){
                const players = this.rooms[hroom].players;
                for(var i = 0; i<players.length;i++){
                    if(Date.now()-players[i].timeLastAnswer > this.timeOutPlayer){
                        this.removePlayer(room,players.id);
                    }
                }
                this.io.broadcastStatus(hroom);
            }else console.error("Room expired or does not exist");
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