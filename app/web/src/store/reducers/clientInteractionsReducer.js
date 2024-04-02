const initialState = {
    type:false,
};

const clientInteractionsReducer = (state = initialState, action) => {
    switch(action.type){
        default:
            console.log("Client is trying to interact with server");
            return state;
    }
}


export default clientInteractionsReducer;