const texasHoldem = require('./rules');
const Player = require("../shared/Player");
const actions = require('../store/actions/actionsCreator');

var incr = 10;
function getRandomid(){
    var a = incr;
    incr+=1;
    return a;
}


module.exports = createGame = function (players = [],rules = texasHoldem) {
    return {
        id: getRandomid(),
        state:undefined,
        players: players,
        rules:rules,
        refresh: undefined,
        joinGame: function (userId) {
            // console.log(this.players, typeof this.players);
            players = this.state.game.players;
            console.log(players);
            if (players !== undefined) {
                if (players.length === 0) {
                    this.state.game.players.push(new Player(userId,userId));
                    return { status: true, event:actions.sit(),mes: 'Join successfull', payloadRoom: { id: this.id, players: this.state.game.players, max: this.rules.max } };
                }
                if (players.findIndex(player => player.getPlayerId() === userId) === -1 && this.players.length < this.rules.max) {
                    this.state.game.players.push(new Player(userId,userId));
                    return { status: true, event:actions.sit(), mes: 'Join successfull', payloadRoom: { id: this.id, players: this.state.game.players, max: this.rules.max } };
                }
            }
            return { status: false, mes: 'Either the room is full or player already in' };
        }
    }
}