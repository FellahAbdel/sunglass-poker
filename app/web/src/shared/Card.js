export class Card {
  constructor(number, color) {
    this.color = color;
    this.number = number;
  }

  getCardString() {
    return `${this.number} of ${this.color}`;
  }
}
