const Card = require("../../../shared/Card");
const isHighCard = require("../../../shared/score-engine/highCard");

describe("isHighCard", () => {
  test("should return the highest card from a hand of 7 cards", () => {
    const hand = [
      new Card(2, "D"),
      new Card(4, "H"),
      new Card(6, "S"),
      new Card(8, "C"),
      new Card(10, "D"),
      new Card(11, "H"),
      new Card(13, "S"),
    ];
    const result = isHighCard(hand);
    expect(result).toEqual([
      new Card(13, "S"),
      new Card(11, "H"),
      new Card(10, "D"),
      new Card(8, "C"),
      new Card(6, "S"),
    ]);
  });

  test("should return the highest card if there are duplicates", () => {
    const hand = [
      new Card(2, "D"),
      new Card(4, "H"),
      new Card(6, "S"),
      new Card(8, "C"),
      new Card(10, "D"),
      new Card(11, "H"),
      new Card(13, "S"),
      new Card(13, "S"),
    ];
    const result = isHighCard(hand);
    expect(result).toEqual([
      new Card(13, "S"),
      new Card(13, "S"),
      new Card(11, "H"),
      new Card(10, "D"),
      new Card(8, "C"),
    ]);
  });
});
