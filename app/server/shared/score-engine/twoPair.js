/*
 * ...
 */
function isTwoPair(tableau7cartes) {
  let tab = [...tableau7cartes];
  // Ordonne le tableau
  tab.sort(function (a, b) {
    return a.number - b.number;
  });

  let p1c1 = null;
  let p1c2 = null;
  let p2c1 = null;
  let p2c2 = null;
  let ch = null;
  let verificateur = false;
  
  // Chercher mes cartes paires
  for (let i = 0; i < tab.length - 1; i++) {
    if (tab[i].number === tab[i + 1].number) {
      if (p1c1 === null) {
        p1c1 = tab[i];
        p1c2 = tab[i + 1];
      } else {
        if (p2c1 === null) {
          p2c1 = tab[i];
          p2c2 = tab[i + 1];
        } else {
          // si on a une troisieme paire
          // on la ramplace par la plus petite 
          // des deux qu'on a deja
          p1c1 = p2c1;
          p1c2 = p2c2;
          p2c1 = tab[i];
          p2c2 = tab[i+1];
        }
        verificateur = true;
      }
    }
  }

  // Chercher la carte haute
  if (verificateur) {
    for (let j = 0; j < tab.length; j++) {
      if (tab[j].number !== p1c1.number && tab[j].number !== p2c1.number) {
        if (ch !== null) ch = ch.number < tab[j].number ? tab[j] : ch;
        else ch = tab[j];
      }
    }

    // Construire la main finale: les deux paires + la meilleure carte restante
    // P1 est toujours plus petit que P2 donc le res est dans l'ordre
    const maMain = [p2c1, p2c2, p1c1, p1c2, ch];
    return maMain;

  } else {
    // Retourne false si une double paire n'est pas trouvée
    return false;
  }
}

module.exports = isTwoPair;
