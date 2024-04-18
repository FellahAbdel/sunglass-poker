const gameDescriptionModel = require("./GameDescription");

async function empty() {
    //await ItemModel.deleteMany({});
    await gameDescriptionModel.deleteMany({});
    console.log("GamesDescription emptied.");
}

module.exports = empty;