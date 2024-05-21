const hands = require("./score-engine/index");
const Deck = require("./Deck.js");
const PokerTable = require("./PokerTable.js");
const scoreEngineUtils = require("./ScoreEngineUtils.js");
const csl = require("../controller/intelligentLogging.js");
const { clearTimeout } = require("timers");

/**
 * This class is the main controller of the game.
 * It include an auto turn for playing not acting fast enough.
 * Can store the spectators along side the players actively playing the game.
 */
class Game {
  /**
   * 
   * @param  {...Object} args {args_name: args_value ...};
   */
  constructor(...args) {
    let basedValue = {
      players: [],
      allPlayers: [],
      deck: new Deck(),
      pokerTable: new PokerTable(),
      master: false,
      blind: 40,
      focus: null,
      currentStage: "preflop",
      state: "waiting",
      total: 0,
      nbhostfolded: 0,
      gameCurrentBet: 0,
      startingPlayerIndex: 0,
      bonusAmount: 50,
      playerBeforeNextTurn: null,
      focusTurnTimer: 0,
      focusTurnCall: false,
      autoTurnDelay: 20000,
      restartCall: false,
      restartTimer: 0,
      restartDelay: 5000,
      allow_start: true,
      serverName: "",
      firstRoundForRoom: true,
      autoRestartStatus: false,
    };
    Object.assign(this, basedValue, ...args);
  }

  /**
   * active the bonus for all the activeplayer
   * @param {string} player
   */
  activateBonus(player) {
    csl.log("j'active le bonus du joueur : ", player.name);
    if (this.isPlayersTurn(player.getPlayerId())) {
      const playerBonus = player.getPlayerBonus();
      const self = this;

      if (playerBonus.ready) {
        // On va parcourrir liste de joueur actifs dans l'ordre du tour de jeu
        // On commence par le joueur qui a active le bonus car c'est son tour
        // On parcours toute liste de maniere circulaire jusqu'a retomber sur lui
        let startIndex = this.activePlayers.findIndex(
          (p) => p.getPlayerId() === player.getPlayerId()
        );
        let index = startIndex;

        do {
          let p = this.activePlayers[index];
          const playerMoney = p.localMoney;
          const amountToBet =
            playerMoney < self.bonusAmount ? playerMoney : self.bonusAmount;
          p.betBonus(amountToBet);
          this.total += amountToBet;
          index = (index + 1) % this.activePlayers.length;
        } while (index != startIndex);

        player.resetPlayerBonus();
      }
    }
  }

  /**
   * add the new player in the lobby to the playerlist
   * @param {string} player
   */
  addPlayer(player) {
    this.allPlayers.push(player);
    const coins = player.getPlayerMoney();
    if (this.state !== "waiting" || coins <= this.blind) {
      csl.log(
        "gameObject : addPlayer",
        "either or both is true: ",
        "Game is running :",
        this.state !== "waiting",
        this.state,
        "\nPlayer has no money :",
        coins <= 0,
        coins
      );
      player.isSpectator = true;
      player.isActive = false;
    } else if (!player.isSpectator && coins >= this.blind) {
      //If not the first round, we make people pay to join.
      //If they can't, it's cancel.
      if (!this.firstRoundForRoom) {
        player.bet(this.blind);
      }
      this.players.push(player);
      this.checkForNewMaster();
    }
    csl.log(coins);
    csl.log(`Player ${player.name} added.`);
    this.checkForNewMaster();
  }

  /**
   * advance in Stage (preflop flop,trun,river,...)
   */
  advanceStage() {
    if (this.state !== "active") {
      csl.log("Game not active, cannot advance stage.");
      return;
    }
    const entryStage = this.currentStage;
    const stageOrder = ["preflop", "flop", "turn", "river", "showdown", "end"];
    const currentIndex = stageOrder.indexOf(this.currentStage);
    const nextIndex = (currentIndex + 1) % stageOrder.length;
    this.currentStage = stageOrder[nextIndex];
    csl.log(
      "AdvanceStage",
      entryStage,
      currentIndex,
      nextIndex,
      this.currentStage
    );

    switch (this.currentStage) {
      case "flop":
        csl.log("PASSE PAR LE CASE FLOP");
        csl.log(
          "activePlayers.length au niveau de flop",
          this.activePlayers.length
        );
        this.flop();
        break;
      case "turn":
        this.turn();
        csl.log("PASSE PAR LE CASE TURN");
        csl.log(
          "activePlayers.length au niveau de turn",
          this.activePlayers.length
        );
        break;
      case "river":
        this.river();
        csl.log("PASSE PAR LE CASE river");
        break;
      case "showdown":
        csl.log("PASSE PAR LE CASE showdown");
        this.updateActivePlayers();
        this.evaluateHands();
        clearTimeout(this.focusTurnCall);
        this.resetRestartCall();
        this.gameEnd();
        break;
      case "end":
        this.focus = null;
        csl.log("PASSE PAR LE CASE end");
        break;
    }
  }

