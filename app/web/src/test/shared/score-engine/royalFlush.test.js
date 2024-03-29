import Card from "../../../shared/Card";
import isRoyalFlush from "../../../shared/score-engine/royalFlush";

describe("isRoyalFlush", () => {
  test("should return an array of 5 cards if a royal flush is found", () => {
    const sevenCards = [
      new Card(10, "H"),
      new Card(11, "H"),
      new Card(12, "H"),
      new Card(13, "H"),
      new Card(14, "H"),
      new Card(2, "D"),
      new Card(3, "C"),
    ];
    const result = isRoyalFlush(sevenCards);
    expect(result.length).toBe(5);
    expect(result.every((card) => card.color === "H")).toBe(true);
    expect(
      result.every((card) => [10, 11, 12, 13, 14].includes(card.number))
    ).toBe(true);
  });

  test("should return an array of 5 cards if a royal flush is found", () => {
    const sevenCards = [
      new Card(10, "S"),
      new Card(11, "S"),
      new Card(12, "S"),
      new Card(13, "S"),
      new Card(14, "S"),
      new Card(2, "D"),
      new Card(3, "C"),
    ];
    const result = isRoyalFlush(sevenCards);
    expect(result.length).toBe(5);
    expect(result.every((card) => card.color === "S")).toBe(true);
    expect(
      result.every((card) => [10, 11, 12, 13, 14].includes(card.number))
    ).toBe(true);
  });

  test("should return false if no royal flush is found", () => {
    const sevenCards = [
      new Card(10, "S"),
      new Card(11, "H"),
      new Card(12, "S"),
      new Card(13, "S"),
      new Card(14, "S"),
      new Card(2, "D"),
      new Card(3, "C"),
    ];
    const result = isRoyalFlush(sevenCards);
    expect(result).toBe(false);
  });
});
