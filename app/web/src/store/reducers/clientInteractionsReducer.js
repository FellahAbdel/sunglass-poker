import comm from "../../services/socket";
const actions =  require("../actions/clientInteractionsType.js");


const initialState = {
    gameStarted: false
}; 

const clientInteractionsReducer = (state = initialState, action) => {
    switch(action.type){
        case actions.GAME_STARTED:
        console.log("type : " , action.type) ;
            return {
                ...state,
                gameStarted: true
            };
        default:
            // console.log("from clientInterReducer => type : " , action.type) ;
            // comm.startGame();
            return state;
    }
}


export default clientInteractionsReducer;