// import Card from "./Card.js";
const Card = require("./Card");

class Deck {
  constructor() {
    this.cards = []; // Array of Card objects representing the deck.
    this.communityCards = []; // Array of five cards.
    this.reset();
    // Initialize the deck with all 52 cards
  }

  // Methods to shuffle the deck, deal cards, etc.
  reset() {
    this.cards = [];
    const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
    const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1];

    for (let suit of suits) {
      for (let value of values) {
        this.cards.push(new Card(value, suit));
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
