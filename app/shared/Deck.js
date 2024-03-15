// import Card from "./Card.js";
const Card = require("./Card");

class Deck {
  #cardsGame = [];

  constructor() {
    this.communityCards = []; // Array of five cards.
    this.initCards();
    // Initialize the deck with all 52 cards
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
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  deal() {
    if (this.cards.length === 0) {
      throw new Error("Deck is empty");
    }
    return this.cards.pop();
  }

  deal3Cards() {
    if (this.cards.length === 0) {
      throw new Error("Deck is empty");
    }

    let cards = [];
    for (let i = 0; i < 3; i++) {
      cards.push(this.cards.pop());
    }

    return cards;
  }
}

module.exports = Deck;
