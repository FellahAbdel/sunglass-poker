import comm from "../../services/socket";

const initialState = {
    type:false,
}; 

const clientInteractionsReducer = (state = initialState, action) => {
    switch(action.type){
        default:
            comm.Hello();
            console.log("Client is trying to interact with server");
            comm.startGame();
            return state;
    }
}


export default clientInteractionsReducer;