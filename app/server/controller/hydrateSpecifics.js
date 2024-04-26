const actions = require('../store/actions/actionTypes');
const csl = require('./intelligentLogging');

module.exports = eventHydra = (socket, data) => {
    // action receive from the user data.
    const action = {...data.action}
    // action filtered that will be executed on the server
    var hydrated = {}
    // Informations of the user based on the socket
    const userId = socket.request.session.userId;
    const room = socket.request.session.userRoom;
    hydrated.payload = {
        playerId: userId,
        room: room,
    };

    //We check if the action the user try to performs is related to a game
    //If so we will dispatch the event through specifics game dispatcher
    //To performs end turn etc..
    if (action.type !== undefined)
        if (action.type in actions.PLAYER_GAME_ACTION_LIST)
            hydrated.subtype = actions.PLAYER_GAME_ACTION
    
    switch (action.type) {
        // If the user try to bet, we get the bet value and force it to be a valid int.
        case actions.BET:
            var amount = action.payload.amount
            if(typeof(amount) !== 'number')
                amount = 0
            amount = parseInt(amount)
            hydrated.payload = {...hydrated.payload,'amount':amount}
            break;
        default:
            csl.log('HYDRA','default action hydrated; In case of error make sure you add the correct case and hydrate the arguments with CORRECT verification for type and range.');
    }

    return {type:action.type,...hydrated };
};