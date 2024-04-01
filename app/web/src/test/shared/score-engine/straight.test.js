import Card from "../../../shared/Card";
import isStraight from "../../../shared/score-engine/straight";

describe("isStraight", () => {
  test("should return an array of 5 cards if a straight is found", () => {
    const sevenCards = [
      new Card(2, "D"),
      new Card(3, "H"),
      new Card(4, "S"),
      new Card(5, "C"),
      new Card(6, "D"),
      new Card(7, "H"),
      new Card(14, "H"),
    ];
    const result = isStraight(sevenCards);
    expect(result).toEqual([
      new Card(7, "H"),
      new Card(6, "D"),
      new Card(5, "C"),
      new Card(4, "S"),
      new Card(3, "H"),
    ]);
  });

  test("should return an array of 5 cards if a straight is found (14 is like 1 here)", () => {
    const sevenCards = [
      new Card(2, "D"),
      new Card(3, "H"),
      new Card(4, "S"),
      new Card(5, "C"),
      new Card(7, "D"),
      new Card(8, "H"),
      new Card(14, "H"),
    ];
    const result = isStraight(sevenCards);
    expect(result).toEqual([
      new Card(5, "C"),
      new Card(4, "S"),
      new Card(3, "H"),
      new Card(2, "D"),
      new Card(14, "H"),
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
    const result = isStraight(sevenCards);
    expect(result).toBe(false);
  });
});
