const Card = require("../../../shared/Card");
const isFlush = require("../../../shared/score-engine/flush");

describe("isFlush", () => {
  test("should return an array of at most 5 cards if a flush is found", () => {
    const sevenCards = [
      { number: 12, color: "D" },
      { number: 4, color: "D" },
      { number: 6, color: "D" },
      { number: 8, color: "D" },
      { number: 10, color: "D" },
      { number: 11, color: "D" },
      { number: 13, color: "D" },
    ];
    const result = isFlush(sevenCards);
    expect(result).toEqual([
      { number: 12, color: "D" },
      { number: 8, color: "D" },
      { number: 10, color: "D" },
      { number: 11, color: "D" },
      { number: 13, color: "D" },
    ]);
  });

  test("should return false if no flush is found", () => {
    const sevenCards = [
      { number: 2, color: "D" },
      { number: 4, color: "H" },
      { number: 6, color: "H" },
      { number: 8, color: "H" },
      { number: 10, color: "D" },
      { number: 11, color: "D" },
      { number: 13, color: "D" },
    ];
    const result = isFlush(sevenCards);
    expect(result).toBe(false);
  });
});
