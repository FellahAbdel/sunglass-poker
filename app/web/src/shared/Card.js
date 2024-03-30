export class Card {
  constructor(number, color) {
    this.color = color;
    this.number = number;
  }

  getNumberAndColor() {
    return [this.number.toString(), this.color];
  }

  getCardString() {
    return `${this.number}_of_${this.color}`;
  }
}
