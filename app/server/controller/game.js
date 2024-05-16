const texasHoldem = require('./rules');
const Player = require("../shared/Player");
const actions = require('../store/actions/actionTypes');

/**
 * Initialize a game room
 * @param {string} id - The id of the game room
 * @param {Array<Player>} players - The players in the game room
 * @param {Object} rules - The rules of the game
 * @returns {Object} - The game room
 */
module.exports = initGameRoom = function (id,players = [],rules = texasHoldem) {
    return {
        id: id,
        state:undefined,
        players: players,
        rules:rules,
        refresh: undefined,
    }
}