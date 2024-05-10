const hands = require("./score-engine/index");
const Deck = require("./Deck.js");
const PokerTable = require("./PokerTable.js");
const scoreEngineUtils = require("./ScoreEngineUtils.js");
const Players = require("./Player.js");
const { clearScreenDown } = require("readline");
const csl = require("../controller/intelligentLogging.js");

class Game {
  constructor(
    ...args
  ) {
    let basedValue = {
      "players": [],
      "spectators": [],
      "deck": new Deck(),
      "pokerTable": new PokerTable(),
      "master": false,
      "blind": 0,
      "focus": null,
      "currentStage": "preflop",
      "state": "waiting",
      "total": 0,
      "nbhostfolded": 0,
      "gameCurrentBet": 0,
      "startingPlayerIndex": -1,
      "focusTurnTimer": 0,
      "focusTurnCall": false,
      "autoTurnDelay": 60000,
      "restartCall": false,
      "restartTimer": 0,
      "restartDelay": 5000,
      "allow_start": true,
    };
    Object.assign(this,basedValue,...args);
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
      "players":filteredPlayer,
      "spectators":this.spectators,
      "pokerTable":this.pokerTable,
      "master:":this.master,
      "blind":this.blind,
      "focus":this.focus,
      "currentStage":this.currentStage,
      "state":this.state,
      "total":this.total,
      "nbhostfolded":this.nbhostfolded,
      "gameCurrentBet":this.gameCurrentBet,
      "focusTurnTimer":this.focusTurnTimer
    });
    return g;
  }

  getActivePlayers() {
    return this.players.filter((player) => player.isActive);
  }

  getPlayerNameById(playerId) {
    const player = this.players.find((p) => p.playerId === playerId);
    if (player) {
      return player.name;
    } else {
      console.error("Player not found with ID:", playerId);
      return null;
    }
  }

  addSpectator(player) {
    if (
      !this.spectators.some((s) => s.getPlayerId() === player.getPlayerId())
      && !this.players.findIndex(p => p.getPlayerId() === player.getPlayerId())
    ) {
      this.spectators.push(player);
      console.log(`Spectator ${player.getPlayerId()} added.`);
    } else {
      console.log("Spectator already present.");
    }
  }

  spectatorJoinGame(spectatorId) {
    if (this.currentStage === "showdown" || this.currentStage === "preflop") {
      const index = this.spectators.indexOf(spectatorId);
      if (index !== -1) {
        this.spectators.splice(index, 1); // Retirer de la liste des spectateurs
        this.addPlayer(spectatorId); // Ajouter à la liste des joueurs
        console.log(
          `Spectator ${spectatorId} has joined the game as a player.`
        );
      } else {
        console.log("Spectator not found.");
      }
    }
  }

  convertSpectatorToPlayer(playerId) {
    let index = this.spectators.findIndex((s) => s.getPlayerId() === playerId);
    if (index !== -1 && this.state === "waiting") {
      let player = this.spectators.splice(index, 1)[0];
      this.players.push(player);
      console.log(`Spectator ${playerId} is now a player.`);
    } else {
      console.log("Cannot convert spectator to player.");
    }
  }

  getPlayerById(playerId) {
    const player = this.players.find((p) => p.playerId === playerId);
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
        this.activePlayers.forEach((player) => {
          player.newTurnReset();
          //reset le status a chaque tour
          player.playing();
        });
        //a verifier pour le nbdefolded
        console.log("startingplayer",this.startingPlayerIndex,this.nbhostfolded);
        this.focus=(this.startingPlayerIndex+this.nbhostfolded)% this.activePlayers.length;;
        console.log("POT TOTAL", this.total);
      }

      //Faut rajouter le cas ou un joueur raise, il deviens alors le focus pour le tour puis pour pas qu'il
      //puisse reparler si tt le monde égalise et qu on reviens sur lui
    } // Le joueur n'était pas le dernier à jouer ou tout le monde n'as pas misé autant.

    this.rotateTimer();
  }

  playerPlayed() {
    csl.log("classGame_PLAYER_PLAYED", "un joueur a joué");
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
            this.focus=this.players.findIndex( p => p.getPlayerId() === player.getPlayerId());
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
    console.log("Trying to add player:", player);
    const exists = this.players.concat(this.spectators).some(p => p.getPlayerId() === player.getPlayerId());
    console.log("Exists in players or spectators:", exists);
  
    if (exists) {
      console.log("Player already in game or spectator list.");
      return false;
    }
  
    console.log("Master ID is currently:", this.master);
    if (player.getPlayerId() === this.master) {
      this.players.push(player);
      console.log(`Master player ${player.getPlayerId()} added as active player. Players now:`, this.players);
    } else {
      this.spectators.push(player);
      console.log(`Player ${player.getPlayerId()} added as spectator. Spectators now:`, this.spectators);
    }
    return true;
  }

  start(playerId) {
    if (this.master !== playerId) {
      // Si ce n'est pas le maître, vérifier si c'est un spectateur qui veut rejoindre
      if (this.spectators.includes(playerId)) {
        this.spectatorJoinGame(playerId); // Tente de faire rejoindre le spectateur
        console.log(`Spectator ${playerId} attempting to join the game.`);
      } else {
        console.log("Only the master can start the game");
      }
      return;
    }
    if (this.state !== "waiting") {
      console.log("The game is not in a waiting state.");
      return;
    }
    if (this.players.length <= 1) {
      console.log("Not enough players to start the game.");
      return;
    }

    this.newgame();
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
    this.pokerTable.communityCards.push(this.deck.deal());
    console.log(this.pokerTable.communityCards);
  }

  /*
   * In : nothing
   * OUT : nothing but we push one card to the community cards (5 cards in total)
   */
  river() {
    this.pokerTable.communityCards.push(this.deck.deal());
    console.log(this.pokerTable.communityCards);
  }
  advanceStage() {
    if (this.state !== "active") {
      console.log("Game not active, cannot advance stage.");
      return;
    }
    const stageOrder = ["preflop", "flop", "turn", "river", "showdown", "end"];
    const currentIndex = stageOrder.indexOf(this.currentStage);
    const nextIndex = (currentIndex + 1) % stageOrder.length;
    this.currentStage = stageOrder[nextIndex];

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
    this.restartTimer = Date.now()+this.restartDelay;
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
      console.log("f7c:", f7c);
      let c = this.combinaison(f7c.cards);
      console.log("c:", c);
      c.id = f7c.id;
      console.log("resavantlepush:", res);
      res.push(c);
      console.log("resapreslepush:", res);
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
    console.log("maxListapresinit", maxList);

    if (maxList.length > 1) {
      let winners = [];

      switch (maxList[0].type) {
        case "StraightFlush":
          winners = scoreEngineUtils.secondCarteHaute(maxList);
          break;
        case "FourOfAKind":
          winners = scoreEngineUtils.secondCarre(maxList);
          break;
        case "FullHouse":
          winners = scoreEngineUtils.secondFull(maxList);
          break;
        case "Flush":
          winners = scoreEngineUtils.secondCarteHaute(maxList);
          break;
        case "Straight":
          winners = scoreEngineUtils.secondSuite(maxList);
          break;
        case "ThreeOfAKind":
          winners = scoreEngineUtils.secondBrelan(maxList);
          break;
        case "TwoPair":
          winners = scoreEngineUtils.secondDoublePaire(maxList);
          break;
        case "OnePair":
          winners = scoreEngineUtils.secondPaire(maxList);
          break;
        case "HighCard":
          winners = scoreEngineUtils.secondCarteHaute(maxList);
          break;
      }

      console.log("maxListapres switch", maxList);
      let res = [];
      console.log("winners.length", winners.length);
      for (let i = 0; i < winners.length; i++) {
        for (let j = 0; j < maxList.length; j++) {
          if (winners[i] === maxList[j].id) {
            res.push(maxList[j]);
          }
        }
      }
      console.log("res", res);
      return res;
    } else {
      console.log("maxList", maxList);
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
