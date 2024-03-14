/*
 * ...
 */
function estDoublePaire(tableau7cartes) {
  let tab = [...tableau7cartes];
  // Ordonne le tableau
  tab.sort(function (a, b) {
    return b.number - a.number;
  });

  console.log(tab);

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
        p2c1 = tab[i];
        p2c2 = tab[i + 1];
        verificateur = true;
        break;
      }
    }
  }

  // Chercher la carte haute
  if (verificateur) {
    for (let j = 0; j < tab.length; j++) {
      if (tab[j].number !== p1c1.number && tab[j].number !== p2c1.number) {
        ch = tab[j];
        break;
      }
    }

    // Construire la main finale: les deux paires + la meilleure carte restante
    const maMain = [p1c1, p1c2, p2c1, p2c2, ch];
    return maMain;
  } else {
    // Retourne false si une double paire n'est pas trouvée
    return false;
  }
}
