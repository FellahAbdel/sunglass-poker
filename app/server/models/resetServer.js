const gameDescriptionModel = require("./GameDescription");
const UserModel = require('./User');

async function emptyGameDesc() {
    // await gameDescriptionModel.deleteMany({});
    console.log("GamesDescription emptied.");
}

async function resetPlayerInGame(){
    await UserModel.updateMany({}, { $set: { inGame: null } });
    console.log('User inGame status reset');
}

module.exports = {emptyGameDesc,resetPlayerInGame};