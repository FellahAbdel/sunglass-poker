import Card from "../../../shared/Card";
import isStraightFlush from "../../../shared/score-engine/straightFlush";

describe("isStraightFlush", () => {
  test("should return an array of 5 cards if a straight Flush is found", () => {
    const sevenCards = [
      new Card(2, "D"),
      new Card(3, "D"),
      new Card(4, "D"),
      new Card(5, "D"),
      new Card(6, "D"),
      new Card(7, "D"),
      new Card(14, "H"),
    ];
    const result = isStraightFlush(sevenCards);
    expect(result).toEqual([
      new Card(7, "D"),
      new Card(6, "D"),
      new Card(5, "D"),
      new Card(4, "D"),
      new Card(3, "D"),
    ]);
  });

  test("should return an array of 5 cards if a straight Flush is found (14 is like 1 here)", () => {
    const sevenCards = [
      new Card(2, "D"),
      new Card(3, "D"),
      new Card(4, "D"),
      new Card(5, "D"),
      new Card(7, "D"),
      new Card(8, "H"),
      new Card(14, "D"),
    ];
    const result = isStraightFlush(sevenCards);
    expect(result).toEqual([
      new Card(5, "D"),
      new Card(4, "D"),
      new Card(3, "D"),
      new Card(2, "D"),
      new Card(14, "D"),
    ]);
  });

  test("should return false if no royal flush is found", () => {
    const sevenCards = [
      new Card(10, "S"),
      new Card(11, "H"),
      new Card(4, "S"),
      new Card(13, "S"),
      new Card(14, "S"),
      new Card(2, "D"),
      new Card(3, "C"),
    ];
    const result = isStraightFlush(sevenCards);
    expect(result).toBe(false);
  });
});
