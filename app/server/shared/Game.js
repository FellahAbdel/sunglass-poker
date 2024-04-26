const hands = require("./score-engine/index.js");
const Deck = require("./Deck.js");
const PokerTable = require("./PokerTable.js");
const scoreEngineUtils = require("./ScoreEngineUtils.js");

class Game {
  master = false;
  focus = null;
  constructor() {
    this.players = [];
    this.deck = new Deck();
    this.pokerTable = new PokerTable();
    // Owner of the room
    this.master = false;
    // Big blind
    this.blind = 0;
    // Player turn
    this.focus = null;
    this.currentStage = 'preflop';
    this.state = 'waiting';
  }

  setMaster(id){
    this.master = id;
  }
  getMaster(){
    return this.master;
  }
  setFocus(n){
    if (n >= 0 && n < this.players.length) {
      this.focus = n;
    }
  }
  getFocus(){
    return this.focus;
  }
  rotateFocus() {
    this.focus = (this.focus + 1) % this.players.length;
    if (this.focus === this.startingPlayerIndex) {
      this.advanceStage();
    }
  }

  startNewRound() {
    if (this.state === 'active') {
      this.startingPlayerIndex = (this.blind + 2) % this.players.length;
      this.focus = this.startingPlayerIndex;
      this.players.forEach(player => player.newRoundReset());
      this.currentStage = 'preflop';
    }
  }

  addPlayer(playerId) {
    if (this.state === 'waiting' && !this.players.includes(playerId)) {
      this.players.push(playerId);
    } else {
      console.log("Cannot add new players at this stage or player already added.");
    }
  }

  start(playerId) {
    console.log("PlayerID Game.js start :", playerId);

    if (this.master !== playerId) {
      console.log("Only the master can start the game.");
      return;
    }
    if (this.state !== 'waiting') {
      console.log("The game is not in a waiting state.");
      return;
    }
    if (this.players.length <= 1) {
      console.log("Not enough players to start the game.");
      return;
    }
  
    this.state = 'active';
    this.deck.initCards();
    this.deck.shuffle();
    this.players.forEach(player => {
      player.clearHand();
      for (let i = 0; i < 2; i++) {
        player.addCard(this.deck.deal());
      }
    });
    this.advanceStage();
  }

  // start() {
  //   // Reset deck and shuffle
  //   this.deck.initCards();
  //   this.deck.shuffle();

  //   // Deal cards to each player
  //   this.players.forEach((player) => {
  //     player.clearHand();
  //     for (let i = 0; i < 2; i++) {
  //       player.addCard(this.deck.deal());
  //     }
  //   });
  // }

  evaluateHands() {
    const results = this.listeCombinaison(this.getActivePlayers());
    const winner = this.determineWinner(results);
    console.log(`Le gagnant est ${winner.name} avec ${winner.hand}`);
  }

  /*
  in : nothing
  out : nothing but we update the communityCards by pushing three cards in the 
        pokerTable cards.
  */
  flop() {
    // Deal 3 cards for the flop
    const flopCards = this.deck.deal3Cards();

    // If dealCards() doesn't return exactly 3 cards, handle the error
    if (flopCards.length !== 3) {
      console.error("Unexpected number of cards dealt for the flop");
      return; // Exit the method or handle the error appropriately
    }

    // Update the community cards on the poker table with the flop cards
    this.pokerTable.communityCards = [...flopCards];
  }

  /*
  In : nothing
  OUT : nothing but we push one card to the community cards (4 cards in total)
  */
  turn() {
    this.pokerTable.communityCards.push(this.deck.deal());
  }

  advanceStage() {
    if (this.state !== 'active') {
      console.log("Game not active, cannot advance stage.");
      return;
    }
    const stageOrder = ['preflop', 'flop', 'turn', 'river', 'showdown'];
    const currentIndex = stageOrder.indexOf(this.currentStage);
    const nextIndex = (currentIndex + 1) % stageOrder.length;
    this.currentStage = stageOrder[nextIndex];
  
    switch (this.currentStage) {
      case 'flop':
        this.flop();
        break;
      case 'turn':
        this.turn();
        break;
      case 'river':
        this.river();
        break;
      case 'showdown':
        this.evaluateHands();
        break;
    }
  }

  /*
   * In : nothing
   * OUT : nothing but we push one card to the community cards (5 cards in total)
   */
  river() {
    this.pokerTable.communityCards.push(this.deck.deal());
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

    for (let i = 0; i < activePlayers.length; i++) {
      let f7c = this.make7Cards(activePlayers[i]);
      let c = this.combinaison(f7c.cards);
      c.id = f7c.id;
      res.push(c);
    }

    return res;
  }

  /*
   * IN : rien
   * OUT : { [c1, ..., c5], playerId } tableau de combinaison et identifiant du gagnant
   * FUNCTION : identifie le joueur gagnant de la partie et la main avec laquelle il a gagne
   */
  gagnant() {
    let activeUsers = this.getActivePlayers();
    let combinationList = this.listeCombinaison(activeUsers);
    let maxList = scoreEngineUtils.maximums(combinationList, (x) => x.weight);

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

      let res = [];
      for (let i = 0; i < winners.length; i++) {
        for (let j = 0; j < maxList.length; j++) {
          if (winners[i] === maxList[j].id) {
            res.push(maxList[j]);
          }
        }
      }

      return res;
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
