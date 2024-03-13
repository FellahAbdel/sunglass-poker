const Deck = require("../../shared/Deck");
const Card = require("../../shared/Card");

describe("Deck", () => {
  let deck;

  beforeEach(() => {
    deck = new Deck();
  });

  test("constructor initializes the deck with 52 cards", () => {
    expect(deck.cards.length).toBe(52);
    expect(deck.cards[0]).toBeInstanceOf(Card);
  });

  test("reset method resets the deck with 52 cards", () => {
    deck.shuffle();
    deck.reset();
    expect(deck.cards.length).toBe(52);
    expect(deck.cards[0]).toBeInstanceOf(Card);
  });

  test("shuffle method shuffles the deck", () => {
    const originalOrder = [...deck.cards];
    deck.shuffle();
    expect(deck.cards).not.toEqual(originalOrder);
  });

  test("deal method returns a card and removes it from the deck", () => {
    const initialLength = deck.cards.length;
    const card = deck.deal();
    expect(deck.cards.length).toBe(initialLength - 1);
    expect(card).toBeInstanceOf(Card);
  });

  test("deal method throws an error if the deck is empty", () => {
    deck.cards = []; // Empty the deck
    expect(() => deck.deal()).toThrow("Deck is empty");
  });
});
