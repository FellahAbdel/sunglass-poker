import { Card } from "../../shared/Card";

describe("Card", () => {
  test("should create a card with specified number and color", () => {
    const card = new Card(3, "H");
    expect(card.number).toBe(3);
    expect(card.color).toBe("H");
  });

  test("should return the correct card string", () => {
    const card = new Card(8, "C");
    expect(card.getCardString()).toBe("8 of C");
  });
});
