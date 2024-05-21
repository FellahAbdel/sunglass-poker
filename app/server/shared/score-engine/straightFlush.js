const isStraight  = require("./straight");
/*
 * IN : tableau de 7 cartes
 * OUT : [], tableau des cartes qui composent la main. Au plus 5 | False si rien trouve
 * FUNCTION : determine si les 7 possedent une quinte flush et renvoi la combianaison si elle est trouve.
 */
function isStraightFlush(sevenCardsTab) {
  // Étape 1: Vérifier si au moins 5 cartes sont de la même couleur
  const colors = {H:[], D:[], C:[], S:[]};
  let hand = [];
  let tab = [...sevenCardsTab];
  tab.sort((a, b) => b.number - a.number);

  for (const card of tab) {
    colors[card.color].push(card);
  }

  //console.log(colors);

  colorKey = Object.keys(colors);

  for (const key of colorKey) {
    if (colors[key].length >= 5) {
      // Etape 2: verifier si les cartes forment une suite
      hand = isStraight(colors[key]);
      // console.log("straightflush hand : ", hand);
      // return
      break;
    }
  }

  return hand.length === 0 ? false : hand;
}

module.exports = isStraightFlush ;