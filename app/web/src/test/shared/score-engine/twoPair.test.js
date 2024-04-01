import Card from "../../../shared/Card";
import istwoPair from "../../../shared/score-engine/twoPair";

describe("istwoPair", () => {
  test("should return an array of 5 cards if one pair is found", () => {
    const sevenCards = [
      new Card(2, "D"),
      new Card(2, "H"),
      new Card(5, "S"),
      new Card(7, "C"),
      new Card(8, "D"),
      new Card(10, "H"),
      new Card(10, "S"),
    ];
    const result = istwoPair(sevenCards);
    expect(result.length).toBe(5);
    expect(result.some((card) => card.number === 2)).toBe(true);
  });

  test("should return false if no pair is found", () => {
    const sevenCards = [
      new Card(2, "D"),
      new Card(2, "H"),
      new Card(5, "S"),
      new Card(7, "C"),
      new Card(8, "D"),
      new Card(9, "H"),
      new Card(10, "S"),
    ];
    const result = istwoPair(sevenCards);
    expect(result).toBe(false);
  });

  test("should return the highest pair if multiple pairs are present", () => {
    const sevenCards = [
      new Card(2, "D"),
      new Card(2, "H"),
      new Card(5, "S"),
      new Card(5, "C"),
      new Card(8, "D"),
      new Card(9, "H"),
      new Card(10, "S"),
    ];
    const result = istwoPair(sevenCards);
    expect(result.length).toBe(5);
    expect(result.some((card) => card.number === 5)).toBe(true);
  });
});