  /**
   * skip the stage for go to showdown
   * @returns
   */
  advanceStageToShowdown() {
    if (this.state !== "active") {
      csl.log("Game not active, cannot advance stage to showdown.");
      return;
    }

    // Définir directement le currentStage à 'showdown'
    this.currentStage = "river";
    this.advanceStage();
  }

  /**
   * This function has to be called when a player doesn't play by himself. 
   * By default the autoTurn is meant to be for AFK, they'r not automatically kick of the game
   * and they will be allowed to join back before the end of the current rounds where he will be remove
   * if he hasn't come back.
   * 
   * The function also verify if the player is master, upon which we need to search for new one.
   * @param {Player} player to play for. Will  set him afk.
   * @param {boolean} [left=false] left if the player left or it was an afk. By default we guess it's an afk.
   */
  autoTurn(player, left = false) {
    if (this.master === player.getPlayerId()) {
      this.checkForNewMaster(true);
    }
    // If the player left on purpose we need to make sure we don't break the round of focus.
    // If it's his turn we do the same as for the afk person, otherwise we need to force afk even if it's not his turn.
    if (left && this.isPlayersTurn(player.getPlayerId())) {
      // Not his turn so we set him afk but we don't do the rotate. He will be skipped automatically.
      csl.log("autoTurn", "player leave, async play fold custom");
      if (
        this.players.findIndex(
          (p) => p.getPlayerId() === player.getPlayerId()
        ) < this.focus
      )
        this.focus--;
      player.fold();
      player.setAfk();
    } else {
      csl.log("autoTurn", "player AFK");
      this.hasAfk = true;
      this.fold(player);
      this.setPlayerAFK(player);
    }
    if (this.master === player.getPlayerId()) {
      this.checkForNewMaster();
    }
    if (this.state === "waiting") {
      this.moveAfkPlayersToSpectators();
    }
  }

  /**
   * The player tries to bet a certain amount of coins.
   *  There's 5 possibles outcomes : 
            **** RAISE *****
        if :   0 < gameCurrentBet < miseTotal < allin
        
            **** CALL *****
        if :  miseTotal = gameCurrentBet != allin

            **** CHECK *****
        if :   0 = mise = gameCurrentBet

            **** ALLIN *****
        if :   mise = playerMoney
            
        else invalid action and he failed to bet.

   * @param {string} player
   * @param {int} amount
   * @returns
   */
  bet(player, amount) {
    /*  On laisse le joueur bet si
                                    - c'est son tour
                                    - il a assez d'argent
      */
    if (this.isPlayersTurn(player.getPlayerId())) {
      csl.log(
        "bet",
        `before the bet : total = ${this.total} pMoney = ${player.localMoney} pbet = ${player.currentBet} pcurrentBet = ${player.currentBetTurn} amount = ${amount} GameCurrentBet = ${this.gameCurrentBet}`
      );
      

      //   --- RAISE  ---
      if (
        this.gameCurrentBet < amount + player.currentBetTurn &&
        amount < player.localMoney
      ) {
        this.total += amount;
        player.raise();
        player.bet(amount);
        this.gameCurrentBet = player.currentBetTurn;
      }
      //   --- CALL  ---
      else if (
        amount + player.currentBetTurn === this.gameCurrentBet &&
        amount !== player.localMoney
      ) {
        this.total += amount;
        player.bet(amount);
        player.call();
      }
      //   --- CHECK  ---
      else if (amount === 0 && this.gameCurrentBet === 0) {
        player.check();
      }
      //   --- TAPIS  ---
      else if (amount >= player.localMoney) {
        this.total += player.localMoney;
        if (this.gameCurrentBet < player.localMoney + player.currentBetTurn)
          this.gameCurrentBet = player.localMoney + player.currentBetTurn;
        player.tapis(player.localMoney);
        player.setTapis();
      }
      //   --- FAILED  ---
      else {
        csl.log(
          "betfailed",
          "player bet is not valid.",
          amount,
          player.localMoney,
          this.gameCurrentBet
        );
        return;
      }
      if (player.currentBetTurn > this.gameCurrentBet)
        this.gameCurrentBet = player.currentBetTurn;
      csl.log("bet", "gameCurrentBet after this bet : ", this.gameCurrentBet);
      csl.log("bet", `After the bet : ${this.total}`);
      this.rotateFocus();
    }
  }

  /**
   * check the player
   * @param {string} player
   */
  check(player) {
    if (this.isPlayersTurn(player.getPlayerId())) {
      if (this.gameCurrentBet === 0) {
        player.check();
        this.rotateFocus();
      }
    }
  }

