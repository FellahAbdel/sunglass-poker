import Card from "../../../shared/Card";
import isFourOfAKind from "../../../shared/score-engine/fourOfAKind";

describe("isFourOfAKind", () => {
  test("should return an array of at most 5 cards if a four of kind is found", () => {
    const sevenCards = [
      new Card(2, "D"),
      new Card(2, "H"),
      new Card(2, "S"),
      new Card(2, "D"),
      new Card(10, "D"),
      new Card(11, "D"),
      new Card(13, "D"),
    ];
    const result = isFourOfAKind(sevenCards);
    expect(result).toEqual([
      new Card(2, "D"),
      new Card(2, "S"),
      new Card(2, "H"),
      new Card(2, "D"),
      new Card(13, "D"),
    ]);
  });

  test("should return false if no four of a kind is found", () => {
    const sevenCards = [
      new Card(2, "D"),
      new Card(3, "H"),
      new Card(2, "S"),
      new Card(2, "D"),
      new Card(10, "D"),
      new Card(11, "D"),
      new Card(13, "D"),
    ];
    const result = isFourOfAKind(sevenCards);
    expect(result).toBe(false);
  });
});
