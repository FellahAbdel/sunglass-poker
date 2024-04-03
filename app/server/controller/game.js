const texasHoldem = require('./rules');

var incr = 0;
function getRandomid(){
    var a = incr;
    incr+=1;
    return a;
}


module.exports = createGame = function (players = [],rules = texasHoldem) {
    return {
        id: getRandomid(),
        players: players,
        rules:rules,
        refresh: undefined,
        joinGame: function (userId) {
            // console.log(this.players, typeof this.players);
            if (this.players !== undefined) {
                if (this.players.length === 0) {
                    this.players.push({ id: userId, timeLastAnswer: Date.now() });
                    return { status: true, mes: 'Join successfull', payloadRoom: { id: this.id, players: this.players, max: this.rules.max } };
                }
                if (this.players.findIndex(player => player.id === userId) === -1 && this.players.length < this.rules.max) {
                    this.players.push({ id: userId, timeLastAnswer: Date.now() });
                    return { status: true, mes: 'Join successfull', payloadRoom: { id: this.id, players: this.players, max: this.rules.max } };
                }
            }
            return { status: false, mes: 'Either the room is full or player already in' };
        }
    }
}