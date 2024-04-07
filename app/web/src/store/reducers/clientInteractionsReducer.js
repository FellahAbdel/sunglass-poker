import comm from "../../services/socket";
import *  as actions from "../actions/clientInteractionsType.js";


const initialState = {
    gameStarted: false
}; 

console.log(actions)
const clientInteractionsReducer = (state = initialState, action) => {
    switch(action.type){
        case actions.REFRESH:
            console.log('Refresh page');
            if(action.payload.game === undefined) return state;
            return {
                ...state,
                table:action.payload.table,
                players:action.payload.game.players
              };
        default:
            console.log("from clientInterReducer default => type : " , action.type) ;
            return state;
    }
}


export default clientInteractionsReducer;