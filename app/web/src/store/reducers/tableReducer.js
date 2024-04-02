

const initialState = {
    table: {
      deck: {},
      cards: [],
      chips: 0,
      stake: 0,
    },
    players: [],
  };


const tableReducer = (state = initialState, action) => {
    switch(action.type) {
        default:
            console.log("Table reducer called");
            return state;
    }
}

export default tableReducer;