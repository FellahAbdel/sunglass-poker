const Card = require("../../../shared/Card");
const isFourOfAKind = require("../../../shared/score-engine/fourOfAKind");

describe("isFourOfAKind", () => {
  test("should return an array of at most 5 cards if a four of kind is found", () => {
    const sevenCards = [
      { number: 2, color: "D" },
      { number: 2, color: "H" },
      { number: 2, color: "S" },
      { number: 2, color: "D" },
      { number: 10, color: "D" },
      { number: 11, color: "D" },
      { number: 13, color: "D" },
    ];
    const result = isFourOfAKind(sevenCards);
    expect(result).toEqual([
      { number: 2, color: "D" },
      { number: 2, color: "S" },
      { number: 2, color: "H" },
      { number: 2, color: "D" },
      { number: 13, color: "D" },
    ]);
  });

  test("should return false if no four of a kind is found", () => {
    const sevenCards = [
      { number: 2, color: "D" },
      { number: 3, color: "H" },
      { number: 2, color: "S" },
      { number: 2, color: "D" },
      { number: 10, color: "D" },
      { number: 11, color: "D" },
      { number: 13, color: "D" },
    ];
    const result = isFourOfAKind(sevenCards);
    expect(result).toBe(false);
  });
});
