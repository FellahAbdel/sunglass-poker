const Deck = require("../../shared/Deck");
const Card = require("../../shared/Card");

describe("Deck", () => {
  let deck;

  beforeEach(() => {
    deck = new Deck();
  });

  test("should initialize with 52 cards", () => {
    expect(deck.getCardsGame().length).toBe(52);
  });

  test("should shuffle the deck", () => {
    const originalCards = [...deck.getCardsGame()];
    deck.shuffle();
    const shuffledCards = deck.getCardsGame();
    expect(shuffledCards).not.toEqual(originalCards);
  });

  test("should deal one card", () => {
    const card = deck.deal();
    expect(card instanceof Card).toBe(true);
  });

  test("should deal three cards", () => {
    const cards = deck.deal3Cards();
    expect(cards.length).toBe(3);
    cards.forEach((card) => {
      expect(card instanceof Card).toBe(true);
    });
  });

  test("should throw error when dealing from empty deck", () => {
    deck.getCardsGame().splice(0); // Empty the deck
    expect(() => {
      deck.deal();
    }).toThrow("Deck is empty");
  });

  test("should throw error when dealing 3 cards from empty deck", () => {
    deck.getCardsGame().splice(0); // Empty the deck
    expect(() => {
      deck.deal3Cards();
    }).toThrow("Deck is empty");
  });
});
