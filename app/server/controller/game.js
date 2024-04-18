const texasHoldem = require('./rules');
const Player = require("../shared/Player");
const actions = require('../store/actions/actionTypes');

module.exports = initGameRoom = function (id,players = [],rules = texasHoldem) {
    return {
        id: id,
        state:undefined,
        players: players,
        rules:rules,
        refresh: undefined,
    }
}