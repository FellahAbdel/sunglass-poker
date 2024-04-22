const gameReducer = require('../store/reducers/gameReducer');
const gameDescriptionModel = require('../models/GameDescription');
const actions =  require("../store/actions/actionsCreator");
const jwt = require("jsonwebtoken");
const { clearInterval } = require("timers");
const initGameRoom = require('./game');
const { create } = require('domain');
const store = require('../store/configStore');
const csl = require('./intelligentLogging');
const fileType = "gameController";
csl.silenced('Status');
csl.silenced('refreshCall');


const log_refresh = false;
const log_broadcast = false;

module.exports = gameController = {
    io: null,
    rooms: {},
    game: null,
    dao: null,
    refresh: {},
    init: function(dao){
        this.dao = dao;
        this.game = store.getState().game;
        this.rooms = store.getState().game.rooms;
    },

    makeRefreshCall: function (room, reset = false) {
        if (this.rooms.hasOwnProperty(room)) {
            if (this.refresh[room] && !reset) {
                csl.error('refreshCall',"RefreshCall already exist, reset set to false -> Action canceled");
                return;
            } else {
                if (this.refresh[room]) {
                    csl.log('refreshCall','Refresh already in place, removed because reset is set to true');
                    clearInterval(this.refresh[room]);
                }
                this.refresh[room] = setInterval((room, gc) => {
                    csl.log('refreshCall','Refresh for room : ', room);
                    gc.broadcastStatus(room);
                }, 1000, room, this);
                csl.log('refreshCall',"Refresh setup");
            }
        }
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
                csl.log(fileType, "answer of dispatch : ",answer);
                if (answer.status) {
                    this.dao.addOnePlayerGameDesc(id,user);
                    csl.log(fileType,this.rooms[id].state);
                    csl.log(fileType,'New player, try to set refresh');
                    this.makeRefreshCall(id, false);
                    csl.log(fileType,'Join call for broadcast ', answer);
                    this.broadcastStatus(id);
                }
                return answer;
            }
        }
        return { status: false, mes: 'No rooms' };
    },
    removePlayer: function (room, id) { 
        csl.log(fileType, "remove player in gameController");
        respons = this.dispatch(id,actions.leaveRoom(room,id));
        return respons;
        // const players = this.rooms[room].players;
        // if(players.length == 0){
        //     // AJOUTER LE DELETE DE LA ROOM 
        // }
    },

    timeOutPlayer: 3e10,
    broadcastStatus: function (room) {
        // Si la room existe
        if (this.io !== null) {
            if (!this.rooms.hasOwnProperty(room)) {
                if(log_broadcast)csl.error('refreshCall',"Room expired or does not exist");
                return;
            }
            const players = this.rooms[room].players;
            if(log_broadcast) csl.log('refreshCall','gameController call for broadcast on ', room, ' to io with hash :', room);
            if(players.length == 0){
                if(log_broadcast) csl.log(fileType,'No player in room, refreshcall will be remove if set.');
                if(this.refresh[room] !==undefined)
                    this.refresh[room]=clearInterval(this.refresh[room]);
            }
            // Code to kick someone if they didn't answer soon enough.
            // for (var i = 0; i < players.length; i++) {
            //     timedPassed = (Date.now() - players[i].gettimeLastAnswer());
            //     csl.log(('refreshCall'),' last answer :', players[i].gettimeLastAnswer());
            //     if (timedPassed > this.timeOutPlayer) {
            //         this.removePlayer(room, players[i].id);
            //     }
            // }
            this.io.broadcastStatus(room);
        } else  if(log_broadcast)csl.error(fileType,'No io to broadcast');
    },
    status: function (room, id) {
        csl.log('Status','Status room:', room, ' for : ', id);
        // csl.log(fileType,this.rooms, this.rooms.hasOwnProperty(room));
        if (this.rooms[room] !== undefined) {
            // if (this.rooms[room].players.findIndex(player => player.getPlayerId() === id) !== -1) {
                return { status: true, mes: 'Refreshing status', payload: this.rooms[room] };
            // }
        }
        return { status: false, mes: "Can't refresh status", payload: [] };
    },

    newGame: async function(userId){
        if(userId === undefined) {csl.error(fileType,"player MUST be defined for newGame");return;};
        csl.log(fileType,"Create new game inside gameController");
        const respons  = await this.dao.createGameDescription(userId,'','',0);
        csl.log(fileType,'respons : ',respons);
        if(respons.error) { csl.error(fileType,"Couln't create gamedescription",gameDescr.error); return;};
        const gameDescr = respons.data;
        const room = gameDescr._id;
        this.rooms[room] = initGameRoom(room);
        this.dispatch(userId,actions.createGame(room));
        csl.log(fileType,this.rooms);
        this.join(room,userId);
        await this.dao.updateUserData('_id',userId,'inGame',room);
        return room;
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