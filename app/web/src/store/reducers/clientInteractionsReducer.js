import comm from "../../services/socket";
import *  as actions from "../actions/clientInteractionsType.js";


const initialState = {
    gameStarted: false
}; 

console.log(actions)
const clientInteractionsReducer = (state = initialState, action) => {
    switch(action.type){
        default:
            console.log("from clientInterReducer default => type : " , action.type) ;
            return state;
    }
}


export default clientInteractionsReducer;