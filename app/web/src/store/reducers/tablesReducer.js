
const defaultState = {
    // Initial state of game
    player:[] //ajouter ici lors de l'ajout a la table

  };


  const gameTableState = (state = defaultState, action) => {
    const { payload, type } = action
  
    switch (type) {

        case 'SIT':
            return {
                ...defaultState,
                player:{...player,payload}
            }
        case 'STAND_UP':
            return {
                ...defaultState,
                player:
            }
    }
}

export default tableReducer