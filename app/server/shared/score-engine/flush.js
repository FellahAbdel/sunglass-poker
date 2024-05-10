const { flush } = require(".");

/*
 * IN : tableau de 7 cartes
 * OUT : [], tableau des cartes qui composent la main. Au plus 5 | False si rien trouve
 * FUNCTION : determine si les 7 possedent une couleur et renvoi la combianaison si elle est trouve.
 */
function isFlush(sevenCardsTab) {
  let tab = [...sevenCardsTab];
  let colors = {H:[], C:[], D:[], S:[]};

  // on repartis les cartes par famille
  for (let i = 0; i < tab.length; i++) {
    colors[tab[i].color].push(tab[i]);
  }

  let colorKeys = Object.keys(colors);

  // on parcours pour voir si une couleur a 5 cartes ou plus
  for(key of colorKeys) {
    while (colors[key].length > 5) {
      let index = 0;
      for (let i = 0; i < colors[key].length; i++) {
        if (colors[key][i].number < colors[key][index].number) {
          index = i;
        }
      }
      colors[key].splice(index, 1);

    } if (colors[key].length === 5){
      return colors[key].sort((a, b) => b.number - a.number);
    }
  }

  return false;
}

module.exports = isFlush ;
