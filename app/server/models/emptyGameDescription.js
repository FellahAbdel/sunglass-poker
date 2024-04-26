const gameDescriptionModel = require("./GameDescription");

async function empty() {
    await gameDescriptionModel.deleteMany({});
    console.log("GamesDescription emptied.");
}

module.exports = empty;