  /**
   * forced a new master if needed
   * @param {*} forced
   */
  checkForNewMaster(forced = false) {
    //setNewMaster can be forced.
    let setNewMaster = forced;

    // We check first to see if there is a master. If not we will need to either defined or set null again
    if (
      this.master === undefined ||
      this.master === null ||
      !this.allPlayers.find((p) => p.getPlayerId() === this.master)
    ) {
      csl.log(
        "checkForNewMaster whereIsTheMaster",
        "There's no master, searching is needed"
      );
      setNewMaster = true;
    } // Otherwise we check to see if the master has :
    //                                                - Enough Coins
    //                                                - Is not afk
    //                                                - Is not spec
    else {
      let M = this.allPlayers.find((p) => p.getPlayerId() === this.master);
      if (M.localMoney <= 0 || M.isAFK || M.isSpectator) {
        csl.log(
          "checkForNewMaster comonMan",
          "Master can no longer be. We change it."
        );
        setNewMaster = true;
      }
    }

    // If we required a new master we search for a potential master
    //  Otherwise null ?
    if (setNewMaster) {
      csl.log(
        "checkForNewMaster search Warrant",
        "Start iterations to find new master"
      );
      let potentialMaster = undefined;
      this.players.forEach((player) => {
        // A potentialMaster is :
        //                          - Not AFK
        //                          - Not Spectator
        //                          - has Money
        //                          - Not the old master (ofc)
        if (player.localMoney >= 0 && !player.isSpectator && !player.isAfk) {
          if (potentialMaster === undefined)
            if (
              this.master === null ||
              this.master === undefined ||
              this.master !== player.getPlayerId()
            )
              potentialMaster = player.getPlayerId();
        }
      });

      if (potentialMaster) {
        this.setMaster(potentialMaster);
        csl.log(
          "checkForNewMaster Assignement",
          "New master set to :",
          this.master
        );
      } else {
        this.setMaster(null);
        csl.log(
          "checkForNewMaster failed",
          "Master is set to null. Somethings could break. Where are the players ? :'( "
        );
      }
    } else {
      csl.log(
        "checkForNewMaster Noneed",
        "Master did not required to be changed."
      );
    }
  }

  /*
   * IN : tableau de 7 cartes
   * OUT : objet { poid : NUMBER, type : STRING }
   * FUNCTION : trouve dans les 7 cartes la main la plus puissante
   */
  combinaison(tableau7cartes) {
    // Appelez des fonctions pour vérifier chaque type de main dans l'ordre de puissance
    const functionsToCall = [
      { fn: hands.royalFlush, type: "RoyalFlush" },
      { fn: hands.straightFlush, type: "StraightFlush" },
      { fn: hands.fourOfAKind, type: "FourOfAKind" },
      { fn: hands.fullHouse, type: "FullHouse" },
      { fn: hands.flush, type: "Flush" },
      { fn: hands.straight, type: "Straight" },
      { fn: hands.threeOfAKind, type: "ThreeOfAKind" },
      { fn: hands.twoPair, type: "TwoPair" },
      { fn: hands.onePair, type: "OnePair" },
      { fn: hands.highCard, type: "HighCard" },
    ];

    for (let i = 0; i < functionsToCall.length; i++) {
      const hand = functionsToCall[i].fn(tableau7cartes);
      if (hand) {
        return {
          hand: hand,
          type: functionsToCall[i].type,
          weight: 10 - i,
        };
      }
    }
  }

  /**
   * Create a timeout that will restart the game
   * if the master has checked "autoRestart".
   * The timeout is set to 10s
   * @returns setTimeout | False
   */
  createAutoRestartCall() {
    if (this.autoRestartStatus)
      return setTimeout(() => {
        if (this.allow_start) {
          this.movePlayersWithZeroCoinsToSpectators();
          this.updatePlayersList();
          if (this.state !== "waiting") {
            csl.log("game is already started");
            return;
          } else if (this.players.length <= 1) {
            // Assurez-vous qu'il y a plus d'un joueur actif.
            csl.log("Not enough players to start the game.");
            return;
          } else {
            this.newgame();
          }
        }
      }, 10000);
    else return false;
  }

  /**
   * Create a timeout specifically watching the player focus at the call moment.
   * If the timeout resolve the focus is still on the same player (and the player still exist)
   * the function call @see autoTurn
   * @returns setTimeout
   */
  createAutoTurnCall() {
    let n = this.focus;
    return setTimeout(() => {
      csl.log(
        "autoTurn",
        "Player did not play fasst enough, auto fold",
        n,
        this.players
      );
      if (n < this.players.length && this.players[n] !== undefined) {
        csl.log("autoTurn", "player still exist");
        if (this.focus === n) this.autoTurn(this.players[n]);
      }
    }, this.autoTurnDelay);
  }

  /**
   * fold the player
   * @param {string} player
   */
  fold(player) {
    if (this.isPlayersTurn(player.getPlayerId())) {
      player.fold();
      csl.log("JE SUIS", this.focus);
      this.rotateFocus();
      csl.log("J'ai rotate", this.focus);
      csl.log("NOmbre de joururs actif :", this.activePlayers.length);
    }
  }

