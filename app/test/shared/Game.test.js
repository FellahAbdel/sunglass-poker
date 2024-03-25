const Game = require("../../shared/Game");
const Player = require("../../shared/Player");
const Card = require("../../shared/Card");

describe("Game", () => {
  let game;

  beforeEach(() => {
    game = new Game();
  });

  test("should initialize with empty players and a shuffled deck", () => {
    expect(game.players.length).toBe(0);
    expect(game.deck.getCardsGame().length).toBe(52);
    const initialDeckOrder = [...game.deck.getCardsGame()];
    game.start();
    const shuffledDeckOrder = [...game.deck.getCardsGame()];
    expect(shuffledDeckOrder).not.toEqual(initialDeckOrder);
  });

  test("should add a player", () => {
    const player = new Player("Alice");
    game.addPlayer(player);
    expect(game.players.length).toBe(1);
    expect(game.players[0]).toBe(player);
  });

  test("should deal cards to each player", () => {
    const player = new Player("Bob");
    game.addPlayer(player);
    game.start();
    expect(player.getPlayerCards().length).toBe(2);
  });

  test("should deal three flop cards", () => {
    game.start();
    game.flop();
    expect(game.pokerTable.communityCards.length).toBe(3);
  });

  test("should deal one turn card", () => {
    game.start();
    game.flop();
    game.turn();
    expect(game.pokerTable.communityCards.length).toBe(4);
  });

  test("should deal one river card", () => {
    game.start();
    game.flop();
    game.turn();
    game.river();
    expect(game.pokerTable.communityCards.length).toBe(5);
  });

  test("should retrieve active players", () => {
    const player1 = new Player("Charlie");
    const player2 = new Player("David");
    player1.setPlayerState("active"); // David is not active
    player2.setPlayerState("passif"); // David is not active
    game.addPlayer(player1);
    game.addPlayer(player2);
    expect(game.getActivePlayers().length).toBe(1);
    expect(game.getActivePlayers()[0]).toBe(player1);
  });

  test("should create 7 cards for a player", () => {
    const player = new Player("Eve");
    player.addCard(new Card(2, "H"));
    player.addCard(new Card(3, "D"));
    game.pokerTable.communityCards = [
      new Card(4, "S"),
      new Card(5, "C"),
      new Card(6, "H"),
      new Card(7, "D"),
      new Card(8, "S"),
    ];
    const sevenCards = game.make7Cards(player);
    expect(sevenCards.cards.length).toBe(7);
    expect(sevenCards.cards).toContainEqual(new Card(2, "H"));
    expect(sevenCards.cards).toContainEqual(new Card(3, "D"));
    expect(sevenCards.cards).toContainEqual(new Card(4, "S"));
    expect(sevenCards.cards).toContainEqual(new Card(5, "C"));
    expect(sevenCards.cards).toContainEqual(new Card(6, "H"));
    expect(sevenCards.cards).toContainEqual(new Card(7, "D"));
    expect(sevenCards.cards).toContainEqual(new Card(8, "S"));
  });

  test("should correctly evaluate hand combinations", () => {
    const communityCards = [
      new Card(2, "H"),
      new Card(3, "D"),
      new Card(4, "S"),
      new Card(5, "C"),
      new Card(6, "H"),
      new Card(7, "D"),
      new Card(8, "S"),
    ];

    const expectedOutput = {
      hand: [
        new Card(8, "S"),
        new Card(7, "D"),
        new Card(6, "H"),
        new Card(5, "C"),
        new Card(4, "S"),
      ],
      type: "Straight",
      weight: 5,
    };

    const combination = game.combinaison(communityCards);

    // Check if combination object has been correctly generated
    expect(combination).toHaveProperty("hand");
    expect(combination).toHaveProperty("type");
    expect(combination).toHaveProperty("weight");

    // Check if combination object matches the expected output
    expect(combination).toEqual(expectedOutput);
  });

  test("should correctly evaluate hand combinations for all active players", () => {
    const player1 = new Player("Alice");
    const player2 = new Player("Bob");
    player1.addCard(new Card(2, "H"));
    player1.addCard(new Card(3, "D"));
    player2.addCard(new Card(4, "S"));
    player2.addCard(new Card(5, "C"));

    game.pokerTable.communityCards = [
      new Card(4, "S"),
      new Card(5, "C"),
      new Card(6, "H"),
      new Card(7, "D"),
      new Card(8, "S"),
    ];

    const activePlayers = [player1, player2];
    const combinationList = game.listeCombinaison(activePlayers);

    // Check if combinationList contains the expected number of combinations
    expect(combinationList.length).toBe(2);

    const expectedOutput = [
      {
        hand: [
          new Card(8, "S"),
          new Card(7, "D"),
          new Card(6, "H"),
          new Card(5, "C"),
          new Card(4, "S"),
        ],
        type: "Straight",
        weight: 5,
        id: "Alice",
      },
      {
        hand: [
          new Card(5, "C"),
          new Card(5, "C"),
          new Card(4, "S"),
          new Card(4, "S"),
          new Card(8, "S"),
        ],
        type: "TwoPair",
        weight: 3,
        id: "Bob",
      },
    ];

    expect(combinationList).toEqual(expectedOutput);
  });

  test("should correctly determine the winner of the game", () => {
    // Set up players with different hands and community cards
    const player1 = new Player(1, "Charlie");
    player1.setPlayerState("active");

    const player2 = new Player(2, "David");
    player2.setPlayerState("active");

    game.addPlayer(player1);
    game.addPlayer(player2);

    player1.addCard(new Card(2, "H"));
    player1.addCard(new Card(3, "D"));
    player2.addCard(new Card(4, "S"));
    player2.addCard(new Card(5, "C"));

    game.pokerTable.communityCards = [
      new Card(4, "S"),
      new Card(5, "C"),
      new Card(6, "H"),
      new Card(7, "D"),
      new Card(8, "S"),
    ];

    // Call the gagnant method to determine the winner
    const winner = game.gagnant();

    console.log(winner);

    // Check if the winner is as expected
    // You can add more specific checks based on the expected winner
    // For example, if player1's hand is stronger than player2's, you might expect player1 to win
  });
});
