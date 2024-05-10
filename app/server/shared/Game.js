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
      startingPlayerIndex: -1,
      focusTurnTimer: 0,
      focusTurnCall: false,
      autoTurnDelay: 60000,
      restartCall: false,
      restartTimer: 0,
      restartDelay: 5000,
      allow_start: true,
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
      nbhostfolded: this.nbhostfolded,
      gameCurrentBet: this.gameCurrentBet,
      focusTurnTimer: this.focusTurnTimer,
    });
    return g;
  }

  getActivePlayers() {
    return this.players.filter((player) => player.isActive);
  }

  updatePlayersList() {
    // Filtrer les joueurs qui ne sont pas spectateurs et qui sont actifs
    this.players = this.allPlayers.filter((player) => !player.isSpectator);
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

  createAutoTurnCall() {
    let n = this.focus;
    return setTimeout(() => {
      csl.log("autoTurn", "Player did not play fasst enough, auto fold");
      this.players[n].setAfk();
      this.hasAfk = true;
      this.fold(this.players[n]);
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
    if (this.activePlayers.length < 2) {
      this.advanceStageToShowdown();
      return;
    }

    const originalFocus = this.focus;
    this.focus = (this.focus + 1) % this.activePlayers.length; // Utilisation de activePlayers.length pour la rotation
    // Rotation du focus tant que le joueur actuel n'est pas actif
    while (!this.players[this.focus].isActive) {
      if (this.focus === originalFocus) {
        console.log("No active players available. Setting focus to null.");
        this.focus = null;
        return;
      }
      this.focus = (this.focus + 1) % this.activePlayers.length;
    }

    // Gérer la fin du tour si le joueur actuel a misé le montant attendu et s'il est revenu au point de départ
    if (this.focus === this.startingPlayerIndex + this.nbhostfolded) {
      console.log("argent du focus", this.players[this.focus].howmanyBetTurn());
      if (this.gameCurrentBet === this.players[this.focus].howmanyBetTurn()) {
        this.gameCurrentBet = 0;
        this.advanceStage();
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
          this.focus =
            (this.startingPlayerIndex + this.nbhostfolded) %
            this.activePlayers.length;
          console.log("POT TOTAL", this.total);
        }
      }

      //Faut rajouter le cas ou un joueur raise, il deviens alors le focus pour le tour puis pour pas qu'il
      //puisse reparler si tt le monde égalise et qu on reviens sur lui
    } // Le joueur n'était pas le dernier à jouer ou tout le monde n'as pas misé autant.

    this.rotateTimer();
  }

  playerPlayed() {
    let toCall = [];
    csl.log("classGame_PLAYER_PLAYED", "un joueur a joué");
    if(this.hasAfk){
      toCall.push("REMOVE_AFK");
    }
    return toCall;
  }

  updateActivePlayers() {
    this.activePlayers = this.players.filter((player) => player.isActive);
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
      if (this.focus === 0 + this.nbhostfolded) {
        console.log("testt: aledavant:", this.nbhostfolded);
        this.rotateFocus();
        this.nbhostfolded++;
        console.log("testt: aledapres:", this.nbhostfolded);
      } else {
        this.rotateFocus();
      }
    }
  }

  check(player) {
    console.log("PAR ICI");
    if (this.isPlayersTurn(player.getPlayerId())) {
      if (this.gameCurrentBet === 0) {
        player.check();
        //this.gameCurrentBet = 0; // Pour que le joueur suivant puisse vérifier s'il le souhaite.
        this.rotateFocus();
        // } else {
        //   if (player.howmanyBet() === this.gameCurrentBet) {
        //     player.check();
        //     this.rotateFocus();
        //   }
        //   console.log(
        //     "avant je re bet",
        //     this.gameCurrentBet - player.howmanyBet()
        //   );
        //   console.log(
        //     "la condition: ",
        //     player.getPlayerMoney() > this.gameCurrentBet - player.howmanyBet()
        //   );
        //   if (
        //     player.getPlayerMoney() >
        //     this.gameCurrentBet - player.howmanyBet()
        //   ) {
        //     console.log("je re bet", this.gameCurrentBet - player.howmanyBet());
        //     player.bet(this.gameCurrentBet - player.howmanyBet());
        //     player.call();
        //     this.rotateFocus();
        //   } else {
        //     //La faut faire en sorte de coller et couper le pot en deux avec les regles spéciale
        //   }
      }
    }
  }

  bet(player, amount) {
    //Si c'est son tour de jouer
    if (this.isPlayersTurn(player.getPlayerId())) {
      //si il a assez d'argent
      if (player.getPlayerMoney() >= amount) {
        //Cas ou il ajoute a sa mise pour s'équilibrer au autre
        if (amount + player.howmanyBetTurn() >= this.gameCurrentBet) {
          player.bet(amount);
          this.total += amount;
          //on met le max a la mise a mettre
          if (this.gameCurrentBet < player.howmanyBetTurn()) {
            this.gameCurrentBet = player.howmanyBetTurn();
            player.raise();
            this.focus = this.players.findIndex(
              (p) => p.getPlayerId() === player.getPlayerId()
            );
          }
        } else {
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

  // startNewRound() {
  //   if (this.state === 'active') {
  //     this.startingPlayerIndex = (this.blind + 2) % this.players.length;
  //     this.focus = this.startingPlayerIndex;
  //     this.players.forEach(player => player.newRoundReset());
  //     this.currentStage = 'preflop';
  //   }
  // }

  addPlayer(player) {
    this.allPlayers.push(player);
    if (this.state !== 'waiting'){
      player.isSpectator = true;
      player.isActive = false;
    }
    else if (!player.isSpectator) {
      this.players.push(player);
    }
    console.log(`Player ${player.name} added.`);
  }

  start(playerId) {
    if (this.master === playerId) {
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

      this.newgame();
    } else {
      // Pour les non-maîtres
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
    this.allow_start = false;
    clearTimeout(this.restartCall);
    this.players.forEach((player) => {
      player.newRoundReset();
    });
    this.state = "active";
    this.rotateStartingPlayer();
    this.focus = this.startingPlayerIndex;
    this.total = 0;
    this.activePlayers = this.players.filter((player) => player.isActive); // Remplir la liste des joueurs actifs
    this.pokerTable.reset();
    this.deck.initCards();
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

    this.currentStage="preflop";

    //IL VA SUREMENT MANQUE UN JOUEUR A CHECK AVANT D'AFFICHER LE FLOP

    // console.log("length:",this.players.length);
    // console.log("active:",this.activePlayers.length);
  }

  evaluateHands() {
    const activePlayers = this.getActivePlayers();
    const winner = this.gagnant(activePlayers);
    // console.log(`Le gagnant est ${winner.name} avec ${winner.hand}`);
    console.log("winner est: ", winner);
    console.log("winner est: ", winner[0].id);
    console.log("WINNER EST:", this.getPlayerById(winner[0].id));
    const aa = this.getPlayerById(winner[0].id);
    console.log("aa", aa);
    aa.seRemplirLesPoches(this.total);
    aa.jesuislewinner();
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
        this.evaluateHands();
        this.state = "waiting";
        clearTimeout(this.focusTurnCall);
        this.resetRestartCall();
        // setTimeout(() => {
        //   this.currentStage = stageOrder[nextIndex];
        //   this.advanceStage();
        // }, 5000);
        break;
      case "end":
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
  determineWinner() {
    const results = this.listeCombinaison(this.getActivePlayers());
    console.log("results: ", results);
    return results;
  }
  /*
   * IN : rien
   * OUT : { [c1, ..., c5], playerId } tableau de combinaison et identifiant du gagnant
   * FUNCTION : identifie le joueur gagnant de la partie et la main avec laquelle il a gagne
   */
  gagnant(activePlayers) {
    console.log(
      "Joueurs actifs lors de la détermination du gagnant:",
      activePlayers.map((p) => `${p.name}: ${p.isActive}`)
    );
    let combinationList = this.listeCombinaison(activePlayers);
    let maxList = scoreEngineUtils.maximums(combinationList, (x) => x.weight);

    if (maxList.length > 1) {
      return scoreEngineUtils.second(maxList);
    } else {
      return maxList;
    }
  }

  showHands() {
    this.players.forEach((player) => {
      console.log(`${player.name}'s hand:`);
      player.getPlayerCards().forEach((card) => {
        console.log(card);
      });
      console.log();
    });
  }
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
