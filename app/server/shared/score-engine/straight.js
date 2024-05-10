/*
 * ...
 */

function isStraight(sevenCardsTab, refact = false) {

  let tab = [...sevenCardsTab];
  let hand = [];

  tab.sort((a, b) => a.number - b.number);

  while (tab.length !== 0) {
    let tmp = tab.pop();

    if (hand.length === 0) {
      hand.push(tmp);
    } else if (hand.length < 5) {
      if (tmp.number === hand[hand.length - 1].number - 1) {
        hand.push(tmp);
      } else {
        hand.splice(0, hand.length);
        hand.push(tmp);
      }
    }
  }

  return hand.length === 5 ? hand : false;
}

module.exports = isStraight;
