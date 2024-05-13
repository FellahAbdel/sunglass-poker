/*
 * IN : [{ poid, main, type }, ...] tableau des poids des mains des joueurs
 * OUT : [{ poid, main, type }, ...] tableau du/des maximum(s) des poids
 * FUNCTION : tri et renvoi le ou les maximums des poids
 */
function maximums(playerHandWeightList, getter) {
  let maximums = [];
  let maxWeight = getter(playerHandWeightList[0]);

  for (let i = 0; i < playerHandWeightList.length; i++) {
    if (getter(playerHandWeightList[i]) > maxWeight) {
      maximums.splice(0, maximums.length);
      maximums.push(playerHandWeightList[i]);
      maxWeight = getter(playerHandWeightList[i]);
    } else if (getter(playerHandWeightList[i]) === maxWeight) {
      maximums.push(playerHandWeightList[i]);
    }
  }

  return maximums;
}

function second(playerCombinationList) {
  let biggerHands = [...playerCombinationList];

  for (let i=0; i < biggerHands[0].hand.length; i++) {
    biggerHands = maximums(biggerHands, (ob) => ob.hand[i]);
    if (biggerHands.length === 1) break;
  }

  return biggerHands;
}

module.exports = {
  maximums,
  second,
};
