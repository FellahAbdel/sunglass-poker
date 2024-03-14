/*
 * IN : tableau de 7 cartes
 * OUT : [], tableau des cartes qui composent la main. Au plus 5 | False si rien trouve
 * FUNCTION : determine si les 7 possedent une couleur et renvoi la combinaison si elle est trouve.
 */
function estCouleur(sevenCardsTab) {
  let tab = [...sevenCardsTab];
  let colors = [[], [], [], []];

  // on repartis les cartes par famille
  for (let i = 0; i < tab.length; i++) {
    switch (tab[i].color) {
      case "D":
        colors[0].push(tab[i]);
        break;
      case "H":
        colors[1].push(tab[i]);
        break;
      case "C":
        colors[2].push(tab[i]);
        break;
      case "S":
        colors[3].push(tab[i]);
        break;
    }
  }

  //
  for (let i = 0; i < colors.length; i++) {
    if (colors[i].length > 5) {
      while (colors[i].length > 5) {
        let index = 0;

        for (let j = 0; j < colors[i].length; j++) {
          if (colors[i][j].number < colors[i][index].number) {
            index = j;
          }
        }

        colors[i].splice(index, 1);
      }

      return colors[i];
    } else if (colors[i].length === 5) {
      return colors[i];
    }
  }

  return false;
}
