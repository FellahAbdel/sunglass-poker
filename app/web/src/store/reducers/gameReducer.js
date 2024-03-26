
const defaultState = {
  gameStarted: false,
  player : [], // List of user objects with ids and cards in one gameTable
  pot : 0,
  pot2: 0,
  turn : 0, // index of players table to tell which users turn 
  timer:0
    // TODO : More states can be added
  
}
const gameState = (state = defaultState, action) => {
  const { payload, type } = action

  switch (type) {

    case 'GET_DECK':
      return {
        ...defaultState,
        deck: payload // Payload suffled deck
      }
    case 'DEAL_CARDS':
      return {
        ...defaultState,
        player : payload,
        gameStarted: true
        // TODO : Back end needs to map all playerStates and give each player to card 
      }
      
    case 'RAISE':
      let newTurnRaise = state.turn === players.length - 1 ? 0 : state.turn+1 
      return {
        ...defaultState,
        pot: pot + payload, // Payload = money chiped in 
        turn: players[newTurnRaise].id
      }

    case 'CHECK':
      let newTurnCheck = state.turn === players.length - 1 ? 0 : state.turn+1
      return {
        ...defaultState,
        turn: players[newTurnCheck].id
      }
  }
}

export default gameReducer