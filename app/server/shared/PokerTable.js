class PokerTable {
  constructor() {
    this.communityCards = [];
    this.stack = 0;
  }

  playerBet(player, amount) {
    player.bet(amount);
    this.stack += amount;
  }

  showCommunityCards() {
    console.log("Community cards:");
    this.communityCards.forEach((card) => {
      console.log(`${card.value} of ${card.suit}`);
    });
    console.log();
  }
}

module.exports = PokerTable;
