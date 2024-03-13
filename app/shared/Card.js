class Card {
  constructor(value, suit) {
    this.suit = suit;
    this.value = value;
  }

  getCardString() {
    return `${this.value} of ${this.suit}`;
  }
}

module.exports = Card;
