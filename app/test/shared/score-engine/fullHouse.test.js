const Card = require("../../../shared/Card");
const isFullHouse = require("../../../shared/score-engine/fullHouse");

describe("isFullHouse", () => {
  test("should return an array of at most 5 cards if a full house is found", () => {
    const sevenCards = [
      { number: 3, color: "D" },
      { number: 2, color: "H" },
      { number: 2, color: "S" },
      { number: 2, color: "D" },
      { number: 10, color: "D" },
      { number: 10, color: "D" },
      { number: 10, color: "D" },
    ];
    const result = isFullHouse(sevenCards);
    expect(result).toEqual([
      { number: 10, color: "D" },
      { number: 10, color: "D" },
      { number: 10, color: "D" },
      { number: 2, color: "H" },
      { number: 2, color: "S" },
    ]);
  });

  test("should return false if no full house is found", () => {
    const sevenCards = [
      { number: 2, color: "D" },
      { number: 2, color: "H" },
      { number: 2, color: "S" },
      { number: 2, color: "D" },
      { number: 10, color: "D" },
      { number: 10, color: "D" },
      { number: 10, color: "D" },
    ];

    const result = isFullHouse(sevenCards);
    expect(result).toBe(false);
  });
});
