const gameReducer = require('../store/reducers/gameReducer');
const actions =  require("../store/actions/actionsCreator");
const jwt = require("jsonwebtoken");
const { clearInterval } = require("timers");
const createGame = require('./game');
const { create } = require('domain');
const store = require('../store/configStore');



module.exports = gameController = {
    io: null,
    hashRoom: function (id) {
        return id;
    },
    rooms: {
        // 2: {
        //     id: 2,
        //     players: [],
        //     max: 5,
        //     refresh: undefined,
        //     joinGame: function (userId) {
        //         // console.log(this.players, typeof this.players);
        //         if (this.players !== undefined) {
        //             if (this.players.length === 0) {
        //                 this.players.push({ id: userId, timeLastAnswer: Date.now() });
        //                 return { status: true, mes: 'Join successfull', payloadRoom: { id: this.id, players: this.players, max: this.max } };
        //             }
        //             if (this.players.findIndex(player => player.getPlayerId() === userId) === -1 && this.players.length < this.max) {
        //                 this.players.push({ id: userId, timeLastAnswer: Date.now() });
        //                 return { status: true, mes: 'Join successfull', payloadRoom: { id: this.id, players: this.players, max: this.max } };
        //             }
        //         }
        //         return { status: false, mes: 'Either the room is full or player already in' };
        //     }
        // }
    },

    makeRefreshCall: function (room, reset = false) {
        // return;
        // console.trace(this);
        // console.log('Set refresh call for ', room, '  reset: ', reset);
        const hroom = this.hashRoom(room);
        // console.log(this.rooms, hroom);
        if (this.rooms.hasOwnProperty(hroom)) {
            if (this.rooms[hroom].refresh && !reset) {
                console.error("RefreshCall already exist, reset set to false -> Action canceled");
                return;
            } else {
                if (this.rooms[hroom].refresh) {
                    console.log('Refresh already in place, removed because reset is set to true');
                    clearInterval(this.rooms[hroom].refresh);
                }
                this.rooms[hroom].refresh = setInterval((room, gc) => {
                    console.log('Refresh for room : ', room);
                    gc.broadcastStatus(room);
                }, 1000, room, this);
                console.log("Refresh setup");
            }
        }
        else
            console.error("Can't create refreshCall for inexistant room, make sure it's NOT the hash that's passed", hroom);
    },

    join: function (id, user) {
        console.log(this);
        if (this.rooms !== undefined) {
            if (this.rooms.hasOwnProperty(id)) {
                if (user === undefined) {
                    return { status: false, mes: 'User undefined' };
                }
                const answer = this.rooms[id].joinGame(user);
                if (answer.status) {
                    console.log(actions.sit());
                    // store.dispatch(this.rooms[id].state,actions.sit());
                    console.log('nop at');
                    this.rooms[id].state = store.getState();
                    // console.log('New player, try to set refresh');
                    this.makeRefreshCall(id, false);
                    // console.log('Join call for broadcast ', answer);
                    // this.broadcastStatus(id);
                }
                return answer;
            }
        }
        return { status: false, mes: 'No rooms' };
    },
    removePlayer: function (room, id) {
        const hroom = this.hashRoom(room);
        if (this.rooms.hasOwnProperty(hroom)) {
            let index = -1;
            if ((index = this.rooms[room].players.findIndex(player => player.getPlayerId() === id)) !== -1) {
                console.log("Player : ", id, " removed from room : ", room);
                this.rooms[room].players.splice(index, 1);
                return;
            } else console.error("Player ", id, " is not in the room");
        } else console.error("Not a room, can't kick player", room, "  -:> ", id);
    },

    timeOutPlayer: 3e10,
    broadcastStatus: function (room) {
        console.log("mon io:", this.io);
        console.log('called for broadcast room ', room);
        const hroom = this.hashRoom(room);
        // Si la room existe
        if (this.io !== null) {
            if (!this.rooms.hasOwnProperty(hroom)) {
                console.error("Room expired or does not exist");
                return;
            }
            const players = this.rooms[hroom].state.game.players;
            console.log('gameController call for broadcast on ', room, ' to io with hash :', hroom);
            if(players.length == 0){
                console.log('No player in room, refreshcall will be remove if set.');
                if(this.rooms[hroom].refresh !==undefined)
                    this.rooms[hroom].refresh=clearInterval(this.rooms[hroom].refresh);
            }
            // for (var i = 0; i < players.length; i++) {
            //     timedPassed = (Date.now() - players[i].gettimeLastAnswer());
            //     console.log('since last answer:', timedPassed);
            //     // if (timedPassed > this.timeOutPlayer) {
            //     //     this.removePlayer(room, players[i].id);
            //     // }
            // }
            this.io.broadcastStatus(hroom);
        } else console.error('No io to broadcast');
    },
    status: function (room, id) {
        console.log('Status room:', room, ' for : ', id);
        // console.log(this.rooms, this.rooms.hasOwnProperty(room));
        if (this.rooms.hasOwnProperty(room)) {
            if (this.rooms[room].state.game.players.findIndex(player => player.getPlayerId() === id) !== -1) {
                return { status: true, mes: 'Refreshing status', payload: this.rooms[room].state };
            }
        }
        return { status: false, mes: "Can't refresh status", payload: [] };
    },

    newGame: function(userId =false){
        console.log("Create new game inside gameController");
        const g = createGame();
        const hroom = this.hashRoom(g.id);
        this.rooms[hroom] = g;
        store.dispatch(actions.startGame());
        this.rooms[hroom].state = store.getState();
        if(userId !== false)
            this.join(g.id,userId);
        return g.id;
    },

    dispatch:function(user, action, room){
        console.log("user : ",user, " dispatch event : ", action, " for room : ", room);
    }


};