  /**
   * To call to destroy the room. It will remove all timer etc...
   *
   */
  destroy() {
    csl.log("DESTROY", "Game is being destroy. Clearing timeout.");
    clearTimeout(this.focusTurnCall);
    clearTimeout(this.restartCall);
  }

  /**
   * evaluate the hands of activePlayers
   * @returns the winners of the game (can have multiple winers)
   */
  evaluateHands() {
    this.updateActivePlayers();
    // this.players = this.activePlayers;
    let winner = this.gagnant(this.activePlayers);
    if (winner === undefined) {
      csl.log(
        "evaluateHands",
        "winner is undefined, players must have all left or something wrong happend."
      );
      return;
    }

    // Si le winner n'est pas un tableau c'est une victoire par défaut car le dernier joueur
    if (!Array.isArray(winner)) {
      winner = [winner];
      // winner.playerHandName = "Last player";
      // winner.seRemplirLesPoches(this.total);
      // winner.jesuislewinner();
      // return;
    }
    // csl.log(`Le gagnant est ${winner.name} avec ${winner.hand}`);
    csl.log("winner est: ", winner);
    const nbwinner = winner.length;
    this.players.forEach((p) => {
      p.decrementalTotal =
        p.decrementalTotal === undefined ? p.betTotal : p.decrementalTotal;
      csl.log("Mise par joueur a gagné", `${p.name} : ${p.decrementalTotal}`);
    });
    if (nbwinner >= 2) {
      let totalWinnerBet = 0;
      const FULLTOTAL = this.total;
      winner.forEach(
        (w) => (totalWinnerBet += this.getPlayerById(w.id).betTotal)
      );
      for (let i = 0; i < nbwinner; i++) {
        csl.log(
          ["evaluateHands", "multiwinner"],
          "Iteration sur le winner",
          i,
          winner[i]
        );
        const winnerHandName = winner[i].type;
        const winPlayer = this.getPlayerById(winner[i].id);
        let coef = winPlayer.betTotal / totalWinnerBet;
        let prend = Math.floor(coef * FULLTOTAL);
        csl.log(
          "pritwinner",
          `il avait un coef de  ${coef} le droit à  par joueur et a prit ${prend}`
        );
        winPlayer.playerHandName = winnerHandName;
        winPlayer.localMoney += prend;
        this.total -= prend;
        winPlayer.jesuislewinner();
      }
      // Le reste va au croupier :)
      this.total = 0;
    } else {
      const winnerHandName = winner[0].type;
      const winPlayer = this.players.find(
        (p) => p.getPlayerId() === winner[0].id
      );
      winPlayer.playerHandName = winnerHandName;
      csl.log(
        ["evaluateHands", "Solowinner"],
        "Id du winner est: ",
        winner[0].id
      );
      csl.log(
        ["evaluateHands", "Solowinner"],
        "Objet Player du gagnat:",
        winPlayer
      );
      let maxwin = winPlayer.betTotal; //* this.activePlayers.filter((p) => !p.alreadyWon).length;

      /*
       *** Un joueur ne peut gagner que jusqu'à ce qu'il a miser par joueur ***
       */

      let prend = 0;
      let x = 0;
      this.players.forEach((p) => {
        // if(!p.alreadyWon){
        x = p.decrementalTotal >= maxwin ? maxwin : p.decrementalTotal;
        prend += x;
        p.decrementalTotal -= x;
        csl.log(
          "evaluateHandswinnerperPlayerTake",
          `winner prend ${x} à ${p.name}`
        );
        // }
      });
      // const prend = maxwin <= this.total ? maxwin : this.total;
      const oldMoney = winPlayer.localMoney;
      winPlayer.localMoney += prend;
      this.total -= prend;
      winPlayer.alreadyWon = true;
      csl.log(
        "evaluateHandsWinnerTapis",
        `Il a pu gagner par joueur ${maxwin} \n`,
        `Il a prit au total : ${prend}  \n`,
        `Il reste ${this.total} \n`,
        `Il avait : ${oldMoney} à la fin du round\n`,
        `Il a désormais : ${winPlayer.localMoney}\n`
      );
      //l'update esr fait au debut de la fonction
      winPlayer.jesuislewinner();
      if (this.total > 0) {
        csl.log("evaluateHands", "Money left, check for another winner.");
        if (this.activePlayers.filter((p) => !p.alreadyWon).length === 0) {
          winPlayer.localMoney += this.total;
          this.total = 0;
        } else this.evaluateHands();
      }
    }
    this.players.forEach((p) => (p.playerMoney = p.localMoney));
  }

  
  /*
   * IN : rien
   * OUT : { [c1, ..., c5], playerId } tableau de combinaison et identifiant du gagnant
   * FUNCTION : identifie le joueur gagnant de la partie et la main avec laquelle il a gagne
   */
  gagnant(activePlayers) {
    if (this.activePlayers.length === 0) return undefined;
    if (this.activePlayers.length === 1)
      return {
        player: this.activePlayers[0],
        id: this.activePlayers[0].getPlayerId(),
        type: "dernier joueur",
      };
    let combinationList = this.listeCombinaison(
      activePlayers.filter((p) => p.alreadyWon === false)
    );
    let maxList = scoreEngineUtils.maximums(combinationList, (x) => x.weight);
    csl.log("gagnant", maxList, combinationList);
    if (maxList.length > 1) {
      return scoreEngineUtils.second(maxList);
    } else {
      return maxList;
    }
  }

