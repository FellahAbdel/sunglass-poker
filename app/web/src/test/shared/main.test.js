const Game = require("../../shared/Game");
const Player = require("../../shared/Player");

describe("Game", () => {
  let game;

  beforeEach(() => {
    game = new Game();
  });

  test("doit envoyer des joueurs", () => {
    const player1 = new Player(1, "Alice");
    const player2 = new Player(2, "Bob");
    game.addPlayer(player1);
    game.addPlayer(player2);
    expect(game.players).toEqual([player1, player2]);
  });

  test("devrait obtenir les joueurs actifs", () => {
    const player1 = new Player(1, "Alice");
    const player2 = new Player(2, "Bob");
    const player3 = new Player(3, "Charlie");
    player1.setPlayerState("active");
    player2.setPlayerState("active");
    player3.setPlayerState("left");
    game.addPlayer(player1);
    game.addPlayer(player2);
    game.addPlayer(player3);
    const activePlayers = game.getActivePlayers();
    expect(activePlayers).toEqual([player1, player2]);
  });

});
