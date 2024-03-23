
const Game = require('./game');

module.exports = function(){
    const gameController = {
        createGame: (id,rules) => {
            console.log("Creation de la partie : " + id);
            console.log("Les règles : ");
            console.log(rules);
            const g = Game(id,rules);
            return g;
        }
    }
    return gameController;
}