  /**
   * reveal the cards and move all the afk players to a spectator state.
   * Start the restartTimer and the autoRestarTimer
   */
  gameEnd() {
    this.moveAfkPlayersToSpectators();
    this.focus = null;
    this.state = "waiting";
    this.updateActivePlayers();
    csl.log(
      "Joueurs actifs lors de la détermination du gagnant:",
      this.activePlayers.map((p) => p.name)
    );

    this.activePlayers.forEach((player) => {
      player.revealCard(0);
      player.revealCard(1);
    });
    this.resetRestartCall();
    this.updatePlayersList();
    this.autoRestartCall = this.createAutoRestartCall();
  }

  /**
   * filter the ActivePlayers in the player array
   * @returns a tab of Activeplayer
   */
  getActivePlayers() {
    return this.players.filter((player) => player.isActive);
  }

  /**
   *
   * @returns the focus player
   */
  getFocus() {
    return this.focus;
  }

  /**
   *
   * @returns the id of the master of the lobby
   *
   */
  getMaster() {
    return this.master;
  }

  /**
   * This function generate a specific view of the game for the player given
   * This filter everything the player is not allowed to see by creating a 
   * new Object for everything in the game (all the players too) to prevent any memory sharing. 
   * This is the main security to prevent anyone from seeing someone else cards.
   * 
   * This means that even though you can spectate a game you wont be able to see
   * any player cards and you won see anyone cards to help them :) 
   * @param {string} id player that wants to view the game.
   * @returns a new view of the Game object
   */
  getForPlayer(id) {
    var filteredPlayer = this.players.map((player) => player.statusFor(id));
    var g = new Game({
      players: filteredPlayer,
      allPlayers: this.allPlayers,
      pokerTable: this.pokerTable,
      master: this.master,
      blind: this.blind,
      focus: this.focus,
      currentStage: this.currentStage,
      state: this.state,
      total: this.total,
      playerBeforeNextTurn: this.playerBeforeNextTurn,
      nbhostfolded: this.nbhostfolded,
      gameCurrentBet: this.gameCurrentBet,
      focusTurnTimer: this.focusTurnTimer,
      serverName: this.serverName,
      autoRestartStatus: this.autoRestartStatus,
    });
    return g;
  }

  /**
   * 
   * @param {string} playerId
   * @returns player | null
   */
  getPlayerById(playerId) {
    const player = this.allPlayers.find((p) => p.playerId === playerId);
    if (player) {
      return player;
    } else {
      csl.error("Player not found with ID:", playerId);
      return null;
    }
  }

  /**
   *
   * @param {string} playerId
   * @returns the PlayeName
   */
  getPlayerNameById(playerId) {
    const player = this.allPlayers.find((p) => p.playerId === playerId);
    if (player) {
      return player.name;
    } else {
      csl.error("Player not found with ID:", playerId);
      return null;
    }
  }

  /**
   * check if it's the player turn
   * @param {id} playerId
   * @returns boolean
   */
  isPlayersTurn(playerId) {
    csl.log("isPlayersTurn", playerId, this.focus, this.activePlayers);
    if (this.focus < 0 || this.focus > this.players.length) this.rotateFocus();
    if (this.focus === null || this.players[this.focus].playerId !== playerId) {
      csl.error("It's not this player's turn.");
      return false;
    }
    return true;
  }

  /**
   * Move the player in argument to the spectator or in the players table if he's allowed.
   * @param {id} playerId
   */
  moveSpecOrPlayer(playerId) {
    let player = this.allPlayers.find((p) => p.playerId === playerId);

    // Vérifier si le joueur existe déjà et son état
    if (player) {
      // Si le joueur a 0 coins, il ne peut pas rejoindre la table
      csl.log(
        `Player ${player.name} player.isSpectator test`,
        player.isSpectator
      );

      if (player.getPlayerMoney() <= 0) {
        csl.log(
          `Player ${player.name} cannot rejoin the table due to insufficient coins.`
        );
        player.movePlayerToSpectator();
        this.updatePlayersList();
        return;
      } else {
        player.playing();
        player.toggleSpectator();
        this.updatePlayersList();
      }
    }
  }

