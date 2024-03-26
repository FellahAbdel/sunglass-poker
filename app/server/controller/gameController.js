module.exports = gameController = {
    hashRoom:function (id) {
        return id;
    },
    rooms:{2: {
        players:[],
        max:5,
        joinGame: function(userId){
            console.log(this.players);
            if(this.players !== undefined){
                if(this.players.length === 0){
                    this.players.push(userId);
                    return {status: true, mes:'Join successfull', payloadRoom: {players:this.players,max:this.max}};
                }
                if(true){//this.players.findIndex(userId) === -1 && this.players.length < this.max){
                    this.players.push(userId);
                    return {status: true, mes:'Join successfull', payloadRoom: {players:this.players,max:this.max}};
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
                return this.rooms[id].joinGame(user);
            }
        }
        return {status: false, mes:'No such room'};
    },


};