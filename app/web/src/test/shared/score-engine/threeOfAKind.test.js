const Card = require("../../../shared/Card");
const isthreeOfAKind = require("../../../shared/score-engine/threeOfAKind");

describe("isthreeOfAKind", () => {
  test("should return an array of 5 cards if a three of a kind is found", () => {
    const sevenCards = [
      new Card(2, "D"),
      new Card(2, "H"),
      new Card(2, "S"),
      new Card(7, "C"),
      new Card(8, "D"),
      new Card(9, "H"),
      new Card(10, "S"),
    ];
    const result = isthreeOfAKind(sevenCards);
    expect(result.length).toBe(5);
    expect(result.some((card) => card.number === 2)).toBe(true);
  });

  test("should return false if no three of a kind is found", () => {
    const sevenCards = [
      new Card(2, "D"),
      new Card(4, "H"),
      new Card(5, "S"),
      new Card(7, "C"),
      new Card(8, "D"),
      new Card(9, "H"),
      new Card(10, "S"),
    ];
    const result = isthreeOfAKind(sevenCards);
    expect(result).toBe(false);
  });

  test("should return the highest threeOfAKind if multiple threeOfAKinds are present", () => {
    const sevenCards = [
      new Card(2, "D"),
      new Card(2, "H"),
      new Card(5, "S"),
      new Card(5, "C"),
      new Card(5, "D"),
      new Card(2, "H"),
      new Card(10, "S"),
    ];
    const result = isthreeOfAKind(sevenCards);
    expect(result.length).toBe(5);
    expect(result.some((card) => card.number === 5)).toBe(true);
  });
});
