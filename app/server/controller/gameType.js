

function createTexasHoldem(room) {
    return {
        maxPlayerCount: 8,
        room: room,
        smallBlind:null,
        bigBlind:null,
        timePerTurn:30e3, // Milliseconds
        getGagnant: function (){

        },
        main: function () {
            while (room.status != 'destroyed') {
                if(room.status == 'start'){
                    room.shuffleDeck();
                    
                }
            }
        }
    }
}