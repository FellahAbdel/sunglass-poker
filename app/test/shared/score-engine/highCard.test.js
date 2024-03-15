const Card = require("../../../shared/Card");
const isHighCard = require("../../../shared/score-engine/highCard");

describe("isHighCard", () => {
  test("should return the highest card from a hand of 7 cards", () => {
    const hand = [
      { number: 2, color: "D" },
      { number: 4, color: "H" },
      { number: 6, color: "S" },
      { number: 8, color: "C" },
      { number: 10, color: "D" },
      { number: 11, color: "H" },
      { number: 13, color: "S" },
    ];
    const result = isHighCard(hand);
    expect(result).toEqual([
      { number: 13, color: "S" },
      { number: 11, color: "H" },
      { number: 10, color: "D" },
      { number: 8, color: "C" },
      { number: 6, color: "S" },
    ]);
  });

  test("should return the highest card if there are duplicates", () => {
    const hand = [
      { number: 2, color: "D" },
      { number: 4, color: "H" },
      { number: 6, color: "S" },
      { number: 8, color: "C" },
      { number: 10, color: "D" },
      { number: 11, color: "H" },
      { number: 13, color: "S" },
      { number: 13, color: "S" },
    ];
    const result = isHighCard(hand);
    expect(result).toEqual([
      { number: 13, color: "S" },
      { number: 13, color: "S" },
      { number: 11, color: "H" },
      { number: 10, color: "D" },
      { number: 8, color: "C" },
    ]);
  });
});
