const hands = require("./score-engine/index");
const Deck = require("./Deck.js");
const PokerTable = require("./PokerTable.js");
const scoreEngineUtils = require("./ScoreEngineUtils.js");
const Players = require("./Player.js");
const { clearScreenDown } = require("readline");
const csl = require("../controller/intelligentLogging.js");
const { clearTimeout } = require("timers");

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
    };
    Object.assign(this, basedValue, ...args);
    // this.activePlayers = null;
    // this.players = players;
    // this.spectators = spectators;
    // this.deck = deck;
    // this.pokerTable = pokerTable;
    // this.master = master;
    // this.blind = blind;
    // this.focus = focus;
    // this.currentStage = currentStage;
    // this.state = state;
    // this.total = total;
    // this.nbhostfolded = nbhostfolded;
    // this.gameCurrentBet = gameCurrentBet; // Utilisez gameCurrentBet ici
    // this.startingPlayerIndex = startingPlayerIndex;
  }

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
    });
    return g;
  }

  getActivePlayers() {
    return this.players.filter((player) => player.isActive);
  }

  updatePlayersList() {
    // Filtrer les joueurs qui ne sont pas spectateurs et qui sont actifs
    this.players = this.allPlayers.filter(
      (player) => !player.isSpectator && !player.isAFK
    );
    console.log(
      `Updated players list: Now includes ${this.players.length} active players.`
    );
  }

  getPlayerNameById(playerId) {
    const player = this.allPlayers.find((p) => p.playerId === playerId);
    if (player) {
      return player.name;
    } else {
      console.error("Player not found with ID:", playerId);
      return null;
    }
  }

  /**
   *
   * @param {id} playerId
   */
  moveSpecOrPlayer(playerId) {
    let player = this.allPlayers.find((p) => p.playerId === playerId);

    // Vérifier si le joueur existe déjà et son état
    if (player) {
      // Si le joueur a 0 coins, il ne peut pas rejoindre la table
      console.log(
        `Player ${player.name} player.isSpectator test`,
        player.isSpectator
      );

      if (player.getPlayerMoney() <= 0) {
        console.log(
          `Player ${player.name} cannot rejoin the table due to insufficient coins.`
        );
        player.isSpectator = true;
        player.isActive = false;
        this.updatePlayersList();
        return;
      } else {
        player.toggleSpectator();
        this.updatePlayersList();
      }
    }
  }

  getPlayerById(playerId) {
    const player = this.allPlayers.find((p) => p.playerId === playerId);
    if (player) {
      return player;
    } else {
      console.error("Player not found with ID:", playerId);
      return null;
    }
  }

  changeMaster() {
    this.master = this.players[0].playerId;
  }

  //si le nombre de joueur change en cours de parti ça risque de faire des saut chelou
  //faudrait faire un truc genre Modulo 10 joeurs en mode ça tourne autour de la table
  //et si la place est vide on va au prochain
  rotateStartingPlayer() {
    this.startingPlayerIndex =
      (this.startingPlayerIndex + 1) % this.players.length;
  }

  setMaster(id) {
    this.master = id;
  }
  getMaster() {
    return this.master;
  }
  setFocus(n) {
    if (n >= 0 && n < this.players.length) {
      this.focus = n;
    }
  }
  getFocus() {
    return this.focus;
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
      console.log("Le master est AFK");
      this.changeMaster();
    }
  }

  /**
   *
   * @param {Player} player to play for. Will  set him afk.
   * @param {left=false} left if the player left or it was an afk. By default we guess it's an afk.
   */

  autoTurn(player, left = false) {
    
    // If the player left on purpose we need to make sure we don't break the round of focus.
    // If it's his turn we do the same as for the afk person, otherwise we need to force afk even if it's not his turn.
    if (left && this.isPlayersTurn(player.getPlayerId())) {
      // Not his turn so we set him afk but we don't do the rotate. He will be skipped automatically.
      csl.log("autoTurn", "player leave, async play fold custom");
      if(this.players.findIndex(p => p.getPlayerId() === player.getPlayerId()) < this.focus)
        this.focus--;
      player.fold();
      player.setAfk();
    } else {
      csl.log("autoTurn", "player AFK");
      this.hasAfk = true;
      this.fold(player);
      this.setPlayerAFK(player);
    }
    if(this.master === player.getPlayerId()){
      this.checkForNewMaster();
    }
  }

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

  rotateFocus() {
    this.updateActivePlayers(); // Mise à jour de la liste des joueurs actifs
    // Vérification pour passer directement à showdown si moins de deux joueurs actifs
    let someoneTapis =
      this.activePlayers.find((player) => player.status === "tapis") !==
      undefined;
    // Si personne tapis et que le nombre de joueur est 1 alors plus personne ne joue on a un gagnant
    csl.log("rotateFocus", someoneTapis);
    if (
      !someoneTapis &&
      this.activePlayers.filter((p) => p.state !== "folded").length === 1
    ) {
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
      // this.advanceStageToShowdown();
      clearTimeout(this.focusTurnCall);
      this.players.forEach(p => {this.total+=p.currentBetTurn;p.currentBetTurn =0;});
      while (this.currentStage !== "showdown") {
        this.advanceStage();
      }
      return;
    }

    if (this.currentStage === "showdown" || this.currentStage === "end") {
      console.log("ROTATE FOCUS DANS END OU SHOWDOWN");
      return;
    }

    const originalFocus = this.focus;
    console.log("original", originalFocus);

    this.focus = (this.focus + 1) % this.players.length;
    csl.log("rotateFocus","focusapresoriginal", this.focus);
    csl.log("rotateFocus","isACtive?", this.players[this.focus].isActive);
    // Rotation du focus tant que le joueur actuel n'est pas actif
    while (
      !this.players[this.focus].isActive ||
      this.players[this.focus].getStatus() === "tapis"
    ) {
      console.log(
        "Player qu'on regarde :",
        this.players[this.focus].isActive,
        this.players[this.focus].getStatus()
      );
      this.focus = (this.focus + 1) % this.players.length;
      if (this.focus === originalFocus) {
        console.log("No active players available. Setting focus to null.");
        clearTimeout(this.focusTurnCall);
        while (this.currentStage !== "showdown") {
          this.advanceStage();
        }
        return;
      }
    }
    csl.log("rotateFocus","Le focus Après : ", this.focus);

    /**
     * on ne finit un tour  que si tout le monde a payé assez ou a tapis
     * ET que tout le monde a parlé au moins 1 fois.
     */
    let allplayedenough_orTapis = 0; // nbr de joueurs qui ont payé
    let alltalkedThisTurn = 0; // nbr de joueurs qui  ont parlé
    this.activePlayers.map((p) => {
      allplayedenough_orTapis +=
        p.isTapis === true || p.currentBetTurn === this.gameCurrentBet;
      csl.log("iterate", p.currentBetTurn);
    });
    this.activePlayers.map(
      (p) => (alltalkedThisTurn += p.talkedThisTurn === true)
    );
    let aPlength = this.activePlayers.length; // nbr de joueurs total
    csl.log(
      "rotateFocusVictor",
      "Comptes : ",
      allplayedenough_orTapis,
      alltalkedThisTurn,
      this.currentBetTurn
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
      this.players.map((p) => (p.gameCurrentBet = 0));
      this.gameCurrentBet = 0;
      this.advanceStage();
      // return;
    }
    // Sinon quelqu'un doit encore jouer.

    // Gérer la fin du tour si le joueur actuel a misé le montant attendu et s'il est revenu au point de départ
    //ATTENTION A VERIFIER SI ça MARCHE AVEC FOLD   //+this.nbhostfolded
    // if (this.focus === this.playerBeforeNextTurn) {
    //   ///////////////////
    //   console.log("argent du focus", this.players[this.focus].howmanyBetTurn());
    //   //si l'argent de la game c est l'argent du joueurs qu'on regarde alors on reset et go next turn

    //   console.log(
    //     "gamecurrentbet",
    //     this.gameCurrentBet,
    //     "focusamiser",
    //     this.players[this.focus].howmanyBetTurn()
    //   );
    //   if (this.gameCurrentBet === this.players[this.focus].howmanyBetTurn()) {
    //     this.gameCurrentBet = 0;
    //     this.advanceStage();

    //     if (this.currentStage === "showdown" || this.currentStage === "end") {
    //       //FIN DES TOURS
    //       console.log("ROTATE FOCUS DANS END OU SHOWDOWN");
    //       return;
    //     }
    //     console.log(
    //       "LE FOCUS Etait:",
    //       this.focus,
    //       "et le starting:",
    //       this.startingPlayerIndex
    //     );
    //     this.focus = this.startingPlayerIndex + this.nbhostfolded;
    //     this.playerBeforeNextTurn = this.focus;
    //     if(this.focus >= this.players.length)
    //       return this.rotateFocus();

    //     //SI on est PAS  dans end ou shodown
    //     if (this.currentStage !== "end" && this.currentStage !== "showdown") {
    //       this.activePlayers.forEach((player) => {
    //         player.newTurnReset();
    //         //reset le status a chaque tour
    //         if (player.status !== "tapis") {
    //           player.playing();
    //         }
    //       });
    //       //a verifier pour le nbdefolded
    //       console.log(
    //         "startingplayer",
    //         this.startingPlayerIndex,
    //         this.nbhostfolded
    //       );
    //     }
    //   }

    //   //Faut rajouter le cas ou un joueur raise, il deviens alors le focus pour le tour puis pour pas qu'il
    //   //puisse reparler si tt le monde égalise et qu on reviens sur lui
    // } // Le joueur n'était pas le dernier à jouer ou tout le monde n'as pas misé autant.

    this.rotateTimer();
  }

  gameEnd() {
    this.focus = null;
    this.state = "waiting";
    this.updateActivePlayers();
    console.log(
      "Joueurs actifs lors de la détermination du gagnant:",
      this.activePlayers.map((p) => p.name)
    );

    this.activePlayers.forEach((player) => {
      player.revealCard(0);
      player.revealCard(1);
    });
    this.resetRestartCall();
    setTimeout(() => {
      if (this.allow_start) {
        this.updatePlayersList();
        if (this.players.length <= 1) {
          // Assurez-vous qu'il y a plus d'un joueur actif.
          console.log("Not enough players to start the game.");
          return;
        } else {
          this.newgame();
        }
      }
    }, 10000);
  }

  playerPlayed() {
    // let toCall = [];
    csl.log("classGame_PLAYER_PLAYED", "un joueur a joué");
    // if(this.hasAfk){
    //   toCall.push("REMOVE_AFK");
    // }
    // return toCall;
  }

  updateActivePlayers() {
    this.activePlayers = this.players.filter(
      (player) => player.isActive && !player.isAfk
    );
  }

  isPlayersTurn(playerId) {
    csl.log("isPlayersTurn", playerId, this.focus, this.activePlayers);
    if (this.focus < 0 || this.focus > this.players.length) this.rotateFocus();
    if (this.focus === null || this.players[this.focus].playerId !== playerId) {
      console.error("It's not this player's turn.");
      return false;
    }
    return true;
  }

  fold(player) {
    if (this.isPlayersTurn(player.getPlayerId())) {
      player.fold();
      // if (this.focus === this.playerBeforeNextTurn) {
      // this.nbhostfolded++;
      console.log("JE SUIS", this.focus);
      this.rotateFocus();
      console.log("J'ai rotate", this.focus);
      // this.playerBeforeNextTurn = this.focus;
      // } else {
      // this.rotateFocus();
      // }
      // this.updateActivePlayers();
      console.log("NOmbre de joururs actif :", this.activePlayers.length);
      // if (this.activePlayers.length < 2) {
      //   this.advanceStageToShowdown();
      //   return;
      // }
    }
  }

  check(player) {
    if (this.isPlayersTurn(player.getPlayerId())) {
      if (this.gameCurrentBet === 0) {
        player.check();
        this.rotateFocus();
      }
    }
  }

  bet(player, amount) {
    //Si c'est son tour de jouer
    if (this.isPlayersTurn(player.getPlayerId())) {
      //si il a assez d'argent
      //PEUT pas y avoir de else parce que le amount est envoyé du front, c est le front qui est bloquant
      if (player.getPlayerMoney() >= amount) {
        //Cas ou il ajoute a sa mise pour s'équilibrer au autre
        if (amount + player.howmanyBetTurn() >= this.gameCurrentBet) {
          if (amount === player.getPlayerMoney()) {
            player.tapis(amount);
            player.setTapis();
            console.log("TAPIS");
            // this.playerBeforeNextTurn = this.players.findIndex(
            //   (p) => p.getPlayerId() === player.getPlayerId()
            // );
            //TRUC A VERIFIER ---------------------------------------------------------------------------
            // this.playerBeforeNextTurn =
            //   (this.playerBeforeNextTurn + 1) % this.activePlayers.length;
          } else {
            player.bet(amount);
          }
          this.total += amount;
          //on met le max a la mise a mettre
          if (this.gameCurrentBet < player.howmanyBetTurn()) {
            this.gameCurrentBet = player.howmanyBetTurn();

            if (!player.status === "tapis") {
              player.raise();
            }
            // this.playerBeforeNextTurn = this.players.findIndex(
            //   (p) => p.getPlayerId() === player.getPlayerId()
            // );

            //console.log("lefocus avant le raise:", this.focus);
            //console.log("lefocus apres le raise", this.focus);
          }
        } else {
          //LE TAPIS OU J'ai MISER MOINS QUE LA GAME
          if (amount === player.getPlayerMoney()) {
            player.tapis(amount);
            player.setTapis();
            console.log("TAPIS");
            // this.playerBeforeNextTurn = this.players.findIndex(
            //   (p) => p.getPlayerId() === player.getPlayerId()
            // );
            //TRUC A VERIFIER ---------------------------------------------------------------------------
            // this.playerBeforeNextTurn =
            //   (this.playerBeforeNextTurn + 1) % this.activePlayers.length;
            this.total += amount;

            this.rotateFocus();
            return;
          }
        }
        //ça change juste le status si ça equivaut a un check (bet de 0)
        if (amount === 0) {
          player.check();
        }
        console.log("this line got executed", this.gameCurrentBet);
        this.rotateFocus();
      }
    }
  }

  activateBonus(player) {
    console.log("j'active le bonus du joueur : ", player.name);
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
          const playerMoney = p.getPlayerMoney();
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

  // startNewRound() {
  //   if (this.state === 'active') {
  //     this.startingPlayerIndex = (this.blind + 2) % this.players.length;
  //     this.focus = this.startingPlayerIndex;
  //     this.players.forEach(player => player.newRoundReset());
  //     this.currentStage = 'preflop';
  //   }
  // }

  removePlayer(playerId) {
    let player = this.allPlayers.find((p) => p.getPlayerId() === playerId);
    if (
      this.focus === this.players.findIndex((p) => p.getPlayerId() === playerId)
    )
      this.autoTurn(player, true);
    this.allPlayers = this.allPlayers.filter(
      (p) => p.getPlayerId() !== playerId
    );
    // this.players = this.players.filter((p) => p.getPlayerId() !== playerId);
    // this.updateActivePlayers();
  }

  addPlayer(player) {
    this.allPlayers.push(player);
    if (this.state !== "waiting" || player.playerMoney <= 0) {
      csl.log(
        "gameObject : addPlayer",
        "either or both is true: ",
        "Game is running :",
        this.state !== "waiting",
        this.state,
        "\nPlayer has no money :",
        player.playerMoney <= 0,
        player.playerMoney
      );
      player.isSpectator = true;
      player.isActive = false;
    } else if (!player.isSpectator && player.playerMoney >= this.blind) {
      //If not the first round, we make people pay to join.
      //If they can't, it's cancel.
      if (!this.firstRoundForRoom) {
        player.bet(this.blind);
      }
      this.players.push(player);
      this.checkForNewMaster();
    }
    console.log(player.playerMoney);
    console.log(`Player ${player.name} added.`);
  }

  movePlayersWithZeroCoinsToSpectators() {
    this.players.forEach((player) => {
      if (player.playerMoney <= 0) {
        player.isSpectator = true;
        player.isActive = false;
        console.log(
          `Player ${player.name} moved to spectators due to insufficient coins.`
        );
      } // if he has money and his the first we encouter, he's the potential new master if the master has no money.
    });
    this.checkForNewMaster();
    this.updatePlayersList();
  }

  checkForNewMaster() {
    let setNewMaster = false;

    // We check first to see if there is a master. If not we will need to either defined or set null again
    if (this.master === undefined || this.master === null) {
      csl.log(
        "checkForNewMaster whereIsTheMaster",
        "There's no master, searching is needed"
      );
      setNewMaster = true;
    } // Otherwise we check to see if the master has :
    //                                                - Enough Coins
    //                                                - Is not afk
    else {
      let M = this.allPlayers.find((p) => p.getPlayerId() === this.master);
      if (M.playerMoney <= 0 || M.isAFK) {
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
        if (player.playerMoney >= 0 && !player.isSpectator && !player.isAfk) {
          if (potentialMaster === undefined)
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

  start(playerId) {
    if (this.master === playerId) {
      console.log("Le master lance la game");
      // S'assurer que la liste des joueurs actifs est à jour avant de démarrer.
      this.movePlayersWithZeroCoinsToSpectators();
      this.updatePlayersList();

      if (this.state !== "waiting") {
        console.log("The game is not in a waiting state.");
        return;
      }

      if (this.players.length <= 1) {
        // Assurez-vous qu'il y a plus d'un joueur actif.
        console.log("Not enough players to start the game.");
        return;
      }

      console.log("newgame se lance");
      this.newgame();
    } else {
      // Pour les non-maîtres
      this.getPlayerById(playerId).unsetAfk();
      this.moveSpecOrPlayer(playerId);
    }
  }

  reset() {
    this.players = [];
    this.state = "waiting";
    this.activePlayers = [];
    this.deck.initCards();
    this.pokerTable.reset();
  }

  //Probmème:on devra surement clear l'affichage
  newgame() {
    if (!this.allow_start) return;
    console.log("Passe     if (!this.allow_start) return");
    this.allow_start = false;
    // this.activePlayers = this.players.filter(
    //   (player) => player.isActive && !player.isAfk
    // ); // Remplir la liste des joueurs actifs

    this.players.forEach((player) => {
      player.newRoundReset();
    });

    this.updateActivePlayers();

    if (this.activePlayers.length <= 1) {
      console.log(
        "pas assez de joueurs, if (this.activePlayers.length <= 1) {"
      );
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
    console.log("firstplayer: ", firstPlayer);
    firstPlayer.betinitial(this.gameCurrentBet / 2);
    this.total += this.gameCurrentBet / 2;

    this.rotateFocus();
    const nextPlayer = this.players[this.focus];
    console.log("nextPlayer: ", nextPlayer);
    nextPlayer.betinitial(this.gameCurrentBet);
    this.total += this.gameCurrentBet;

    this.rotateFocus();
    this.playerBeforeNextTurn = this.focus;

    //OU ICI

    //IL VA SUREMENT MANQUE UN JOUEUR A CHECK AVANT D'AFFICHER LE FLOP

    // console.log("length:",this.players.length);
    // console.log("active:",this.activePlayers.length);
  }

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
    // console.log(`Le gagnant est ${winner.name} avec ${winner.hand}`);
    console.log("winner est: ", winner);
    const nbwinner = winner.length;
    if (nbwinner >= 2) {
      for (let i = 0; i < nbwinner; i++) {
        const winnerHandName = winner[i].type;
        const aa = this.getPlayerById(winner[i].id);
        aa.playerHandName = winnerHandName;
        aa.seRemplirLesPoches(this.total / nbwinner);
        aa.jesuislewinner();
      }
    } else {
      const winnerHandName = winner[0].type;
      console.log("winner est: ", winner[0].id);
      console.log("WINNER EST:", this.getPlayerById(winner[0].id));
      const aa = this.players.find((p) => p.getPlayerId() === winner[0].id);
      aa.playerHandName = winnerHandName;
      console.log("aa", aa);
      if (aa.getStatus() === "tapis") {
        let maxwin =
          aa.betTotal * this.activePlayers.filter((p) => !p.alreadyWon).length;
        const prend = maxwin <= this.total ? maxwin : this.total;
        aa.seRemplirLesPoches(prend);
        this.total -= prend;
        // aa.isActive = false;
        aa.alreadyWon = true;
        csl.log("evaluateHandsWinnerTapis", maxwin, this.total, aa.isActive);
        //l'update esr fait au debut de la fonction
        aa.jesuislewinner();
        if (this.total > 0) {
          csl.log("evaluateHands", "Money left, check for another winner.");
          this.evaluateHands();
        }
      } else {
        csl.log('evaluateHands',"He won everything",aa.name);
        aa.seRemplirLesPoches(this.total);
        aa.jesuislewinner();
        this.total = 0;
      }
    }
  }

  //Debut de fonction pour le bonus, a terminer
  UseBonus(playerId) {
    this.activePlayers.forEach((player) => {
      player.bet(50);
    });
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
    console.log("je suis RENTREr DANS FLOP");
    const flopCards = this.deck.deal3Cards();
    console.log("les flopCards:", flopCards);

    // If dealCards() doesn't return exactly 3 cards, handle the error
    if (flopCards.length !== 3) {
      console.error("Unexpected number of cards dealt for the flop");
      return; // Exit the method or handle the error appropriately
    }

    // Update the community cards on the poker table with the flop cards
    this.pokerTable.communityCards = [...flopCards];
    console.log(this.pokerTable.communityCards);
  }

  /*
  In : nothing
  OUT : nothing but we push one card to the community cards (4 cards in total)
  */
  turn() {
    // burn a card before dealing the turn
    this.deck.burn();

    this.pokerTable.communityCards.push(this.deck.deal());
    console.log(this.pokerTable.communityCards);
  }

  /*
   * In : nothing
   * OUT : nothing but we push one card to the community cards (5 cards in total)
   */
  river() {
    // Burn a card before dealing the river
    this.deck.burn();

    this.pokerTable.communityCards.push(this.deck.deal());
    console.log(this.pokerTable.communityCards);
  }
  advanceStage() {
    if (this.state !== "active") {
      console.log("Game not active, cannot advance stage.");
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
        console.log("PASSE PAR LE CASE FLOP");
        console.log(
          "activePlayers.length au niveau de flop",
          this.activePlayers.length
        );
        this.flop();
        break;
      case "turn":
        this.turn();
        console.log("PASSE PAR LE CASE TURN");
        console.log(
          "activePlayers.length au niveau de turn",
          this.activePlayers.length
        );
        break;
      case "river":
        this.river();
        console.log("PASSE PAR LE CASE river");
        break;
      case "showdown":
        console.log("PASSE PAR LE CASE showdown");
        //this.state = "waiting";
        //------------------------------------------------------------------------------------------------
        // this.players.forEach((player) => {
        //   if(player.status==="tapis"){
        //     player.isActive=true;

        //   }
        // });
        this.updateActivePlayers();
        this.evaluateHands();
        clearTimeout(this.focusTurnCall);
        this.resetRestartCall();
        this.gameEnd();
        // setTimeout(() => {
        //   this.currentStage = stageOrder[nextIndex];
        //   this.advanceStage();
        // }, 5000);
        break;
      case "end":
        this.focus = null;
        console.log("PASSE PAR LE CASE end");
        break;
    }
  }

  resetRestartCall() {
    clearTimeout(this.resetRestartCall);
    this.restartTimer = Date.now() + this.restartDelay;
    this.restartCall = setTimeout(() => {
      this.allow_start = true;
    }, this.restartDelay);
  }

  advanceStageToShowdown() {
    if (this.state !== "active") {
      console.log("Game not active, cannot advance stage to showdown.");
      return;
    }

    // Définir directement le currentStage à 'showdown'
    this.currentStage = "river";
    this.advanceStage();
  }

  /*
   * Retrieves all active players in the game.
   * Returns an array of active player objects.
   */
  getActivePlayers() {
    return this.players.filter((player) => player.isPlayerActive());
  }

  make7Cards(player) {
    return {
      cards: [...this.pokerTable.communityCards, ...player.getPlayerCards()],
      id: player.getPlayerId(),
    };
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

  /*
   * IN : [j1, ...] liste des joueurs actifs
   * OUT : [{ poid, main, type }, ...] tableau des poids des mains des joueurs
   * FUNCTION : renvoi le tableau des poids des combinaisons de chaque joueur
   */
  listeCombinaison(activePlayers) {
    let res = [];

    console.log("activePlayers.length:", this.activePlayers.length);
    for (let i = 0; i < this.activePlayers.length; i++) {
      let f7c = this.make7Cards(this.activePlayers[i]);
      let c = this.combinaison(f7c.cards);
      c.id = f7c.id;
      res.push(c);
    }

    return res;
  }

  //result est vide mais ça passe et this.poker.table marche pas
  // determineWinner() {
  //   const results = this.listeCombinaison(this.getActivePlayers());
  //   console.log("results: ", results);
  //   return results;
  // }
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
      activePlayers.filter((p) => !p.alreadyWon)
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
   * To call to destroy the room. It will remove all timer etc...
   *
   */
  destroy() {
    csl.log("DESTROY", "Game is being destroy. Clearing timeout.");
    clearTimeout(this.focusTurnCall);
    clearTimeout(this.restartCall);
  }

  // showHands() {
  //   this.players.forEach((player) => {
  //     console.log(`${player.name}'s hand:`);
  //     player.getPlayerCards().forEach((card) => {
  //       console.log(card);
  //     });
  //     console.log();
  //   });
  // }
}

// const game = new Game();
// console.log(game);

// game.start();

// console.log(game);

// // game.showHands();

// game.flop();

// game.turn();

// game.river();

// game.make7Cards(game.players[0]);

module.exports = Game;
