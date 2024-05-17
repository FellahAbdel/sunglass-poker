// Importing necessary modules
const actions = require('../store/actions/actionTypes'); // Importing action types
const csl = require('./intelligentLogging'); // Importing intelligent logging module

// Exporting eventHydra function
module.exports = eventHydra = (socket, data) => {
    // Action received from the user data.
    const action = {...data.action};
    
    // Action filtered that will be executed on the server
    var hydrated = {};
    
    // Information of the user based on the socket
    const userId = socket.request.session.userId; // User ID from socket session
    const room = socket.request.session.userRoom; // Room ID from socket session
    
    // Hydrating the action payload with user and room information
    hydrated.payload = {
        playerId: userId,
        room: room,
        ...action.payload
    };

    // We check if the action the user tries to perform is related to a game.
    // If so, we will dispatch the event through specific game dispatchers to perform actions like end turn, etc.
    console.log('Action received in hydra ->', action);
    if (action.type !== undefined) {
        if (actions.PLAYER_GAME_ACTION_LIST.findIndex(e => e == action.type) !== -1) {
            hydrated.subtype = actions.PLAYER_GAME_ACTION;
        } else {
            hydrated.subtype = actions.USER_GENERIC_ACTION;
        }
    }
    
    // Switch statement to handle specific action types
    switch (action.type) {
        // If the user tries to bet, we get the bet value and force it to be a valid int.
        case actions.BET:
            var amount = action.payload.amount;
            if (typeof(amount) !== 'number') {
                amount = 0;
            }
            amount = parseInt(amount);
            hydrated = {subtype: hydrated.subtype, payload: {...hydrated.payload}, 'amount': amount};
            break;
        default:
            // Logging default action hydration
            csl.log('HYDRA', 'Default action hydrated; In case of error, make sure you add the correct case and hydrate the arguments with CORRECT verification for type and range.');
    }

    // Returning the hydrated action
    return {type: action.type, ...hydrated};
};