  /**
   * moove the afk in specator
   */
  moveAfkPlayersToSpectators() {
    this.players.forEach((player) => {
      if (player.isAfk) {
        player.movePlayerToSpectator();
        if (this.master === player.getPlayerId()) {
          this.checkForNewMaster();
        }
      }
    });
    this.updatePlayersList();
  }

  /**
   * Kick the poor in spectator (0 money)
   */
  movePlayersWithZeroCoinsToSpectators() {
    this.players.forEach((player) => {
      if (player.getPlayerMoney() <= this.blind) {
        player.movePlayerToSpectator();
        if (this.master === player.getPlayerId()) {
          this.checkForNewMaster();
        }
      } // if he has money and his the first we encouter, he's the potential new master if the master has no money.
    });
    this.updatePlayersList();
  }

  /**
   * start a newgame
   * @returns nothing. Stop early  if game cannot start.
   */
  newgame() {
    if (!this.allow_start) return;
    csl.log("Passe     if (!this.allow_start) return");
    this.allow_start = false;
    // this.activePlayers = this.players.filter(
    //   (player) => player.isActive && !player.isAfk
    // ); // Remplir la liste des joueurs actifs

    this.players.forEach((player) => {
      player.newRoundReset();
    });

    this.updateActivePlayers();

    if (this.activePlayers.length <= 1) {
      csl.log("pas assez de joueurs, if (this.activePlayers.length <= 1) {");
      return;
    }
    clearTimeout(this.restartCall);

    // Room first round is starting, new player will pay to join
    this.firstRoundForRoom = false;

    this.currentStage = "preflop";
    this.state = "active";
    this.rotateStartingPlayer();
    this.focus = this.startingPlayerIndex;
    this.playerBeforeNextTurn = this.startingPlayerIndex;
    this.total = 0;
    this.pokerTable.reset();
    this.deck = new Deck();
    this.deck.shuffle();
    this.gameCurrentBet = 40;
    this.players.forEach((player) => {
      player.clearHand();
      for (let i = 0; i < 2; i++) {
        player.addCard(this.deck.deal());
      }
    });
    this.nbhostfolded = 0;

    const firstPlayer = this.players[this.focus];
    csl.log("firstplayer: ", firstPlayer);
    firstPlayer.betinitial(this.gameCurrentBet / 2);
    this.total += this.gameCurrentBet / 2;

    this.rotateFocus();
    const nextPlayer = this.players[this.focus];
    csl.log("nextPlayer: ", nextPlayer);
    nextPlayer.betinitial(this.gameCurrentBet);
    this.total += this.gameCurrentBet;

    this.rotateFocus();
    this.playerBeforeNextTurn = this.focus;

    //OU ICI

    //IL VA SUREMENT MANQUE UN JOUEUR A CHECK AVANT D'AFFICHER LE FLOP

    // csl.log("length:",this.players.length);
    // csl.log("active:",this.activePlayers.length);
  }

  /**
   * Function for postAction callback
   * Not used for anything else that loggin purpose right now.
   * Meant for future improvement. 
   */
  playerPlayed() {
    csl.log("classGame_PLAYER_PLAYED", "un joueur a joué");
  }

  /**
   * remove the player who leave the lobby
   * @param {id} playerId
   */
  removePlayer(playerId) {
    let player = this.allPlayers.find((p) => p.getPlayerId() === playerId);
    if (
      this.focus === this.players.findIndex((p) => p.getPlayerId() === playerId)
    )
      this.autoTurn(player, true);
    this.allPlayers = this.allPlayers.filter(
      (p) => p.getPlayerId() !== playerId
    );
    if (this.state === "waiting")
      this.players = this.players.filter((p) => p.getPlayerId() !== playerId);
    // this.updateActivePlayers();
  }

  /**
   * reset the lobby for a newgame
   */
  reset() {
    this.players = [];
    this.state = "waiting";
    this.activePlayers = [];
    this.deck.initCards();
    this.pokerTable.reset();
  }

  /**
   * Change the starting Player every start of a newgame
   */
  rotateStartingPlayer() {
    this.startingPlayerIndex =
      (this.startingPlayerIndex + 1) % this.players.length;
  }

