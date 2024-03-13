class Game {
  constructor() {
    this.players = [];
    this.deck = new Deck();
  }

  addPlayer(player) {
    this.players.push(player);
  }

  start() {
    // Reset deck and shuffle
    this.deck.reset();
    this.deck.shuffle();

    // Deal cards to each player
    this.players.forEach((player) => {
      player.clearHand();
      for (let i = 0; i < 5; i++) {
        player.addCard(this.deck.deal());
      }
    });
  }

  showHands() {
    this.players.forEach((player) => {
      console.log(`${player.name}'s hand:`);
      player.hand.forEach((card) => {
        console.log(`${card.value} of ${card.suit}`);
      });
      console.log();
    });
  }
}

export default Game;
