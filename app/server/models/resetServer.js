const gameDescriptionModel = require("./GameDescription");
const UserModel = require('./User');
/**
 * These function are there to ensure that a restart of server does not 
 * continue with invalid elements lost in memory.
 */


/**
 * Remove all the gameDescription from the database.
 */
async function emptyGameDesc() {
    await gameDescriptionModel.deleteMany({});
    console.log("GamesDescription emptied.");
}


/**
 * Reset the status inGame of all  the players.
 */
async function resetPlayerInGame(){
    await UserModel.updateMany({}, { $set: { inGame: null } });
    console.log('User inGame status reset');
}

module.exports = {emptyGameDesc,resetPlayerInGame};