  /**
   * rotate the focus Player and advance in the game if condition are fill
   * @returns Stop early if we need to end the game or no one is playing.
   */
  rotateFocus() {
    this.updateActivePlayers(); // Mise à jour de la liste des joueurs actifs
    // Vérification pour passer directement à showdown si moins de deux joueurs actifs
    let someoneTapis =
      this.activePlayers.filter((player) => player.status === "tapis").length >=
      0;
    // Si personne tapis et que le nombre de joueur est 1 alors plus personne ne joue on a un gagnant
    csl.log("rotateFocus", someoneTapis);
    if (this.activePlayers.filter((p) => p.state !== "folded").length <= 1) {
      csl.log(
        "rotateFocus",
        "No one has tapied and there is only one player left"
      );
      this.advanceStageToShowdown();
      return;
    }

    let remainingPlayersCount = this.activePlayers.filter(
      (player) => player.status !== "tapis"
    ).length;
    let dernierPasTapis = this.activePlayers.find(
      (player) => player.status !== "tapis"
    );
    csl.log(
      "rotateFocus",
      dernierPasTapis,
      this.activePlayers.length,
      remainingPlayersCount
    );

    // Plus de joueur qui ne sont pas tapis alors on va jusqu'à la fin
    if (
      remainingPlayersCount <= 1 &&
      someoneTapis &&
      (dernierPasTapis === undefined ||
        (dernierPasTapis.talkedThisTurn &&
          dernierPasTapis.currentBetTurn === this.gameCurrentBet))
    ) {
      csl.log(
        ["evaluateHands", "lastAvecTapis"],
        "lastPasTapis: ",
        dernierPasTapis,
        "Game Current bet:",
        this.gameCurrentBet
      );
      clearTimeout(this.focusTurnCall);
      while (this.currentStage !== "showdown") {
        this.advanceStage();
      }
      return;
    }

    if (this.currentStage === "showdown" || this.currentStage === "end") {
      csl.log("ROTATE FOCUS DANS END OU SHOWDOWN");
      return;
    }

    const originalFocus = this.focus;
    csl.log("original", originalFocus);

    this.focus = (this.focus + 1) % this.players.length;
    csl.log("rotateFocus", "focusapresoriginal", this.focus);
    csl.log("rotateFocus", "isACtive?", this.players[this.focus].isActive);
    // Rotation du focus tant que le joueur actuel n'est pas actif
    while (
      !this.players[this.focus].isActive ||
      this.players[this.focus].getStatus() === "tapis"
    ) {
      csl.log(
        "Player qu'on regarde :",
        this.players[this.focus].isActive,
        this.players[this.focus].getStatus()
      );
      this.focus = (this.focus + 1) % this.players.length;
      if (this.focus === originalFocus) {
        csl.log("No active players available. Setting focus to null.");
        clearTimeout(this.focusTurnCall);
        while (this.currentStage !== "showdown") {
          this.advanceStage();
        }
        return;
      }
    }
    csl.log("rotateFocus", "Le focus Après : ", this.focus);

    /**
     * on ne finit un tour  que si tout le monde a payé assez ou a tapis
     * ET que tout le monde a parlé au moins 1 fois.
     */
    let allplayedenough_orTapis = 0; // nbr de joueurs qui ont payé
    let alltalkedThisTurn = 0; // nbr de joueurs qui  ont parlé
    this.activePlayers.map((p) => {
      if (p.isTapis || p.currentBetTurn === this.gameCurrentBet)
        allplayedenough_orTapis += 1;
      csl.log(
        "iterate",
        `Playerbet : ${p.currentBetTurn} =?= ${this.gameCurrentBet} ; ${p.isTapis}`
      );
    });
    this.activePlayers.map((p) => {
      if (p.talkedThisTurn === true || p.isTapis) alltalkedThisTurn += 1;
    });
    let aPlength = this.activePlayers.length; // nbr de joueurs total
    csl.log(
      "rotateFocusVictor",
      "Comptes : ",
      allplayedenough_orTapis,
      alltalkedThisTurn,
      this.gameCurrentBet
    );
    if (
      allplayedenough_orTapis === aPlength &&
      alltalkedThisTurn === aPlength
    ) {
      csl.log("rotateFocusVictor", "finit le tour");

      // On a finit le tour
      // On reset les champs des joueurs pour le prochain tour.
      this.activePlayers.map((p) => {
        p.newTurnReset();
        if (p.status !== "tapis") {
          p.playing();
        }
      });
      this.players.map((p) => {
        this.total += p.currentBetTurn;
        p.currentBetTurn = 0;
      });
      this.gameCurrentBet = 0;
      this.advanceStage();
      // return;
    }
    // Sinon quelqu'un doit encore jouer.

    this.rotateTimer();
  }

  /**
   * Rotate the autoTurntimer for the current player.
   */
  rotateTimer() {
    clearTimeout(this.focusTurnCall);
    if (
      this.state !== "waiting" &&
      this.stage !== "end" &&
      this.stage !== "showdown"
    ) {
      this.focusTurnCall = this.createAutoTurnCall();
      this.focusTurnTimer = Date.now() + this.autoTurnDelay;
    }
  }

  /**
   *
   * @param {Player} player Player class Object
   * @description Will set the player to afk, remove him from player and set him  as spectator
   * @return {void}
   */
  setPlayerAFK(player) {
    csl.log("setPlayerAFK", "Player received:", player);
    // this.moveSpecOrPlayer(player.getPlayerId());
    player.setAfk();
    if (player.playerId === this.master) {
      csl.log("Le master est AFK");
      this.checkForNewMaster();
    }
  }

