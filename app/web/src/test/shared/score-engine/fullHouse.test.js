import Card from "../../../shared/Card";
import isFullHouse from "../../../shared/score-engine/fullHouse";

describe("isFullHouse", () => {
  test("should return an array of at most 5 cards if a full house is found", () => {
    const sevenCards = [
      new Card(3, "D"),
      new Card(2, "H"),
      new Card(2, "S"),
      new Card(2, "D"),
      new Card(10, "D"),
      new Card(10, "D"),
      new Card(10, "D"),
    ];
    const result = isFullHouse(sevenCards);
    expect(result).toEqual([
      new Card(10, "D"),
      new Card(10, "D"),
      new Card(10, "D"),
      new Card(2, "H"),
      new Card(2, "S"),
    ]);
  });

  test("should return false if no full house is found", () => {
    const sevenCards = [
      new Card(2, "D"),
      new Card(2, "H"),
      new Card(2, "S"),
      new Card(2, "D"),
      new Card(10, "D"),
      new Card(10, "D"),
      new Card(10, "D"),
    ];

    const result = isFullHouse(sevenCards);
    expect(result).toBe(false);
  });
});
