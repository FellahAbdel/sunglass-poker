
const Room = require('./room');



module.exports = function(){
    const roomController = {
        createGame: (id,rules,players, verbose=true) => {
            if(verbose){
                console.log("Creation de la partie : " + id);
                console.log("Les règles : ");
                console.log(rules);
                console.log("Les joueurs: " + players);
            }
            set = {id,rules,players};
            const g = Room({...set});
            return g;
        }
    }
    return roomController;
}