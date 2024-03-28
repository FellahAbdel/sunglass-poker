import Card from "../../shared/Card";
import isFlush from "../../shared/score-engine/flush";

describe("isFlush", () => {
  test("should return an array of at most 5 cards if a flush is found", () => {
    const sevenCards = [
      new Card(12, "D"),
      new Card(4, "D"),
      new Card(6, "D"),
      new Card(8, "D"),
      new Card(10, "D"),
      new Card(11, "D"),
      new Card(13, "D"),
    ];
    const result = isFlush(sevenCards);
    expect(result).toEqual([
      new Card(12, "D"),
      new Card(8, "D"),
      new Card(10, "D"),
      new Card(11, "D"),
      new Card(13, "D"),
    ]);
  });

  test("should return false if no flush is found", () => {
    const sevenCards = [
      new Card(2, "D"),
      new Card(4, "H"),
      new Card(6, "H"),
      new Card(8, "H"),
      new Card(10, "D"),
      new Card(11, "D"),
      new Card(13, "D"),
    ];
    const result = isFlush(sevenCards);
    expect(result).toBe(false);
  });
});
