const gameReducer = require('../store/reducers/gameReducer');
const actions =  require("../store/actions/actionsCreator");
const jwt = require("jsonwebtoken");
const { clearInterval } = require("timers");
const createGame = require('./game');
const { create } = require('domain');
const store = require('../store/configStore');
const csl = require('./intelligentLogging');
const fileType = "gameController";

const log_refresh = false;
const log_broadcast = false;

module.exports = gameController = {
    io: null,
    hashRoom: function (id) {
        return id;
    },
    rooms: {},
    init: function(){
        this.rooms = store.getState().game.rooms;
    },

    makeRefreshCall: function (room, reset = false) {
        // return;
        // csl.trace(fileType,this);
        // csl.log(fileType,'Set refresh call for ', room, '  reset: ', reset);
        const hroom = this.hashRoom(room);
        // csl.log(fileType,this.rooms, hroom);
        if (this.rooms.hasOwnProperty(hroom)) {
            if (this.rooms[hroom].refresh && !reset) {
                if(log_refresh) csl.error(fileType,"RefreshCall already exist, reset set to false -> Action canceled");
                return;
            } else {
                if (this.rooms[hroom].refresh) {
                    if(log_refresh) csl.log(fileType,'Refresh already in place, removed because reset is set to true');
                    clearInterval(this.rooms[hroom].refresh);
                }
                this.rooms[hroom].refresh = setInterval((room, gc) => {
                    if(log_refresh) csl.log(fileType,'Refresh for room : ', room);
                    gc.broadcastStatus(room);
                }, 1000, room, this);
                if(log_refresh) csl.log(fileType,"Refresh setup");
            }
        }
        else
            if(log_refresh) csl.error(fileType,"Can't create refreshCall for inexistant room, make sure it's NOT the hash that's passed", hroom);
    },

    join: function (id, user) {
        csl.log(fileType,this);
        if (this.rooms !== undefined) {
            if (this.rooms.hasOwnProperty(id)) {
                csl.log(fileType,'User to add : ',user);
                if (user === undefined) {
                    return { status: false, mes: 'User undefined' };
                }
                const answer = this.dispatch(user,actions.sit(id,user));
                csl.log(fileType, answer);
                if (answer.status) {
                    csl.log(fileType,this.rooms[id].state);
                    // csl.log(fileType,'nop at');
                    // csl.log(fileType,'New player, try to set refresh');
                    // this.makeRefreshCall(id, false);
                    // csl.log(fileType,'Join call for broadcast ', answer);
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
                csl.log(fileType,"Player : ", id, " removed from room : ", room);
                this.rooms[room].players.splice(index, 1);
                return;
            } else csl.error(fileType,"Player ", id, " is not in the room");
        } else csl.error(fileType,"Not a room, can't kick player", room, "  -:> ", id);
    },

    timeOutPlayer: 3e10,
    broadcastStatus: function (room) {
        if(log_broadcast){
            csl.log(fileType,"mon io:", this.io);
            csl.log(fileType,'called for broadcast room ', room);
        }
        const hroom = this.hashRoom(room);
        // Si la room existe
        if (this.io !== null) {
            if (!this.rooms.hasOwnProperty(hroom)) {
                if(log_broadcast)csl.error(fileType,"Room expired or does not exist");
                return;
            }
            const players = this.rooms[hroom].players;
            if(log_broadcast) csl.log(fileType,'gameController call for broadcast on ', room, ' to io with hash :', hroom);
            if(players.length == 0){
                if(log_broadcast) csl.log(fileType,'No player in room, refreshcall will be remove if set.');
                if(this.rooms[hroom].refresh !==undefined)
                    this.rooms[hroom].refresh=clearInterval(this.rooms[hroom].refresh);
            }
            // for (var i = 0; i < players.length; i++) {
            //     timedPassed = (Date.now() - players[i].gettimeLastAnswer());
            //     csl.log(fileType,'since last answer:', timedPassed);
            //     // if (timedPassed > this.timeOutPlayer) {
            //     //     this.removePlayer(room, players[i].id);
            //     // }
            // }
            this.io.broadcastStatus(hroom);
        } else  if(log_broadcast)csl.error(fileType,'No io to broadcast');
    },
    status: function (room, id) {
        csl.log(fileType,'Status room:', room, ' for : ', id);
        // csl.log(fileType,this.rooms, this.rooms.hasOwnProperty(room));
        if (this.rooms[room] !== undefined) {
            // if (this.rooms[room].players.findIndex(player => player.getPlayerId() === id) !== -1) {
                return { status: true, mes: 'Refreshing status', payload: this.rooms[room] };
            // }
        }
        return { status: false, mes: "Can't refresh status", payload: [] };
    },

    newGame: function(userId =false){
        csl.log(fileType,"Create new game inside gameController");
        if(this.rooms[10] !== undefined) return undefined;
        const g = createGame();
        const hroom = this.hashRoom(g.id);
        this.rooms[hroom] = g;
        store.dispatch(actions.startGame());
        this.rooms[hroom].state = store.getState();
        csl.log(fileType,this.rooms);
        if(userId !== false)
            this.join(g.id,userId);
        return g.id;
    },

    dispatch: function(user, action){
        csl.log(fileType,"user : ",user, " dispatch event : ", action);
        store.dispatch(action);
        const state = store.getState();
        const answer = state.game.answer;
        csl.log(fileType, "Answer: ", answer)
        store.dispatch(actions.clearAnswer());
        return answer;
    }


};