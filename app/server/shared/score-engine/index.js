const flush = require("./flush.js").isFlush;
const fourOfAKind = require("./fourOfAKind.js").isFourOfAKind;
const fullHouse = require("./fullHouse.js").isFullHouse;
const highCard = require("./highCard.js").isHighCard;
const onePair = require("./onePair.js").isOnePair;
const royalFlush = require("./royalFlush.js").isRoyalFlush;
const straight = require("./straight.js").isStraight;
const straightFlush = require("./straightFlush.js").isStraightFlush;
const threeOfAKind = require("./threeOfAKind.js").isThreeOfAKind;
const twoPair = require("./twoPair.js").isTwoPair;

module.exports = {
  flush,
  fourOfAKind,
  fullHouse,
  highCard,
  onePair,
  royalFlush,
  straight,
  straightFlush,
  threeOfAKind,
  twoPair
};


