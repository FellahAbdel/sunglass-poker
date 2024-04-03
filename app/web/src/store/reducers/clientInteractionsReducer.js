import comm from "../../services/socket";
import *  as actions from "../actions/clientInteractionsType.js";


const initialState = {
    gameStarted: false
}; 

console.log(actions)
const clientInteractionsReducer = (state = initialState, action) => {
    switch(action.type){
        case actions.START_GAME:
            console.log("type : " , action.type) ;
            comm.startGame();
            return {
                ...state,
                gameStarted: true
            };
        case actions.FOLD:
            console.log("player wants to fold");
            comm.dispatch({state:state,action:action});
        default:
            console.log("from clientInterReducer default => type : " , action.type) ;
            return state;
    }
}


export default clientInteractionsReducer;