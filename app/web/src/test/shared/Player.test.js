import Player  from ("../../shared/Player");
import Card  from ("../../shared/Card");

describe("Player", () => {
  let player;

  beforeEach(() => {
    player = new Player(1, "Alice");
  });

  test("should initialize with playerId and name", () => {
    expect(player.getPlayerId()).toBe(1);
    expect(player.name).toBe("Alice");
  });

  test("should set and get player cards", () => {
    const cards = [new Card(2, "H"), new Card(3, "D")];
    player.setCards(cards);
    expect(player.getPlayerCards()).toEqual(cards);
  });

  test("should set and get player state", () => {
    player.setPlayerState("active");
    expect(player.getPlayerState()).toBe("active");
  });

  test("should bet money", () => {
    player.bet(100);
    expect(player.getPlayerMoney()).toBe(900);
  });

  test("should log player action", () => {
    player.action("raise", 200);
    expect(player.getPlayerActionLog()).toEqual([
      { action: "raise", bet: 200 },
    ]);
  });

  test("should add and clear player cards", () => {
    const card = { number: 4, family: "S" };
    player.addCard(card);
    expect(player.getPlayerCards()).toEqual([card]);
    player.clearHand();
    expect(player.getPlayerCards()).toEqual([]);
  });

  test("should check if player is active", () => {
    player.setPlayerState("active");
    expect(player.isPlayerActive()).toBe(true);
    player.setPlayerState("inactive");
    expect(player.isPlayerActive()).toBe(false);
  });
});
