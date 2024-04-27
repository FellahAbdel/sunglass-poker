class PublicGame extends Game {
  constructor(game) {
    super();
    this.pot = game.getPot();
    this.currentBet = game.getCurrentBet();
    this.communityCards = game.getCommunityCards();
    this.gameState = game.getState();
    this.players = game.players.map((player) => new PublicPlayer(player));
    this.focus = game.focus;
    this.master = game.master;
  }

  getCommunityCards() {
    return this.communityCards.filter((card) => card.isVisible);
  }
  getPot() {
    return this.pot;
  }

  getCurrentBet() {
    return this.currentBet;
  }

  getGameState() {
    return this.gameState;
  }

  getPlayers() {
    return this.players;
  }
}
