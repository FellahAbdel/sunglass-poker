class PokerTable {
  constructor() {
    this.communityCards = [];
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