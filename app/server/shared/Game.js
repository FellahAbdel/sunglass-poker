const hands = require("./score-engine/index");
const Deck = require("./Deck.js");
const PokerTable = require("./PokerTable.js");
const scoreEngineUtils = require("./ScoreEngineUtils.js");
const Players = require("./Player.js");
const { clearScreenDown } = require("readline");
const csl = require("../controller/intelligentLogging.js");

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
      blind: 0,
      focus: null,
      currentStage: "preflop",
      state: "waiting",
      total: 0,
      nbhostfolded: 0,
      gameCurrentBet: 0,
      startingPlayerIndex: 0,
      bonusAmount: 50,
      playerBeforeNextTurn:null,
      focusTurnTimer: 0,
      focusTurnCall: false,
      autoTurnDelay: 20000,
      restartCall: false,
      restartTimer: 0,
      restartDelay: 5000,
      allow_start: true,
      serverName:""
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
      playerBeforeNextTurn:this.playerBeforeNextTurn,
      nbhostfolded: this.nbhostfolded,
      gameCurrentBet: this.gameCurrentBet,
      focusTurnTimer: this.focusTurnTimer,
      serverName:this.serverName,
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
      player.toggleSpectator();
      this.updatePlayersList();
    } else {
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
    this.moveSpecOrPlayer(player.getPlayerId());
    player.setAfk();
  }

  createAutoTurnCall() {
    let n = this.focus;
    return setTimeout(() => {
      csl.log("autoTurn", "Player did not play fasst enough, auto fold");
      if (n < this.players.length && this.players[n] !== undefined) {
        this.hasAfk = true;
        this.fold(this.players[n]);
        this.setPlayerAFK(this.players[n]);
      }
    }, this.autoTurnDelay);
  }
  rotateTimer() {
    clearTimeout(this.focusTurnCall);
    this.focusTurnCall = this.createAutoTurnCall();
    this.focusTurnTimer = Date.now() + this.autoTurnDelay;
  }

  rotateFocus() {
    this.updateActivePlayers(); // Mise à jour de la liste des joueurs actifs
    // Vérification pour passer directement à showdown si moins de deux joueurs actifs
    if (this.activePlayers.length < 2 && !this.players[this.focus].status==="tapis") {
      this.advanceStageToShowdown();
      return;
    }

    if (this.currentStage === "showdown" || this.currentStage === "end") {
      console.log("ROTATE FOCUS DANS END OU SHOWDOWN");
      return;
    }

    const originalFocus = this.focus;
    console.log("original",originalFocus);

    this.focus = (this.focus + 1) % this.players.length;
    console.log("focusapresoriginal",this.focus);
    console.log("isACtive?",this.players[this.focus].isActive);
    // Rotation du focus tant que le joueur actuel n'est pas actif
    while (!this.players[this.focus].isActive) {
      if (this.focus === originalFocus) {
        console.log("No active players available. Setting focus to null.");
        return;
      }
      this.focus = (this.focus + 1) % this.players.length;
      console.log("Jéfékoiici",this.focus);
      console.log("isACtivejéfé?",this.players[this.focus].isActive);
    }

    // Gérer la fin du tour si le joueur actuel a misé le montant attendu et s'il est revenu au point de départ
    //ATTENTION A VERIFIER SI ça MARCHE AVEC FOLD   //+this.nbhostfolded 
    if (this.focus === this.playerBeforeNextTurn) { ///////////////////
      console.log("argent du focus", this.players[this.focus].howmanyBetTurn());
      //si l'argent de la game c est l'argent du joueurs qu'on regarde alors on reset et go next turn
      
      console.log("gamecurrentbet",this.gameCurrentBet,"focusamiser",this.players[this.focus].howmanyBetTurn());
      if (this.gameCurrentBet === this.players[this.focus].howmanyBetTurn()) {
        this.gameCurrentBet = 0;
        this.advanceStage();

        if (this.currentStage === "showdown" || this.currentStage === "end") {
          //FIN DES TOURS
          console.log("ROTATE FOCUS DANS END OU SHOWDOWN");
          return;
        }
        console.log(
          "LE FOCUS Etait:",
          this.focus,
          "et le starting:",
          this.startingPlayerIndex
        );                      
        this.focus = this.startingPlayerIndex+this.nbhostfolded;
        this.playerBeforeNextTurn=this.focus;

        //SI on est PAS  dans end ou shodown
        if (this.currentStage !== "end" && this.currentStage !== "showdown") {
          this.activePlayers.forEach((player) => {
            player.newTurnReset();
            //reset le status a chaque tour
            player.playing();
          });
          //a verifier pour le nbdefolded
          console.log(
            "startingplayer",
            this.startingPlayerIndex,
            this.nbhostfolded
          );
        }
      }

      //Faut rajouter le cas ou un joueur raise, il deviens alors le focus pour le tour puis pour pas qu'il
      //puisse reparler si tt le monde égalise et qu on reviens sur lui
    } // Le joueur n'était pas le dernier à jouer ou tout le monde n'as pas misé autant.

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
    if (this.focus === null || this.players[this.focus].playerId !== playerId) {
      console.error("It's not this player's turn.");
      return false;
    }
    return true;
  }

  fold(player) {
    if (this.isPlayersTurn(player.getPlayerId())) {
      player.fold();
      this.updateActivePlayers();
      console.log("NOmbre de joururs actif :", this.activePlayers.length);
      if (this.activePlayers.length < 2) {
        this.advanceStageToShowdown();
        return;
      }                    
      if (this.focus === this.playerBeforeNextTurn+this.nbhostfolded ) {
        this.nbhostfolded++;
        console.log("JE SUIS",this.focus);
        this.rotateFocus();
        console.log("J'ai rotate" ,this.focus);
        this.playerBeforeNextTurn=this.focus;

      } else {
        this.rotateFocus();
      }
    }
  }

  check(player) {
    console.log("AAA");
    if (this.isPlayersTurn(player.getPlayerId())) {
      console.log("BBB",this.gameCurrentBet);
      if (this.gameCurrentBet === 0) {
        console.log("CCC");
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
        if(amount + player.howmanyBetTurn() >= this.gameCurrentBet) {
          if(amount===player.getPlayerMoney()){
            player.tapis(amount);
            player.setTapis();
            console.log("TAPIS");
            this.playerBeforeNextTurn = this.players.findIndex(
              (p) => p.getPlayerId() === player.getPlayerId()
            );
            //TRUC A VERIFIER ---------------------------------------------------------------------------
            this.playerBeforeNextTurn=(this.playerBeforeNextTurn+1)%this.activePlayers.length
          }
          else{
            player.bet(amount);
          }
          this.total += amount;
          //on met le max a la mise a mettre
          if (this.gameCurrentBet < player.howmanyBetTurn()) {
            this.gameCurrentBet = player.howmanyBetTurn();
            
            if(!player.status==="tapis"){
              player.raise();
            }
            this.playerBeforeNextTurn = this.players.findIndex(
              (p) => p.getPlayerId() === player.getPlayerId()
            );

            //console.log("lefocus avant le raise:", this.focus);
            //console.log("lefocus apres le raise", this.focus);
          }
        } else {
          //LE TAPIS OU J'ai MISER MOINS QUE LA GAME 
          return;
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

  activateBonus(player){
    console.log("j'active le bonus du joueur : ", player.name);
    if (this.isPlayersTurn(player.getPlayerId())) {
      const playerBonus = player.getPlayerBonus();
      const self = this;

      if (playerBonus.ready) {
        // On va parcourrir liste de joueur actifs dans l'ordre du tour de jeu
        // On commence par le joueur qui a active le bonus car c'est son tour
        // On parcours toute liste de maniere circulaire jusqu'a retomber sur lui
        let startIndex = this.activePlayers.findIndex((p) => p.getPlayerId() === player.getPlayerId());
        let index = startIndex;

        do {
          let p = this.activePlayers[index];
          const playerMoney = p.getPlayerMoney();
          const amountToBet = playerMoney < self.bonusAmount 
                              ? playerMoney : self.bonusAmount
          p.betBonus(amountToBet);
          this.total+=amountToBet;
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
    this.allPlayers = this.allPlayers.filter(
      (p) => p.getPlayerId() !== playerId
    );
    // this.players = this.players.filter((p) => p.getPlayerId() !== playerId);
    // this.updateActivePlayers();
  }

  addPlayer(player) {
    this.allPlayers.push(player);
    if (this.state !== "waiting") {
      player.isSpectator = true;
      player.isActive = false;
    } else if (!player.isSpectator) {
      this.players.push(player);
    }
    console.log(`Player ${player.name} added.`);
  }

  start(playerId) {
    if (this.master === playerId) {
      console.log("Le master lance la game");
      // S'assurer que la liste des joueurs actifs est à jour avant de démarrer.
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

    this.currentStage = "preflop";
    this.state = "active";
    this.rotateStartingPlayer();
    this.focus = this.startingPlayerIndex;
    this.playerBeforeNextTurn=this.startingPlayerIndex;
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
    this.playerBeforeNextTurn=this.focus;

    //OU ICI 


    //IL VA SUREMENT MANQUE UN JOUEUR A CHECK AVANT D'AFFICHER LE FLOP

    // console.log("length:",this.players.length);
    // console.log("active:",this.activePlayers.length);
  }

  evaluateHands() {
    this.updateActivePlayers();

    const winner = this.gagnant(this.activePlayers);
    // console.log(`Le gagnant est ${winner.name} avec ${winner.hand}`);
    console.log("winner est: ", winner);
    const nbwinner= winner.length;
    if (nbwinner >= 2) {
      for (let i = 0; i < nbwinner; i++) {
        const winnerHandName = winner[i].type;
        const aa = this.getPlayerById(winner[i].id);
        aa.playerHandName = winnerHandName;
        aa.seRemplirLesPoches(this.total / nbwinner);
        aa.jesuislewinner();
      }
    }    
    else{
      const winnerHandName = winner[0].type;
      console.log("winner est: ", winner[0].id);
      console.log("WINNER EST:", this.getPlayerById(winner[0].id));
      const aa = this.getPlayerById(winner[0].id);
      aa.playerHandName = winnerHandName;
      console.log("aa", aa);
      aa.seRemplirLesPoches(this.total);
      aa.jesuislewinner();
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
        this.players.forEach((player) => {
          if(player.status==="tapis"){
            player.isActive=true;

          }
        });
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
    let combinationList = this.listeCombinaison(activePlayers);
    let maxList = scoreEngineUtils.maximums(combinationList, (x) => x.weight);

    if (maxList.length > 1) {
      return scoreEngineUtils.second(maxList);
    } else {
      return maxList;
    }
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
