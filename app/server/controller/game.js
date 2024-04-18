const texasHoldem = require('./rules');
const Player = require("../shared/Player");
const actions = require('../store/actions/actionTypes');

var incr = 0;
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
    }
}