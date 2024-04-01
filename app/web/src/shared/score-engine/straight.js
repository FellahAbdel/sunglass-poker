/*
 * ...
 */

export function isStraight(sevenCardsTab, refact = false) {
  const refactor = function (cardList, undo = false) {
    for (let i = 0; i < cardList.length; i++) {
      if (!undo) {
        if (cardList[i].number === 14) {
          cardList[i].number = 1;
        }
      } else {
        if (cardList[i].number === 1) {
          cardList[i].number = 14;
        }
      }
    }
    return cardList;
  };

  let tab = [...sevenCardsTab];
  let hand = [];

  if (refact) {
    tab = refactor(tab);
  }
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

  if (refact) {
    return hand.length === 5 ? refactor(hand, true) : false;
  }
  return hand.length === 5 ? hand : isStraight(sevenCardsTab, true);
}
