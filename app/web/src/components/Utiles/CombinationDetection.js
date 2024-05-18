/**
 * Counts occurrences of each card value in a set of cards.
 * @param {Array} cards - An array of card tuples [value, suit].
 * @returns {Object} An object with card values as keys and their counts as values.
 */
export const countByValue = cards => cards.reduce((acc, [value]) => {
  acc[value] = (acc[value] || 0) + 1;
  return acc;
}, {});

/**
 * Determines if a set of cards contains a flush.
 * @param {Array} cards - An array of card tuples [value, suit].
 * @returns {string|undefined} The suit of the flush if a flush exists, otherwise undefined.
 */
export const isFlush = cards => {
  const suits = cards.map(card => card[1]);
  const suitCount = suits.reduce((acc, suit) => {
    acc[suit] = (acc[suit] || 0) + 1;
    return acc;
  }, {});
  return Object.keys(suitCount).find(suit => suitCount[suit] >= 5);
};

/**
 * Determines if a set of cards contains a straight.
 * @param {Array} cards - An array of card tuples [value, suit].
 * @returns {boolean} True if the cards form a straight, false otherwise.
 */
export const isStraight = cards => {
  let values = cards.map(card => card[0]);
  
  // Add 14 to the values if there's an Ace
  if (values.includes(1)) values.push(14);
  
  values = Array.from(new Set(values)).sort((a, b) => a - b); // Remove duplicates and sort

  for (let i = 0; i <= values.length - 5; i++) {
    if (values[i + 4] - values[i] === 4) return true;
  }

  // Special case for Ace-low straight
  if (values.includes(14) && values.includes(2) && values.includes(3) && values.includes(4) && values.includes(5)) return true;

  return false;
};

/**
 * Determines if a set of cards contains a straight flush.
 * @param {Array} cards - An array of card tuples [value, suit].
 * @returns {boolean} True if the cards form a straight flush, false otherwise.
 */
export const isStraightFlush = cards => {
  const suit = isFlush(cards); // get the flush suit
  if (!suit) return false;

  const flushCards = cards.filter(card => card[1] === suit);
  return isStraight(flushCards);
};

/**
 * Determines if a set of cards contains four of a kind.
 * @param {Array} cards - An array of card tuples [value, suit].
 * @returns {boolean} True if there are four cards of the same value, false otherwise.
 */
export const isFourOfAKind = cards => {
  const counts = countByValue(cards);
  return Object.values(counts).some(count => count === 4);
};

/**
 * Determines if a set of cards contains a full house.
 * @param {Array} cards - An array of card tuples [value, suit].
 * @returns {boolean} True if there is a three of a kind and a pair, false otherwise.
 */
export const isFullHouse = cards => {
  const counts = countByValue(cards);
  const values = Object.values(counts);
  return values.includes(3) && values.includes(2);
};

/**
 * Determines if a set of cards contains three of a kind.
 * @param {Array} cards - An array of card tuples [value, suit].
 * @returns {boolean} True if there are three cards of the same value, false otherwise.
 */
export const isThreeOfAKind = cards => {
  const counts = countByValue(cards);
  return Object.values(counts).some(count => count === 3);
};

/**
 * Determines if a set of cards contains two pairs.
 * @param {Array} cards - An array of card tuples [value, suit].
 * @returns {boolean} True if there are two pairs, false otherwise.
 */
export const isTwoPairs = cards => {
  const counts = countByValue(cards);
  let pairs = 0;
  Object.values(counts).forEach(count => {
    if (count === 2) pairs++;
  });
  return pairs >= 2;
};

/**
 * Determines if a set of cards contains a pair.
 * @param {Array} cards - An array of card tuples [value, suit].
 * @returns {boolean} True if there is a pair, false otherwise.
 */
export const isPair = cards => {
  const counts = countByValue(cards);
  return Object.values(counts).some(count => count === 2);
};

/**
 * Evaluates the highest poker hand possible from a set of cards.
 * @param {Array} cards - An array of card tuples [value, suit].
 * @returns {string} The name of the highest poker hand.
 */
export const getPokerHand = cards => {
  if (cards.length < 5) return '';
  if (isStraightFlush(cards)) return "straightFlush";
  if (isFourOfAKind(cards)) return "fourOfKind";
  if (isFullHouse(cards)) return "fullHouse";
  if (isFlush(cards)) return "flush";
  if (isStraight(cards)) return "straight";
  if (isThreeOfAKind(cards)) return "threeOfKind";
  if (isTwoPairs(cards)) return "twoPair";
  if (isPair(cards)) return "pair";
  return "highcard";
};
