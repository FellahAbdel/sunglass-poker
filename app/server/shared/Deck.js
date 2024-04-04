const Card  = require("./Card.js");

class Deck {
  #cardsGame = [];

  constructor() {
    this.initCards();
    // Initialize the deck with all 52 cards
  }

  getCardsGame() {
    return this.#cardsGame;
  }

  initCards() {
    // on vide la liste de carte actuelle
    this.#cardsGame.splice(0, this.#cardsGame.length);

    // on la rempli de nouvelles cartes
    const colors = ["H", "S", "C", "D"];
    const number = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

    for (let color of colors) {
      for (let value of number) {
        this.#cardsGame.push(new Card(value, color));
      }
    }
  }

  shuffle() {
    for (let i = this.#cardsGame.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.#cardsGame[i], this.#cardsGame[j]] = [
        this.#cardsGame[j],
        this.#cardsGame[i],
      ];
    }
  }

  deal() {
    if (this.#cardsGame.length === 0) {
      throw new Error("Deck is empty");
    }
    return this.#cardsGame.pop();
  }

  deal3Cards() {
    if (this.#cardsGame.length === 0) {
      throw new Error("Deck is empty");
    }

    let threeCards = [];
    for (let i = 0; i < 3; i++) {
      threeCards.push(this.#cardsGame.pop());
    }

    return threeCards;
  }
}


module.exports = Deck;