  /**
   * set the master at the id player
   * @param {string} id
   *
   */
  setMaster(id) {
    this.master = id;
  }

  /**
   * start the game
   * @param {id} playerId
   * @returns stop early if the game cannot start.
   */
  start(playerId) {
    if (this.master === playerId) {
      csl.log("Le master lance la game");
      // S'assurer que la liste des joueurs actifs est à jour avant de démarrer.
      this.movePlayersWithZeroCoinsToSpectators();
      this.updatePlayersList();

      if (this.state !== "waiting") {
        csl.log("The game is not in a waiting state.");
        return;
      }

      if (this.players.length <= 1) {
        // Assurez-vous qu'il y a plus d'un joueur actif.
        csl.log("Not enough players to start the game.");
        return;
      }

      csl.log("newgame se lance");
      this.newgame();
    } else {
      // Pour les non-maîtres
      let playerObject = this.getPlayerById(playerId);
      if (playerObject !== undefined && playerObject !== null) {
        playerObject.unsetAfk();
        this.moveSpecOrPlayer(playerId);
        this.checkForNewMaster();
      }
    }
  }

  /**
   *
   * @param {string} playerId
   */
  toggleRestart(playerId) {
    csl.log("toggleRestart", `master: ${this.master} === ${playerId}`);
    if (this.master === playerId) {
      this.autoRestartStatus = !this.autoRestartStatus;
      csl.log("toggleRestart", `status is now ${this.autoRestartStatus}`);
      if (this.autoRestartStatus) {
        if (this.state === "waiting")
          this.autoRestartCall = this.createAutoRestartCall();
      } else {
        clearTimeout(this.autoRestartCall);
      }
    }
  }

  /**
   * update the ActviePlayer
   */
  updateActivePlayers() {
    this.activePlayers = this.players.filter(
      (player) => player.isActive && !player.isAfk
    );
  }

  /**
   * update the Players list with the nonspecator and nonAfk Players
   */
  updatePlayersList() {
    // Filtrer les joueurs qui ne sont pas spectateurs et qui sont actifs
    this.players = this.allPlayers.filter(
      (player) => !player.isSpectator && !player.isAFK
    );
    csl.log(
      `Updated players list: Now includes ${this.players.length} active players.`
    );
  }


  /*
  in : nothing
  out : nothing but we update the communityCards by pushing three cards in the 
        pokerTable cards.
  */
  flop() {
    // Burn a card before dealing the flop
    this.deck.burn();
    // Deal 3 cards for the flop
    csl.log("je suis RENTREr DANS FLOP");
    const flopCards = this.deck.deal3Cards();
    csl.log("les flopCards:", flopCards);

    // If dealCards() doesn't return exactly 3 cards, handle the error
    if (flopCards.length !== 3) {
      csl.error("Unexpected number of cards dealt for the flop");
      return; // Exit the method or handle the error appropriately
    }

    // Update the community cards on the poker table with the flop cards
    this.pokerTable.communityCards = [...flopCards];
    csl.log(this.pokerTable.communityCards);
  }

  /*
  In : nothing
  OUT : nothing but we push one card to the community cards (4 cards in total)
  */
  turn() {
    // burn a card before dealing the turn
    this.deck.burn();

    this.pokerTable.communityCards.push(this.deck.deal());
    csl.log(this.pokerTable.communityCards);
  }

  /*
   * In : nothing
   * OUT : nothing but we push one card to the community cards (5 cards in total)
   */
  river() {
    // Burn a card before dealing the river
    this.deck.burn();

    this.pokerTable.communityCards.push(this.deck.deal());
    csl.log(this.pokerTable.communityCards);
  }

  /**
   *
   */
  resetRestartCall() {
    clearTimeout(this.resetRestartCall);
    this.restartTimer = Date.now() + this.restartDelay;
    this.restartCall = setTimeout(() => {
      this.allow_start = true;
    }, this.restartDelay);
  }

  /**
   *
   * @param {string} player
   * @returns best card and id of the player
   */
  make7Cards(player) {
    return {
      cards: [...this.pokerTable.communityCards, ...player.getPlayerCards()],
      id: player.getPlayerId(),
    };
  }

  /*
   * IN : [j1, ...] liste des joueurs actifs
   * OUT : [{ poid, main, type }, ...] tableau des poids des mains des joueurs
   * FUNCTION : renvoi le tableau des poids des combinaisons de chaque joueur
   */
  listeCombinaison(activePlayers) {
    let res = [];

    csl.log("activePlayers.length:", activePlayers.length);
    for (let i = 0; i < activePlayers.length; i++) {
      let f7c = this.make7Cards(activePlayers[i]);
      let c = this.combinaison(f7c.cards);
      c.id = f7c.id;
      res.push(c);
    }

    return res;
  }

}

module.exports = Game;
